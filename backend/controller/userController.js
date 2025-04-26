import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errors.js";
import { Message } from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { json } from 'express';
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";

import crypto from "crypto";
import { Subscriber } from "../models/subscriberSchema.js";


export const register = catchAsyncErrors(async (req, res, next) => {
    // Check for required avatar and resume files
    if (!req.files || (Object.keys(req.files).length === 0 || !req.files.avatar || !req.files.resume)) {
        return next(new ErrorHandler("Avatar and Resume are Required", 400));
    }

    // Upload Avatar to Cloudinary
    const avatar = req.files.avatar;
    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        { folder: "AVATARS" }
    );
    if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
        console.error("Cloudinary Error (Avatar)", cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Avatar upload failed", 500)); // Handle error appropriately
    }

    // Upload Resume to Cloudinary
    const resume = req.files.resume;
    const cloudinaryResponseForResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: "MY_RESUMES" }
    );
    if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
        console.error("Cloudinary Error (Resume)", cloudinaryResponseForResume.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Resume upload failed", 500)); // Handle error appropriately
    }

    // Extract user data from request body
    const {
        fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        telegramURL,
        facebookURL,
        linkedInURL,
        twitterURL
    } = req.body;

    // Create user document with avatar and resume details
    const user = await User.create({
        fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        telegramURL,
        facebookURL,
        linkedInURL,
        twitterURL,
        avatar: {
            public_id: cloudinaryResponseForAvatar.public_id,
            url: cloudinaryResponseForAvatar.secure_url,
        },
        resume: {
            public_id: cloudinaryResponseForResume.public_id,
            url: cloudinaryResponseForResume.secure_url,
        }
    });
    console.log("Environment variables loaded:", process.env.JWT_SECRET);
    generateToken(user, "User Registered!", 201, res);
});

export const login = catchAsyncErrors(async(req,res,next) => {
    const { email, password } =req.body;
    if (!email || !password){
        return next (new ErrorHandler("Email and Password Are Required"));

    }
    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return next (new ErrorHandler("Invalid Email Or Password!"));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next (new ErrorHandler("Invalid Email Or Password!"));
    }
   // console.log("user", user);
   //console.log("Environment variables loaded:", process.env.JWT_SECRET);

    generateToken(user, "Logged In ", 200, res)
});
export const logout = catchAsyncErrors(async(req,res,next)=> {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        MessageL: "Logged Out",
    })
});

export const getuser = catchAsyncErrors(async(req, res, next) => {
    const user  = await User.findById(req.user.id );
    res.status(200).json({
        success: true,
        user,
    });
});

/*
export const updateProfile = catchAsyncErrors(async(req,res, next)=> {
    const newUserdata = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        aboutMe : req.body.aboutMe,
        portfolioURL: req.body.portfolioURL,
        githubURL: req.body.githubURL,
        instagramURL: req.body.instagramURL,
        telegramURL: req.body.telegramURL,
        facebookURL: req.body.facebookURL,
        linkedInURL: req.body.linkedInURL,
        twitterURL: req.body.twitterURL,
    };
    if(req.files && req.files.avatar){
        const avatar = req.files.avatar;
        const user = await User.findById(req.user.id);
        const profileImageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId);
        const cloudinaryResponse = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            { folder: " AVATARS" }
        );
        newUserdata.avatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    }
    if(req.files && req.files.resume){
        const resume = req.files.resume;
        const user = await User.findById(req.user.id);
        const resumeId = user.resume.public_id;
        await cloudinary.uploader.destroy(resumeId);
        const cloudinaryResponse = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            { folder: " MY_RESUME" }
        );
        newUserdata.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        };
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserdata,{
        new: true,
        runValidators: true,
        userFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Profile Updated",
        user,

    })
}) */
    export const updateProfile = catchAsyncErrors(async (req, res, next) => {
        const newUserdata = {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            aboutMe : req.body.aboutMe,
            portfolioURL: req.body.portfolioURL,
            githubURL: req.body.githubURL,
            instagramURL: req.body.instagramURL,
            telegramURL: req.body.telegramURL,
            facebookURL: req.body.facebookURL,
            linkedInURL: req.body.linkedInURL,
            twitterURL: req.body.twitterURL,
        };
    
        // Avatar upload handling
        if (req.files && req.files.avatar) {
            const avatar = req.files.avatar;
    
            // Validate file type for avatar
            if (!avatar.mimetype.startsWith('image/')) {
                return next(new ErrorHandler('Invalid image file type', 400));
            }
    
            const user = await User.findById(req.user.id);
            const profileImageId = user.avatar.public_id;
    
            try {
                await cloudinary.uploader.destroy(profileImageId);
            } catch (error) {
                console.error("Error deleting old avatar:", error);
            }
    
            try {
                const cloudinaryResponse = await cloudinary.uploader.upload(
                    avatar.tempFilePath,
                    { folder: "AVATARS" }
                );
                newUserdata.avatar = {
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url
                };
            } catch (error) {
                console.error("Error uploading avatar:", error);
                return next(new ErrorHandler('Avatar upload failed', 500));
            }
        }
    
        // Resume upload handling
        if (req.files && req.files.resume) {
            const resume = req.files.resume;
    
            // Validate file type for resume (e.g., PDF, DOC)
            if (!resume.mimetype.startsWith('application/') && !resume.mimetype.startsWith('image/')) {
                return next(new ErrorHandler('Invalid resume file type', 400));
            }
    
            const user = await User.findById(req.user.id);
            const resumeFileId = user.resume.public_id;
    
            try {
                if (resumeFileId) {
                    await cloudinary.uploader.destroy(resumeFileId);
                }
            } catch (error) {
                console.error("Error deleting old resume:", error);
            }
    
            try {
                const cloudinaryResponse = await cloudinary.uploader.upload(
                    resume.tempFilePath,
                    { folder: "MY_RESUMES" }
                );
                newUserdata.resume = {
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url
                };
            } catch (error) {
                console.error("Error uploading resume:", error);
                return next(new ErrorHandler('Resume upload failed', 500));
            }
        }
    
        // Update user data
        const user = await User.findByIdAndUpdate(req.user.id, newUserdata, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    
        res.status(200).json({
            success: true,
            message: "Profile Updated",
            user,
        });
    });
    

    /*if (req.files && req.files.resume) {
        const resume = req.files.resume;
        const user = await User.findById(req.user.id);
        const resumeFileId = user.resume.public_id;
        if (resumeFileId) {
          await cloudinary.uploader.destroy(resumeFileId);
        }
        const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
          folder: "MY_RESUMES"
        });
        newUserData.resume = {
          public_id: newResume.public_id,
          url: newResume.secure_url,
        };
      }
    
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        message: "Profile Updated!",
        user,
      });
    });*/




export const updatePassword =catchAsyncErrors(async(req,res,next)=>{
    const{  currentPassword, newPassword, confirmPassword } = req.body;
    if(!currentPassword || !newPassword || !confirmPassword){
        return next(new ErrorHandler("Please Fill All Fileds", 400));
    }
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(currentPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect Current Password ", 400));

    }
    if(newPassword !== confirmPassword){
        return next(
            new ErrorHandler(
                "New Password And Confirm New Password Does Not Match"
            ,400)
        );
    }
    user.password = newPassword;
     await user.save();
     res.status(200).json({
        success: true,
        message: "Password Updated Successfully"
     })
});


export const getuserForPortfolio = catchAsyncErrors(async(req,res,next)=>{
    const id = "66fc419c5010e9a9c21d4195";
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        user,

    });
});

export const forgetPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        return next(new ErrorHandler("User Not Found", 400));

    }
   
    const resetToken = user.getResetPasswordToken();  // Ensure consistent naming (resetToken)
    await user.save({ validateBeforeSave: false });   // Save user without validation

// Correct URL template with resetToken
    const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

// Correct the message content
    const message = `Your Reset Password Token is:\n\n ${resetPasswordUrl} \n\nIf you did not request this, please ignore it.`;


    
    
    try{
        await sendEmail({
            email: user.email,
            subject: "Personal Portfolia Dashboard Recovery Password",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    }catch (error) {
        user.restPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
        return next(new ErrorHandler(error.message, 500));

    }

});


/*
export const resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.params;
    const resetPasswordToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExprie: {$gt: Date.now() },
    });
    if(!user){
        return next(new ErrorHandler("Reset passsword token is invalid or has been expired"),
    );
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password & confirm Password Do Not Match."));
    }
    user.password = req.body.password;
    user.resetPasswordExprie = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    generateToken(user, "Reset password successfully!", 200, res);
});*/
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.params;  // Use token from req.params
    const resetPasswordToken = crypto.createHash("sha256")
        .update(token)  // Use token instead of resetToken
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExprie: { $gt: Date.now() },  // Check if the token is still valid
    });

    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has expired"));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match."));
    }

    // Update the user's password
    user.password = req.body.password;
    user.resetPasswordExprie = undefined;
    user.resetPasswordToken = undefined;

    await user.save();  // Save the updated user with the new password

    generateToken(user, "Password reset successfully!", 200, res);
});
export const sendNewsletterToSubscribers = catchAsyncErrors(async (req, res, next) => {
    const { subject, message } = req.body;
  
    // Fetch all subscribers
    const subscribers = await Subscriber.find();
  
    if (subscribers.length === 0) {
      return res.status(400).json({ success: false, message: "No subscribers found." });
    }
  
    // Send email to each subscriber
    for (const subscriber of subscribers) {
      await sendEmail({
        email: subscriber.email,
        subject,
        message,
      });
    }
  
    res.status(200).json({ success: true, message: "Newsletter sent to all subscribers!" });
  });
