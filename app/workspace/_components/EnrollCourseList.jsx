"use client"
import axios from 'axios'
import EnrollCourseCard from './EnrollCourseCard'
import React, { useEffect, useState } from 'react'

function EnrollCourseList() {

    const [enrolledCourseList, setEnrollCourseList] = useState([]);

    useEffect(() => {
        GetEnrollCourse();
    }, [])

    const GetEnrollCourse = async () => {
        const result = await axios.get('/api/enroll-course');
        console.log(result);
        setEnrollCourseList(result.data)
    }


    return enrolledCourseList?.length > 0 && (
        <div className='mt-3'>
            <h2 className='font-bold text-2xl'>Continue Learning</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>

            {enrolledCourseList?.map((course, index) => {
                return <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index} />;
            })}
         </div>

        </div>
    )
}

export default EnrollCourseList