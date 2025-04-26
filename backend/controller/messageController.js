import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errors.js";
import {Message} from "../models/messageSchema.js";


export const sendMessage = catchAsyncErrors(async(req,res,next) => {
    const {SenderName, subject, message} = req.body;
    if(!SenderName || !subject || !message){
        return next(new ErrorHandler("please fill full Form", 400));

    }
    const data = await Message.create({ SenderName, subject, message});
   res.status(200).json({
        success: true,
        message: "Message Sent",
        data,


   });
});
export const getAllMessage = catchAsyncErrors(async(req,res,next)=>{
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});

export const deleteMessage = catchAsyncErrors(async(req,res,next)=>{
    const { id } = req.params;
    const message = await Message.findById(id);
    if(!message){
        return next(new ErrorHandler("Message Already deleted", 400));
    }
    await message.deleteOne();
    res.status(200).json({
        success: true,
        message: "Message Deleted",
    });
});

export const deleteAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();

    if (messages.length === 0) {
        return next(new ErrorHandler("No messages to delete", 400));
    }

    await Message.deleteMany(); // Deletes all messages from the collection

    res.status(200).json({
        success: true,
        message: "All messages deleted",
    });
});



