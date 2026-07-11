import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs/server";
import { db } from '../../../config/db';
import { coursesTable } from '../../../config/schema.js';
import axios from 'axios';

const PROMPT = `Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name,, Topic under each chapters, Duration for each chapters etc, in JSON format only Schema:

{ "level": "string", "include Video": "boolean", } } ] ].

"course": {

"name": "string",

"description": "string",

"category": "string",

"noOfChapters": "number",

"bannerlmage Prompt": "string",

"chapters": [

{ "chapterName": "string",

"duration": "string",

"topics": [

"string"

User Input:`;

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const { courseId, ...formData } = await req.json();
    console.log("Incoming course data:", formData);

    const user = await currentUser();

    const model = 'gemini-2.5-flash';
    const contents = [
      {
        role: 'user',
        parts: [{ text: PROMPT + JSON.stringify(formData) }],
      },
    ];

    const response = await ai.models.generateContent({ model, contents });

    const RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!RawResp) throw new Error("Empty response from Gemini API");

    const RawJson = RawResp.replace('```json', '').replace('```', '');
    const JSONResp = JSON.parse(RawJson);

    const ImagePrompt = JSONResp.course?.bannerImagePrompt;
    const bannerImageUrl = await GenerateImage(ImagePrompt);

    await db.insert(coursesTable).values({
      ...formData,
      courseJson: JSON.stringify(JSONResp),
      userEmail: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
      cid: courseId,
      bannerImageUrl: bannerImageUrl,
    });

    return NextResponse.json({ success: true, courseId });

  } catch (error) {
    console.error("Error in generate-course-layout:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

const GenerateImage = async (imagePrompt) => {
  const BASE_URL = 'https://aigurulab.tech';

  try {
    const result = await axios.post(
      BASE_URL + '/api/generate-image',
      {
        width: 1024,
        height: 1024,
        input: imagePrompt,
        model: 'flux',
        aspectRatio: "16:9"
      },
      {
        headers: {
          'x-api-key': process.env.AI_GURU_LAB_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Image generated:", result.data.image);
    return result.data.image;

  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
    return null;
  }
};
