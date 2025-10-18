'use client'

import React, { useEffect, useState } from 'react';
import AppHeader from '../../workspace/_components/AppHeader';
import ChapterListSidebar from '../_components/ChapterListSidebar';
import ChapterContent from '../_components/ChapterContent';
import axios from 'axios';
import { useParams } from 'next/navigation';

function Course() {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState();

  useEffect(() => {
    if (courseId) {
      GetEnrollCourseById();
    }
  }, [courseId]);

  const GetEnrollCourseById = async () => {
    try {
      const result = await axios.get(`/api/enroll-course?courseId=${courseId}`);
      console.log('Fetched course:', result.data);
      setCourseInfo(result.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className="flex gap-10">
        <ChapterListSidebar courseInfo={courseInfo} />
      
        <ChapterContent courseInfo={courseInfo} refreshData={()=>GetEnrollCourseById(
          
        )}/>
      </div>
    </div>
  );
}

export default Course;
