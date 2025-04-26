import { Button } from '@/components/ui/button';
import { updatePassword } from '@/store/slices/userSlice';
import { Label } from '@radix-ui/react-label';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Input } from '@/components/ui/input';
import { Eye, EyeIcon, EyeOff, EyeOffIcon, LucideEyeOff } from 'lucide-react';



const UpdatePassword = () => {

    const [currentPassword, setCurrentPassword] =useState("");
    const [newPassword, setNewPassword] =useState("");
    const [confirmPassword, setConfirmPassword] =useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading, error, isUpdated, message} = useSelector(
        state=> state.user);
    
 
    const dispatch = useDispatch();
    const handleUpdatePassword =()=>{
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required!");
            return; 
        }
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirmation do not match!");
            return; // Stop the function if passwords do not match
        }
        dispatch(updatePassword(currentPassword, newPassword, confirmPassword));
    

    }
    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearAllUserErrors());
        }
        if (isUpdated) {
        
          dispatch(resetprofile());
        }
        if (!message) {
          toast.success(message);
        }
      }, [dispatch, loading, error, isUpdated]);
    


    return (
        <div className="w-full h-full">
            <div>
                <div className="grid w-[100%] gap-6">
                    <div className="grid gap-2">
                        <h1 className="text-3xl font-bold">
                            Update Password
                        </h1>
                        <p className="mb-10">
                            Update your password
                        </p>
                    </div>
                </div>

                    <div className="grid gap-2 mt-3" >
                        <Label>Current Password</Label>
                        <div className="relative">
                        <Input
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Your Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-black border-none focus:outline-none"
                        >
                            {showCurrentPassword ? <EyeOffIcon className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
                    <div className="grid gap-2 mt-7">
                        <Label>New Password</Label>
                        <div className="relative">
                        <Input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Your New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-black border-none focus:outline-none"
                        >
                            {showNewPassword ? <EyeOffIcon className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                    </div>
                    </div>
                    <div className="grid gap-2 mt-7">
                        <Label>Confirm New Password</Label>
                        <div className="relative">
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-black border-none focus:outline-none"
                        >
                            {showConfirmPassword ? <LucideEyeOff className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </Button>
                    </div>
                    </div>
                    {!loading ? (
                            <Button
                                onClick={handleUpdatePassword}className="w-full mt-10"
                            >
                            Update Profile
                            </Button>
                            
                            ) : (
                                <SpecialLoadingButton content={"Updating password"} />
                            )}
            </div>
        </div>
    );
}

export default UpdatePassword;

