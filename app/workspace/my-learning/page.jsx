import React from 'react'
import WelcomeBack from '../_components/WelcomeBack'
import EnrollCourseList from '../_components/EnrollCourseList'

function MyLearning() {
  return (
    <div>
        <WelcomeBack/>
        <h2 className=' font-bold text-2xl mt-5'>My Learning</h2>
        <EnrollCourseList/>
    </div>
  )
}

export default MyLearning