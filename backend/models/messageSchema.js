import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema({
    SenderName:{
        type: String,
        minLength: [2, "Name must contain at least 2 chracter"],

    },
    subject:{
     type: String,
     minLength: [2, "Subject must contain at least 2 chracters"],     
    },
    message:{
        type: String,
        minLength: [2, "Message must contain at least 2 chracters"],
    },
    createdAt:{
        type: Date,
        default: Date.now(), 
    },
    
});
export const Message = mongoose.model("Message", messageSchema);
