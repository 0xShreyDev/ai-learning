import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "../../../components/ui/dialog.jsx"
import { Input } from '../../../components/ui/input.jsx'
import { Switch } from '../../../components/ui/switch.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../components/ui/select"
import { Button } from '../../../components/ui/button.jsx'
import { Loader2Icon, Sparkle } from 'lucide-react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation.js'
function AddNewCourses({ children }) {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        includeVideo: false,
        noOfChapter: 1,
        category: '',
        level: ''
    });
    const router = useRouter();
    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const onGenerate = async () => {
        console.log(formData);
        const courseId = uuidv4();
        try{
        setLoading(true);
        const result = await axios.post('/api/generate-course-layout', {
            ...formData,
            courseId:courseId

        });
        console.log(result.data);
        setLoading(false);
        router.push('/workspace/edit-course/'+result.data?.courseId);
    }
    catch(e)
    {
        console.log(e)
        setLoading(false)
    }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Course Using AI</DialogTitle>
                    <DialogDescription asChild>
                        <div className='flex flex-col gap-4 mt-3'>
                            <div>
                                <label>Course Name</label>
                                <Input placeholder="Course Name"
                                    onChange={(event) => onHandleInputChange('name', event?.target.value)} />
                            </div>
                            <div className='flex flex-col'>
                                <label>Course Description (Optional)</label>
                                <textarea placeholder='Course Description' onChange={(event) => onHandleInputChange('description', event?.target.value)} />
                            </div>
                            <div>
                                <label>No. Of Chapters</label>
                                <Input placeholder="No. of chapters" type='number' onChange={(event) => onHandleInputChange('noOfChapters', event?.target.value)} />
                            </div>
                            <div className='flex gap-3 items-center'>
                                <label>Include Video</label>
                                <Switch
                                    onCheckedChange={() => onHandleInputChange('includeVideo', !formData?.includeVideo)} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Difficulty Level</label>
                                <Select onValueChange={(value) => onHandleInputChange('level', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Difficulty Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Moderate">Moderate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label>Category</label>
                                <Input placeholder='Category (Sperated by comma)' onChange={(event) => onHandleInputChange('category', event?.target.value)}></Input>
                            </div>

                            <div className='mt-5'>
                                <Button className={'w-full'} onClick={onGenerate} disabled={loading}>
                                    {loading ? <Loader2Icon className='animate-spin' /> : <Sparkle />}Generate Course</Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewCourses