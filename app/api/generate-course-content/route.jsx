import { NextResponse } from 'next/server';
import { ai } from '../../../lib/ai';
import axios from 'axios';
import { coursesTable } from '../../../config/schema';
import { db } from "../../../config/db";
import { eq } from "drizzle-orm";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:{
chapterName:<>,
{
topic:<>,
content:<>
}
}
:User Input:`


export async function POST(req) {
  try {
    const { courseJson, courseTitle, courseId } = await req.json();

    const promises = courseJson?.chapters?.map(async (chapter) => {

      const model = 'gemini-2.5-flash';
      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: PROMPT + JSON.stringify(chapter)
            }
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model,
        contents
      });

      const RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!RawResp) {
        throw new Error("Empty response from Gemini for chapter: " + chapter?.chapterName);
      }

      console.log(RawResp);

      const RawJson = RawResp.replace(/```json|```/g, '').trim();
      const JSONResp = JSON.parse(RawJson);

      const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
      return {
        youtubeVideo: youtubeData,
        courseData: JSONResp
      };
    });

    const CourseContent = await Promise.all(promises);

    const dbResp = await db.update(coursesTable).set({
      courseContent: CourseContent
    }).where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
      courseName: courseTitle,
      CourseContent: CourseContent
    });

  } catch (error) {
    console.error("Error in generate-course-content:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}



const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'
const GetYoutubeVideo = async (topic) => {
  try {
    const params = {
      part: 'snippet',
      q: topic,
      maxResults: 4,
      type: 'video',
      key: process.env.YOUTUBE_API_KEY
    }

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp = resp.data.items;
    const youtubeVideoList = [];
    youtubeVideoListResp.forEach(item => {
      const data = {
        videoId: item.id?.videoId,
        title: item?.snippet?.title
      }
      youtubeVideoList.push(data);
    })
    console.log("youtubeVideoList", youtubeVideoList)
    return youtubeVideoList;
  } catch (error) {
    console.error("Error fetching YouTube videos for topic:", topic, error.response?.data || error.message);
    return [];
  }
}
