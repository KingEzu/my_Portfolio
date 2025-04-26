import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errors.js";
import { Timeline } from "../models/timelinSchema.js";

export const postTimeline = catchAsyncErrors(async(req,res,next)=>{
    const { title, description, from, to } =req.body;
    const newtimeline = await Timeline.create({ 
        title,
        description,
        timeline:{ from, to }
    });  
    res.status(200).json({
        success: true,
        messsage: "timeline added",
        newtimeline,
        
    })
});



export const deleteTimeline = catchAsyncErrors(async(req,res,next)=>{
    const {id} =req.params;
    const timeline = await Timeline.findById(id);
    if(!timeline){
        return next(new ErrorHandler("timline not found"))

    } 
    await timeline.deleteOne();
    res.status(200).json({
        success: true,
        messsage: "timeline Deleted"
    })
});






export const getAllTimelines = catchAsyncErrors(async(req,res,next)=>{
    const timeline = await Timeline.find();
    res.status(200).json({
        success: true,
        timeline,

    }); 
});
