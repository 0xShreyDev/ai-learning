import React, { useContext } from 'react';
import { selectedChapterIndexContext } from '../../../context/SelectedChapterIndexContext';
import YouTube from 'react-youtube';
import { Button } from '../../../components/ui/button';
import { CheckCircle, X } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

function ChapterContent({ courseInfo, refreshData }) {
  const { courseId } = useParams();
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = course?.courseContent || [];
  const { selectedChapterIndex } = useContext(selectedChapterIndexContext);

  const selectedChapter = courseContent[selectedChapterIndex]?.courseData;
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeData || [];
  const topics = selectedChapter?.topics || [];
  let completedChapter = enrollCourse?.completedChapter ?? [];

  // ✅ Mark chapter as completed
  const markChapterCompleted = async () => {
    if (!completedChapter.includes(selectedChapterIndex)) {
      completedChapter.push(selectedChapterIndex);
    }

    const result = await axios.put('/api/enroll-course', {
      courseId: courseId,
      completedChapter: completedChapter,
    });

    console.log(result);
    refreshData();
    toast.success('Chapter marked as Completed!');
  };

  // ✅ Mark chapter as incomplete
  const markInCompleteChapter = async () => {
    const updatedChapters = completedChapter.filter(
      (item) => item !== selectedChapterIndex
    );

    const result = await axios.put('/api/enroll-course', {
      courseId: courseId,
      completedChapter: updatedChapters, // <-- fixed here
    });

    console.log(result);
    refreshData();
    toast.success('Chapter marked as Incomplete!');
  };

  return (
    <div className="p-10 h-screen w-screen overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl mb-4">
          {selectedChapter?.chapterName || 'Select a chapter'}
        </h2>

        {completedChapter.includes(selectedChapterIndex) ? (
          <Button variant="outline" onClick={markInCompleteChapter}>
            <X /> Mark Incomplete
          </Button>
        ) : (
          <Button onClick={markChapterCompleted}>
            <CheckCircle /> Mark as Completed
          </Button>
        )}
      </div>

      <h3 className="my-2 font-bold text-lg">Related Video</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.isArray(videoData) && videoData.length > 0 ? (
          videoData.slice(0, 2).map((video, index) => (
            <div key={index}>
              <YouTube
                videoId={video?.videoId}
                opts={{
                  height: '250',
                  width: '400',
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No related videos available.</p>
        )}
      </div>

      <div className="mt-7">
        {Array.isArray(topics) && topics.length > 0 ? (
          topics.map((topic, index) => (
            <div key={index} className="mb-10 p-5 bg-secondary rounded-2xl">
              <h4 className="font-bold text-2xl text-primary">
                {index + 1}. {topic?.topic}
              </h4>

              <div
                dangerouslySetInnerHTML={{ __html: topic?.content }}
                style={{
                  lineHeight: '2.5',
                  wordWrap: 'break-word', // ✅ added to prevent overflow
                  overflowWrap: 'break-word',
                }}
              ></div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No topics available for this chapter.</p>
        )}
      </div>
    </div>
  );
}

export default ChapterContent;
