import React, { useState } from "react";
import Image from "next/image";
import { Book, LoaderCircle, PlayCircle, Settings } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

function CourseCard({ course }) {

    const courseJson = course?.courseJson.course;
    const [loading, setLoading] = useState(false);

    const onEnrollCourse = async () => {
        try{
        setLoading(true);
        const result = await axios.post('/api/enroll-course', {
            courseId: course?.cid
        });
        console.log(result.data);
        if (result.data.resp)
        {
            toast.warning('Already Enrolled!');
            setLoading(false);
            return
        }
        toast.success('Enrolled!')
        setLoading(false);
        }
    catch (e) {
        toast.error('Server side error')
        setLoading(false);
    }
}


return (
    <div className=" shadow rounded-xl">
        <Image
            src={course?.bannerImageUrl}
            alt={course?.name || "Course banner"}
            width={400}
            height={300}
            className=" w-full aspect-video rounded-t-xl object-cover "
        />
        <div className="p-3 flex flex-col gap-3">
            <h3 className="text-lg font-bold">{course?.name}</h3>
            <p className="text-sm text-gray-400 line-clamp-3">
                {courseJson?.description}
            </p>
            <div className="flex justify-between items-center">
                <h2 className="flex items-center gap-2 text-sm"> <Book className="text-primary h-5 w-5" /> {courseJson.noOfChapters} Chapters</h2>
                {course?.courseContent?.length ? <Button size={'sm'}
                    onClick={onEnrollCourse}
                    disabled={loading}
                > {loading?<LoaderCircle className=" animate-spin" />: <PlayCircle />} Start Learning</Button> :
                    <Link href={'/workspace/edit-course/' + course?.cid}> <Button size={'sm'} variant='outline' > <Settings />Generate Course</Button> </Link>}
            </div>
        </div>
    </div>
);
}

export default CourseCard;
