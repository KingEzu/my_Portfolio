import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errors.js";
import { v2 as cloudinary } from "cloudinary";
import { Skill } from "../models/skillSchema.js";  // Adjust the path if necessary

        

    export const addNewSkill = catchAsyncErrors(async(req,res,next)=>{
        if (!req.files || Object.keys(req.files).length === 0 ) {
            return next(
                new ErrorHandler("Skill Svg Required!", 400));
        }
    
        // Upload SVG to Cloudinary
        const { svg } = req.files;
        const { title, proficiency } = req.body;

        if(!title  || !proficiency){
            return next(new ErrorHandler("plesse Fill Full Form!"))
        }
    
        const cloudinaryResponse = await cloudinary.uploader.upload(
            svg.tempFilePath,
            { folder: "PORTFOLIA_SKILLS_SVGS" }
        );
    
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error(
                "Cloudinary Error (SVG)", 
                cloudinaryResponse.error || "Unknown Cloudinary Error"
            );
            return next(new ErrorHandler("Software Application upload failed", 500));
        }


        const skill = await Skill.create({
            title, 
            proficiency, 
            svg: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
   res.status(200).json({
        success: true,
        message: "New Skill Added",
        skill,
   })

});
    

    
    
    
export const deleteSkill = catchAsyncErrors(async(req,res,next)=>{
    const { id } = req.params;  // Corrected to req.params
    const skill = await Skill.findById(id);  // Use 'application' to store the result

    if (!skill) {
        return next(new ErrorHandler("skill Not Found", 404));
    }

    const skillSvgId = skill.svg.public_id;
    await cloudinary.uploader.destroy(skillSvgId);  // Destroy the associated SVG in Cloudinary
    await skill.deleteOne();  // Delete the Skill from the database

    res.status(200).json({
        success: true,
        message: "Skill Deleted!"  // Corrected case for consistency
    });


})
    

export const updateSkill = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let skill = await Skill.findById(id);  // Use 'let' since 'skill' will be reassigned

    if (!skill) {
        return next(new ErrorHandler("Skill Not Found", 404));
    }

    const { proficiency } = req.body;

    // Update skill proficiency
    skill = await Skill.findByIdAndUpdate(
        id,
        { proficiency }, 
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
        message: "Skill Successfully Updated!",
        skill,
    });
});

export const getAllSkill = catchAsyncErrors(async (req, res, next) => {
    const skills = await Skill.find();  // Use 'Skill' (the model) instead of 'skill'

    res.status(200).json({
        success: true,
        skills,  // Return the array of skills
    });
});
  

    
    
    
