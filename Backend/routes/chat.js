import express from "express";
import Thread from "../models/Thread.js";
import { Chat } from "openai/resources/index.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();
router.post("/test", async(req, res)=>{
    try{const thread = new Thread({
        threadId:"xyz",
        title:"Testing New Thread"
    });
    const response = await thread.save();
    res.send(response);
} catch(err){
    console.log(err);
    res.status(500).json({error:"Failed to save in DB"});
}
});

//get All the Thareads
router.get("/thread",async(req,res)=>{
    try{
        const therads = await Thread.find({}).sort({updatedAt:-1});
        res.json(therads);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to flech the chats"});
    }
});
//get the threads by the id

router.get("/thread/:threadId", async(req,res)=>{
     const {threadId} = req.params;
    try{
        const thread = await Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error:"thread not found"})
        }
        res.json(thread.messages);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to flech the chat"});
    }
});
router.delete("/thread/:threadId",async(req,res)=>{
    const {threadId} = req.params;
    try{
     const deleteTherad = await Thread.findOneAndDelete({threadId});
     if(!deleteTherad){
        res.status(404).json({error: "Thread coud not be deleted"});
     }
     res.status(200).json({success:"the Thread is deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to flech and delete the Chat"});
    }
});
// The Main chat router
router.post("/chat",async(req,res)=>{
const {threadId, message }=req.body;
if(!threadId || !message){
    req.status(400).json({error:"missing required field"});
}
try{
    const thread = await Thread.findOne({threadId});
    
    if(!thread){
        //create a new thread is db
        thread = new Thread({
            threadId,
            title:message,
            messages:[{role:"user", content:message}]
        });
    }else{
        thread.messages.push({role: "user",content: message});
    }
    const assistantreplay = getOpenAIAPIResponse(message);
    thread.messages.push({role:"assistant",content:assistantreplay});
    thread.updatedAt = new Date();
    await thread.save();
    res.json({reply: assistantreplay});
}catch(err){
console.log(err);
res.status(500).json({error:"Failed to flech and delete the Chat"});
}
});

export default router;