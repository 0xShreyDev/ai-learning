import React from 'react'
import WelcomeBack from './_components/WelcomeBack'
import CourseList from './_components/CourseList'
import EnrollCourseList from './_components/EnrollCourseList'


function Workspace() {
  return (
    <div>
      <WelcomeBack/>
      <EnrollCourseList/>
      <CourseList/>
      
    </div>
  )
}

export default Workspace