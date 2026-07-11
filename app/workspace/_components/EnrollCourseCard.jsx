import React from "react";
import Image from "next/image";
import { Progress } from "../../../components/ui/progress";
import { Button } from "../../../components/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

function EnrollCourseCard({ course, enrollCourse }) {
  const parsedCourseJson =
    typeof course?.courseJson === "string"
      ? JSON.parse(course.courseJson)
      : course?.courseJson;

  const courseJson = parsedCourseJson?.course;

  const CalculatePerProgress = () => {
    const completed = enrollCourse?.completedChapters?.length ?? 0;
    const total = course?.courseContent?.length ?? 1;
    return (completed / total) * 100;
  };

  return (
    <div className="shadow rounded-xl overflow-hidden bg-white hover:shadow-lg transition">
      <Image
        src={course?.bannerImageUrl}
        alt={course?.name || "Course banner"}
        width={400}
        height={300}
        className="w-full aspect-video object-cover"
      />

      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-800">{course?.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-3">
          {courseJson?.description || "No description available"}
        </p>

        <div>
          <h2 className="flex justify-between text-sm mb-1 text-primary">
            Progress <span>{Math.round(CalculatePerProgress())}%</span>
          </h2>
          <Progress value={CalculatePerProgress()} />

          <Link href={`/workspace/view-course/${course?.cid}`}>
            <Button className="w-full mt-3">
              <PlayCircle className="mr-2 h-4 w-4" />
              Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
