import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {

    clearAllUserErrors,
    getUser,
    resetprofile,
    updateProfile,
} from "@/store/slices/userSlice";
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';

const UpdateProfile = () => {

    const {user, loading, error, isUpdated, message} = useSelector(
        state => state.user);
    const [ fullName, setFullName ] = useState(user && user.fullName); 
    const [ email, setEmail] = useState(user && user.email);   
    const [ phone, setPhone] = useState(user && user.phone);
    const [ aboutMe, setAboutMe] = useState(user && user.aboutMe);
    const [ portfolioURL, setPortfolioUrl] = useState(user && user.portfolioURL);
    const [ githubURL, setGithubURL] = useState(user && (user.githubURL === "undefined" ? "": user.githubURL));
    const [ linkedInURL, setLinkedInURL] = useState(user && (user.linkedInURL === "undefined" ? "": user.linkedInURL));
    const [ twitterURL, setTwitterURL] = useState(user && (user.twitterURL === "undefined" ? "": user.twitterURL));
    const [ instagramURL, setInstagramURL] = useState(user && (user.instagramURL === "undefined" ? "": user.instagramURL));
    const [ facebookURL, setFacebookURL] = useState(user && (user.facebookURL === "undefined" ? "": user.facebookURL));
    const [ avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
    const [ resume, setResume] = useState(user && user.resume && user.resume.url);
    const [ avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url);
    const [ resumePreview, setResumePreview] = useState(user && user.resume && user.resume.url);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    const dispatch = useDispatch();





        const avatarHandler = (event) => {
            const file = event.target.files[0];
        
            if (file) {
                setAvatar(file);  // Store the actual file
                const fileURL = URL.createObjectURL(file);
                setAvatarPreview(fileURL);
            }
        };
        
        const resumeHandler = (event) => {
            const file = event.target.files[0];
            
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setResumePreview(reader.result);  // This will show the preview
                };
                reader.readAsDataURL(file);
                setResume(file);  // Store the actual file for submission
            }
        }
        
    const openModal = (imageSrc) => {
        setModalImage(imageSrc);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
      };



      const handleUpdateProfile = () => {
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("aboutMe", aboutMe);
        formData.append("portfolioURL", portfolioURL);
        formData.append("linkedInURL", linkedInURL);
        formData.append("githubURL", githubURL);
        formData.append("instagramURL", instagramURL);
        formData.append("twitterURL", twitterURL);
        formData.append("facebookURL", facebookURL);
        //formData.append("avatar", avatar);
        //formData.append("resume", resume);
        if (avatar) formData.append("avatar", avatar);
        if (resume) formData.append("resume", resume);
    
        dispatch(updateProfile(formData));
      };

      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearAllUserErrors());
        }
        if (isUpdated) {
          dispatch(getUser());
          dispatch(resetprofile());
        }
        if (message) {
          toast.success(message);
        }
      }, [dispatch, loading, error, isUpdated]);
    


    return (
        <>
            <div className="w-full h-full">
                <div>
                    <div className="grid w-[100%] gap-6">
                        <div className="grid gap-2">
                            <h1 className="text-3xl font-bold ">
                                Update Profile
                            </h1>
                            <p className="mb-10">
                                Update your Profile Preview
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-14">
                        <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                            <div className="grid gap-2 w-full sm:w-72">
                            <Label>
                                Profile Image
                            </Label>
                            <img 
                                src={avatarPreview ? avatarPreview : `./vite.svg`} 
                                alt="avatar"
                                className="w-full h-full object-cover rounded-2xl cursor-pointer"
                                onClick={() => openModal(avatarPreview)}
                              
                            />
                             <div className="relative">\
                              <Input 
                                type="file"
                                 className="w-full h-10 object-cover rounded-3xl cursor-pointer transition-all hover:scale-1000"
                                  accept=".svg, image/*"
                                onChange={avatarHandler}
                              />
                            </div>
                            </div>
                            <div className="grid gap-2 w-full sm:w-72">
                                <Label>
                                    Resume
                                </Label>
                                <div className="w-72 h-72 relative ">
                                <img 
                                    src={ resumePreview ? resumePreview : `./vite.svg`} 
                                    alt="resume"
                                    className="w-full h-full object-cover rounded-2xl cursor-pointer"
                                    onClick={() => openModal(resumePreview)}
                                    

                                />
                                </div>
                                <div className="relative">
                              <Input
                                type="file"
                                className="avatar-update-btn"
                                onChange={resumeHandler}
                                accept=".svg, image/*"
                            />
                            </div>
                            </div>
                        {isModalOpen && (
                                <div className="fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-70 flex justify-center items-center z-50">
                                <div className="relative rounded-lg p-4 max-w-full max-h-full">
                                    <Button
                                        className="absolute top-2 right-2 text-white text-2xl font-bold cursor-pointer"
                                        onClick={closeModal}
                                    >
                                        &times;
                                    </Button>
                                  <img
                                        src={modalImage}
                                        alt="modal content"
                                        className="w-full h-full object-contain max-w-4xl max-h-96 rounded-lg"
                                      />
                                </div>
                                </div>
                        )}
                        </div>

                        <div className="grid gap-2">
                            <Label>
                                Full Name
                            </Label>
                            <Input 
                                type="text" 
                                placeholder="Your Full Name" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)} 
                            />

                        </div>
                        <div className="grid gap-2">
                            <Label>
                                email
                            </Label>
                            <Input
                                type="email" 
                                placeholder="Your Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />

                        </div>
                        <div className="grid gap-2">
                            <Label>
                               Phone
                            </Label>
                            <Input
                                type="text" 
                                placeholder="Your Phone" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>
                                About Me
                            </Label>
                            <Textarea  
                                placeholder="About Me"
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}    
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>
                               Profolio URL
                            </Label>
                            <Input
                                type="text" 
                                placeholder="Your Portofolio" 
                                value={portfolioURL} 
                                onChange={(e) => setPortfolioUrl(e.target.value)} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>
                                Github URL
                            </Label>
                            <Input
                                type="text" 
                                placeholder="Your githubURL" 
                                value={githubURL} 
                                onChange={(e) => setGithubURL(e.target.value)} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>
                                linkedIn URL
                            </Label>
                            <Input
                                type="text" 
                                placeholder="Your linkedInURL" 
                                value={linkedInURL} 
                                onChange={(e) => setLinkedInURL(e.target.value)} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>
                            X URL
                            </Label>                            
                            <Input
                                type="text" 
                                placeholder="Your twitterURL" 
                                value={twitterURL} 
                                onChange={(e) => setTwitterURL(e.target.value)} 
                            />                        
                        </div>
                        <div className="grid gap-2">
                            <Label>
                            instagram URL 
                            </Label>
                            <Input
                                type="text" 
                                placeholder="Your instagramURL" 
                                value={instagramURL} 
                                onChange={(e) => setInstagramURL(e.target.value)} 
                            />         
                            
                        </div>
                        <div className="grid gap-2">
                            <Label>
                            facebook URL
                            </Label>
                            <Input
                                type="text" 
                                placeholder="Your instagramURL" 
                                value={facebookURL} 
                                onChange={(e) => setFacebookURL(e.target.value)} 
                            />  
                        </div>

                        {!loading ? (
                            <Button
                                onClick={handleUpdateProfile}className="w-full"
                            >
                            Update Profile
                            </Button>
                            ) : (
                                <SpecialLoadingButton content={"Updating Profile"} />
                            )}
                           


                    </div>
                </div>
            </div>
        </>
    )
    
   

    
   
}

export default UpdateProfile;
