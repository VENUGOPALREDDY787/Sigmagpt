import mongoose from "mongoose";
import { Content } from "openai/resources/containers/files/content.js";

const MessageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:["user","assistant"],
        required:true
    },
    content:{
        type: String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

const ThreadSchema = new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        default:"New CHAT!"
    },
    messages:[MessageSchema],
    createdAt:{
        type: Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
});

export default mongoose.model("Thread",ThreadSchema);