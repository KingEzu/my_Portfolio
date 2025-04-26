import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import {  softwareApplication } from "../models/softwareApplicationSchema.js";  // Model import
import ErrorHandler from "../middlewares/errors.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || (Object.keys(req.files).length === 0 || !req.files.svg)) {
        return next(new ErrorHandler("Software Application Icon/svg Required!", 400));
    }

    // Upload SVG to Cloudinary
    const { svg } = req.files;
    const { name } = req.body;

    if (!name) {
        return next(new ErrorHandler("Software Name is Required!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        svg.tempFilePath,
        { folder: "PORTFOLIA_SOFTWARE_APPLICATIONS" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error (SVG)", 
            cloudinaryResponse.error || "Unknown Cloudinary Error"
        );
        return next(new ErrorHandler("Software Application upload failed", 500));
    }

    // Create a new software application in the database
    const newSoftwareApplication = await softwareApplication.create({
        name,
        svg: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        Message: "New Software Application Added!",
        softwareApplication: newSoftwareApplication, // Return the newly created instance
    });
});

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;  // Corrected to req.params
    const application = await softwareApplication.findById(id);  // Use 'application' to store the result

    if (!application) {
        return next(new ErrorHandler("Software Application Not Found", 404));
    }

    const softwareApplicationSvgId = application.svg.public_id;
    await cloudinary.uploader.destroy(softwareApplicationSvgId);  // Destroy the associated SVG in Cloudinary
    await application.deleteOne();  // Delete the application from the database

    res.status(200).json({
        success: true,
        message: "Software Application Deleted!"  // Corrected case for consistency
    });
});


export const getAllApplication = catchAsyncErrors(async (req, res, next) => {
    const softwareApplications = await softwareApplication.find();
    res.status(200).json({
        success: true,
        softwareApplications,

    }); 
});