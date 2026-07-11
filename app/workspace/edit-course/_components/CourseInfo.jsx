'use client';

import { Book, Clock, PlayCircle, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function CourseInfo({ course, viewCourse }) {
    const courseLayout = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const GenerateCourseContent = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/generate-course-content', {
                courseJson: courseLayout,
                courseTitle: course?.name,
                courseId: course?.cid
            });
            console.log(result.data);
            setLoading(false);
            router.replace('/workspace')
            toast.success('Course Generated successfully')
        } catch (e) {
            console.error(e);
            toast.error("Server Side error, Try Again!")
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-5 justify-between rounded-2xl shadow p-5">
            <div className="flex flex-col gap-3 flex-1">
                <h2 className="font-bold text-3xl">{courseLayout?.name}</h2>
                <p className="line-clamp-2 text-gray-500">{courseLayout?.description}</p>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
                    <div className="flex gap-5 p-3 rounded-lg shadow-sm items-center">
                        <Clock className="text-blue-500" />
                        <section>
                            <h2 className="font-bold">Duration</h2>
                            <h2>2 Hours</h2>
                        </section>
                    </div>
                    <div className="flex gap-5 p-3 rounded-lg shadow-sm items-center">
                        <Book className="text-green-500" />
                        <section>
                            <h2 className="font-bold">Chapters</h2>
                            <h2>{courseLayout?.noOfChapters}</h2>
                        </section>
                    </div>
                    <div className="flex gap-5 p-3 rounded-lg shadow-sm items-center">
                        <TrendingUp className="text-red-500" />
                        <section>
                            <h2 className="font-bold">Difficulty Level</h2>
                            <h2>{course?.level || 'Beginner'}</h2>
                        </section>
                    </div>
                </div>
                {!viewCourse ? <Button onClick={GenerateCourseContent} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Content'}
                </Button> :
                    <Link href={'/course/' + course?.cid}><Button> <PlayCircle /> Continue Learning </Button> </Link>}
            </div>

            {course?.bannerImageUrl && (
                <div className="flex-shrink-0">
                    <Image
                        src={course.bannerImageUrl}
                        alt="banner Image"
                        width={200}
                        height={400}
                        className="w-full h-[240px] rounded-2xl object-cover"
                    />
                </div>
            )}
        </div>
    );
}

export default CourseInfo;
