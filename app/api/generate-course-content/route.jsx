import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { get } from "http";
import { db } from "../../../config/db";
import { coursesTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.

Schema:{

chapterName:<>,

{

topic:<>,

content:<>

: User Input:
`;

export async function POST(req) {
    try {

        const body = await req.json();
        console.log("📥 Incoming body:", JSON.stringify(body, null, 2));


        const course =
            body.course ||
            body.courseJson ||
            body.courseLayout ||
            null;

        const { courseTitle, courseId } = body;


        if (!course || !Array.isArray(course.chapters)) {
            return NextResponse.json(
                {
                    error:
                        "Invalid course data — expected an object with a 'chapters' array.",
                    received: course,
                },
                { status: 400 }
            );
        }


        const promises = course.chapters.map(async (chapter) => {
            const model = "gemini-2.0-flash";

            const contents = [
                {
                    role: "user",
                    parts: [{ text: PROMPT + JSON.stringify(chapter) }],
                },
            ];


            const response = await ai.models.generateContent({
                model,
                config: {},
                contents,
            });


            const rawResp = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
            const cleaned = rawResp
                .replace(/```json|```/g, "")
                .replace(/\\n/g, " ")
                .replace(/\r?\n|\r/g, " ")
                .replace(/\u0000/g, "")
                .trim();

            let jsonResp = {};
            try {
                jsonResp = JSON.parse(cleaned);
            } catch (parseErr) {
                console.error("JSON parse error:", parseErr.message);

                jsonResp = {
                    chapterName: chapter.chapterName || "Unknown Chapter",
                    rawText: cleaned.slice(0, 5000),
                    error: "Invalid AI JSON",
                };
            }

            const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

            return {
                youtubeData: youtubeData,
                courseData: jsonResp
            };
        });


        const CourseContent = await Promise.all(promises);

        const dbResp = await db.update(coursesTable).set({
            courseContent: CourseContent
        }).where(eq(coursesTable.cid, courseId))


        return NextResponse.json({
            courseName: courseTitle,
            courseId,
            CourseContent,
        });
    } catch (error) {
        console.error("Error generating course content:", error);
        return NextResponse.json(
            { error: "Failed to generate course content", details: error.message },
            { status: 500 }
        );
    }
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

const GetYoutubeVideo = async (topic) => {
    const params = {
        part: 'snippet',
        q: topic,
        maxResults: 4,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY
    };

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp = resp.data.items;
    const youtubeVideoList = [];

    youtubeVideoListResp.forEach(item => {
        const data = {
            videoId: item.id?.videoId,
            title: item?.snippet?.title
        };
        youtubeVideoList.push(data);
    });

    console.log('youtubeVideoList', youtubeVideoList);
    return youtubeVideoList;
};
