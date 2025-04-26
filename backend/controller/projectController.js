import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Ensure this path is correct
import ErrorHandler from "../middlewares/errors.js";
import { v2 as cloudinary } from "cloudinary";
import { Project } from "../models/projectSchema.js"; // Correct the import

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Project Banner Image Is Required!"));
    }

    const { projectBanner } = req.files;
    const {
        title,
        description,
        gitRepoLink, // Corrected typo here
        projectLink, // Corrected typo here
        technologies,
        stack,
        deployed,
    } = req.body;

    if (!title || !description || !gitRepoLink || !projectLink || !technologies || !stack || !deployed) {
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        { folder: "PROJECT_IMAGES" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error (SVG)", cloudinaryResponse.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Failed To Upload This Project", 500));
    }

    const project = await Project.create({ // Use 'Project' to create a new project
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
        projectBanner: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });

    res.status(201).json({
        success: true,
        message: "New Project Is Added",
        project,
    });
});


export const deleteProject = catchAsyncErrors(async (req, res, next) => {
    const{ id } = req.params;
    const project = await Project.findById(id); 
    if(!project){
        return next(new ErrorHandler("Project Not Found", 400));
    }  
    await project.deleteOne();
    res.status(200).json({
        success: true,
        message: "Project Deleted!",
    });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {
    const newProjectData = {
        title: req.body.title,
        description: req.body.description,
        gitRepoLink: req.body.gitRepoLink,
        projectLink: req.body.projectLink,
        technologies: req.body.technologies,
        stack: req.body.stack,
        deployed: req.body.deployed,
    }; 

    // Check if project exists before updating
    let project = await Project.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler("Project not found", 404));
    }

    // Handle projectBanner file upload if present
    if (req.files && req.files.projectBanner) {
        const projectBanner = req.files.projectBanner;

        // Delete the old project banner from Cloudinary
        const projectBannerId = project.projectBanner.public_id;
        await cloudinary.uploader.destroy(projectBannerId);

        // Upload the new banner
        const cloudinaryResponse = await cloudinary.uploader.upload(
            projectBanner.tempFilePath, // Corrected to use projectBanner.tempFilePath
            { folder: "PROJECT_IMAGES" }
        );

        newProjectData.projectBanner = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    // Update the project
    project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
        new: true,
        runValidators: true,
        useFindAndModify: false, // Corrected the option key
    });

    if (!project) {
        return next(new ErrorHandler("Failed to update the project", 500));
    }

    res.status(200).json({
        success: true,
        message: "Project Updated",
        project,
    });
});




export const getAllProject = catchAsyncErrors(async (req, res, next) => {
    const projects = await Project.find(); // Fetch all projects
    res.status(200).json({
        success: true,
        projects,
    });
});

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(req.params.id); // Fetch a single project by ID
    if (!project) {
        return next(new ErrorHandler("Project Not Found", 404));
    }
    res.status(200).json({
        success: true,
        project,
    });
});
