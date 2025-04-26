import mongoose, { Mongoose } from "mongoose";

const timelineSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title Required"],

    },
    description:{
        type: String,
        required: [true, "description Required"],

    },
    timeline:{
        from: {
            type: String,
            required: [true, "Timeline strating Date is Required"],


        },String,
        to: /*{
            type: String,
            required: [true, "Timeline strating Date is Required"],


        },*/String,
    },
    
    
    
});
export const Timeline = mongoose.model("Timeline", timelineSchema);
