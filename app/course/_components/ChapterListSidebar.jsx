'use client';

import React, { useContext } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import { selectedChapterIndexContext } from '../../../context/SelectedChapterIndexContext';

function ChapterListSidebar({ courseInfo }) {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = course?.courseContent || [];
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(selectedChapterIndexContext);

  return (
    <div className="w-80 p-5 bg-secondary h-screen overflow-y-auto">
      <h2 className="my-3 font-bold text-2xl">Chapters ({courseContent?.length})</h2>

      {!courseContent.length && (
        <p className="text-gray-500 text-sm">No chapters available.</p>
      )}

      <Accordion type="single" collapsible>
        {courseContent.map((chapter, chapterIndex) => (
          <AccordionItem
            key={chapterIndex}
            value={chapter?.courseData?.chapterName || `chapter-${chapterIndex}`}
            onClick={() => setSelectedChapterIndex(chapterIndex)}
          >
            <AccordionTrigger
              className={`font-medium ${
                selectedChapterIndex === chapterIndex ? 'text-primary' : ''
              }`}
            >
              {chapter?.courseData?.chapterName || `Chapter ${chapterIndex + 1}`}
            </AccordionTrigger>

            <AccordionContent asChild>
              <div>
                {chapter?.courseData?.topics?.length ? (
                  chapter.courseData.topics.map((topic, topicIndex) => (
                    <h2
                      key={topicIndex}
                      className="p-3 bg-white my-1 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    >
                      {topic?.topic || `Topic ${topicIndex + 1}`}
                    </h2>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm px-3">
                    No topics available for this chapter.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ChapterListSidebar;
