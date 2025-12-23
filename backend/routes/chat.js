// import express from 'express'
// const router  = express.Router();
// import Thread from "../models/Thread.js"
// import getOpenAiApiResponce from "../utils/openai.js"
// //test
// router.post("/text",async(req,res)=>{
//     try{
//         const thread = new Thread({
//             threadId:"xyz",
//             title:"teasing New Thread"
//         });
//         const responce = await thread.save();
//         res.send(responce);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({error:'failed to save in the db'});
//     }
// })
// //test
// router.get("/thread", async(req,res)=>{
//     try{
//         const allThreads = Thread.find({}).sort({updatedAt:-1});
//         res.json(allThreads);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({error:"Failed to feltch threads"});
//     }
// });
// //felche by the 
// router.get('/thread/:threadId', async(req,res)=>{
//     try{
//         const {threadId} = req.params;
//         const thread = await Thread.findOne({threadId});
//         if(!thread){
// res.status(404).json({error:"thread is not found"});
//         }
//         res.json(thread.messages);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({error:"Failed to felecth the thread"});
//     }
// });
// //delete
// router.delete("/thread/:threadId",async(req,res)=>{
//     try{
//         const {threadId} = req.params;
//         const thread = Thread.findOneAndDelete({threadId});
//         if(!thread){
//             res.status(404).json({error:"The Thread is not found"});
//         }
//         res.status(200).json({success:"The Thread is deleted sucessufully"});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:"Flaied to deltete the thread"});
//     }
// })


// router.post("/chat", async(req, res)=>{
//     const {threadId, message}=req.body;
//      if(!threadId || !message){
//             res.status(404).json({error:'missing reqired fileds'});
//         }
//     try{
//        let thread = await Thread.findOne({threadId});
//        if(thread){
//          thread = new Thread({
//             threadId,
//             title:message,
//             messages:[{role:"user",content:message}]
//         })}
//         else{
//             thread.messages.push({role:"user",content:message});
//         }
//        const replay = await getOpenAiApiResponce( message );
//        thread.messages.push({role:"assistant", content:replay});
//        thread.updatedAt = new Date();
//        await thread.save();
//        res.json({reply:replay});

//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:"unable to fleach the data"});
//     }
// })
// export default router;

import express from "express";
const router = express.Router();

import Thread from "../models/Thread.js";
import getOpenAiApiResponce from "../utils/openai.js";

/* ---------------- TEST CREATE THREAD ---------------- */
router.post("/text", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyz",
      title: "teasing New Thread",
      messages: []
    });

    const response = await thread.save();
    res.json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to save in the db" });
  }
});

/* ---------------- GET ALL THREADS ---------------- */
router.get("/thread", async (req, res) => {
  try {
    const allThreads = await Thread.find({})
      .sort({ updatedAt: -1 });

    res.json(allThreads);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

/* ---------------- GET SINGLE THREAD ---------------- */
router.get("/thread/:threadId", async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch the thread" });
  }
});

/* ---------------- DELETE THREAD ---------------- */
router.delete("/thread/:threadId", async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await Thread.findOneAndDelete({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete the thread" });
  }
});

/* ---------------- CHAT ---------------- */
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    // If thread does NOT exist → create
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }]
      });
    }
    // If thread exists → push user message
    else {
      thread.messages.push({ role: "user", content: message });
    }

    // AI reply
    const reply = await getOpenAiApiResponce(message);

    thread.messages.push({
      role: "assistant",
      content: reply
    });

    thread.updatedAt = new Date();
    await thread.save();

    res.json({ reply });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to fetch the data" });
  }
});

export default router;

