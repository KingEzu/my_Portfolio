import { clearAllForgetPasswordErrors, resetPassword } from '@/store/slices/forgetResetPassSlice';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { getUser } from "@/store/slices/userSlice";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { loading, error, message } = useSelector(
        (state) => state.forgetPassword
    );
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleResetPassword = (password, confirmPassword) => {
        dispatch(resetPassword(token, password, confirmPassword));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllForgetPasswordErrors());
        }
        if (isAuthenticated) {
            navigateTo("/");
        }
        if (message !== null) {
            toast.success(message);
            navigateTo("/login"); // Optionally redirect to login after successful reset
        }
    }, [dispatch, isAuthenticated, error, loading, message, navigateTo]);

    return (
        <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
            <div className="min-h-[100vh] flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Reset Password</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your new password below
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password" // Added autocomplete
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                autoComplete="new-password" // Added autocomplete
                            />
                        </div>
                        {!loading ? (
                            <Button
                                onClick={() => handleResetPassword(password, confirmPassword)}
                                className="w-full"
                            >
                                Reset Password
                            </Button>
                        ) : (
                            <SpecialLoadingButton content={"Resetting"} />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center bg-muted">
                <img src="/reset.png" alt="reset password" />
            </div>
        </div>
    );
};

export default ResetPassword;
