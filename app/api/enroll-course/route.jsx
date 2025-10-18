import { coursesTable, enrollCourseTable } from "../../../config/schema";
import { db } from "../../../config/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and, desc } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { courseId } = await req.json();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress?.emailAddress;

    
    const existing = await db
      .select()
      .from(enrollCourseTable)
      .where(
        and(eq(enrollCourseTable.userEmail, userEmail), eq(enrollCourseTable.cid, courseId))
      );

    if (existing.length > 0) {
      return NextResponse.json({ message: "Already enrolled" }, { status: 200 });
    }

    
    const result = await db
      .insert(enrollCourseTable)
      .values({ cid: courseId, userEmail })
      .returning(enrollCourseTable);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST /api/enroll-course error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    const userEmail = user.primaryEmailAddress?.emailAddress;

    if (courseId) {
      const result = await db
        .select()
        .from(coursesTable)
        .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
        .where(and(eq(enrollCourseTable.userEmail, userEmail), eq(enrollCourseTable.cid, courseId)));

      return NextResponse.json(result[0] ?? { message: "Course not found" });
    }

    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(eq(enrollCourseTable.userEmail, userEmail))
      .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/enroll-course error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(req) {
  const {completedChapter, courseId}=await req.json();
  const user=await currentUser();

  const result = await db.update(enrollCourseTable).set({
    completedChapters:completedChapter
  }).where(and(eq(enrollCourseTable.cid,courseId),
eq(enrollCourseTable.userEmail,user?.primaryEmailAddress?.emailAddress)))
 .returning(enrollCourseTable) 

 return NextResponse.json(result);
 
}
