import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clearAllSkillErrors, getAllSkills, resetSkillSlice, addNewSkill } from '@/store/slices/skillSlice'; // Corrected action imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpecialLoadingButton from './SpecialLoadingButton';
import { toast } from 'react-toastify';

const AddSkill = () => {
    const [title, setTitle] = useState('');
    const [proficiency, setProficiency] = useState('');
    const [svg, setSvg] = useState(null);
    const [svgPreview, setSvgPreview] = useState('');

    const { loading, error, message } = useSelector((state) => state.skill);
    const dispatch = useDispatch();

    // Handles SVG file upload and preview
    const handleSvg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSvg(file);
            setSvgPreview(reader.result);
        };
    };

    // Handles form submission
    const handleAddNewSkill = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('proficiency', proficiency);
        formData.append('svg', svg);
        dispatch(addNewSkill(formData)); // Dispatch correct action to add the skill
    };

    useEffect(() => {
        if (error) {
            toast.error(error); // Display error toast
            dispatch(clearAllSkillErrors()); // Clear errors after displaying
        }
        if (message) {
            toast.success(message); // Display success toast
            dispatch(resetSkillSlice()); // Reset the skill slice state after success
            dispatch(getAllSkills());
        }
    }, [error, message, dispatch]);

    return (
        <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
            <form
                className="w-[100%] px-5 md:w-[650px]"
                onSubmit={handleAddNewSkill}
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center dark:text-gray-100">
                            ADD A NEW SKILL
                        </h2>
                        <div className="mt-10 flex flex-col gap-5">
                            <div className="w-full sm:col-span-4">
                                <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                    Title
                                </Label>
                                <div className="mt-2">
                                    <Input
                                        type="text"
                                        className="block flex-1 border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100"
                                        placeholder="React.JS"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full sm:col-span-4">
                                <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                    Proficiency
                                </Label>
                                <div className="mt-2">
                                    <Input
                                        type="number"
                                        className="block flex-1 border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100"
                                        placeholder="50"
                                        value={proficiency}
                                        min={50}
                                        max={100}
                                        onChange={(e) => setProficiency(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full col-span-full">
                                <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                    Skill Svg or Image
                                </Label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        {svgPreview ? (
                                            <img
                                                className="mx-auto h-12 w-12"
                                                src={svgPreview}
                                                alt="SVG or Image Preview"
                                            />
                                        ) : (
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-300"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}

                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <Label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg- font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <Input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    accept=".svg, image/*"
                                                    className="sr-only"
                                                    onChange={handleSvg}
                                                />
                                            </Label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">
                                            Only SVG and image items (PNG, JPG, GIF) up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {loading ? (
                        <SpecialLoadingButton content={"Adding New Skill"} />
                    ) : (
                        <Button type="submit" className="w-full">
                            Add Skill
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddSkill;
