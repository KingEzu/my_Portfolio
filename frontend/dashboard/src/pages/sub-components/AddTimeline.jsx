import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './SpecialLoadingButton'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { addNewTimeline, clearAllTimelineErrors, getAllTimeline, resetTimelineSlice } from '@/store/slices/timelineSlice'
import { toast } from 'react-toastify'

const AddTimeline = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    const { loading, error, message } = useSelector((state) => state.timeline);
    const dispatch = useDispatch()

    const handleFromChange = (e) => {
        const value = e.target.value;
        setFrom(value);
        if (to && value > to) {
            setTo(value);
        }
    };

    const handleToChange = (e) => {
        const value = e.target.value;
        if (value >= from) {
            setTo(value);
        } else {
            toast.error("Ending year must be greater than or equal to the starting year");
        }
    };

    const handleAddNewTimeline = (e) => {
        e.preventDefault();
        if (!title) {
            toast.error('Title is required');
            return;
        }
        if (!description) {
            toast.error('Description is required');
            return;
        }
        if (!from) {
            toast.error('Starting date is required');
            return;
        }
        if (!to) {
            toast.error('Ending date is required');
            return;
        }
        if (parseInt(from) > parseInt(to)) {
            toast.error('Starting year cannot be greater than ending year');
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("from", from);
        formData.append("to", to);
        dispatch(addNewTimeline(formData));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllTimelineErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetTimelineSlice());
            dispatch(getAllTimeline());

            // Clear form after success
            setTitle("");
            setDescription("");
            setFrom("");
            setTo("");
        }
    }, [error, message, dispatch]);

    return (
        <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:pl-14">
            <form className="w-[100%] px-5 md:w-[650px]" onSubmit={handleAddNewTimeline}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center dark:text-gray-100">
                            Add A New Timeline
                        </h2>
                        <div className="mt-10 flex-col gap-5">
                            <div className="w-full sm:col-span-4">
                                <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                    Title
                                </Label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <Input
                                            type="text"
                                            placeholder="Matriculation"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full sm:col-span-4">
                                <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                    Description
                                </Label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <Textarea
                                            type="text"
                                            value={description}
                                            placeholder="Timeline Description"
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full sm:col-span-4">
                                <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                    From
                                </Label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <Input
                                            type="number"
                                            placeholder="Starting period"
                                            value={from}
                                            onChange={handleFromChange}
                                            min="2000"
                                            max={new Date().getFullYear()}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full sm:col-span-4">
                                <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                    To
                                </Label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <Input
                                            type="number"
                                            placeholder="Ending period"
                                            value={to}
                                            onChange={handleToChange}
                                            min={from} // Ensure 'to' starts from 'from'
                                            max={new Date().getFullYear()}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading ? <SpecialLoadingButton content={"Adding.."} /> : <Button className="w-full">Add Timeline</Button>}
                </div>
            </form>
        </div>
    );
}

export default AddTimeline;
