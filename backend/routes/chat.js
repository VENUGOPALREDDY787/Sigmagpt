import express from 'express'
const router  = express.Router();
import Thread from "../models/Thread.js"
//test
router.post("/text",async(req,res)=>{
    try{
        const thread = new Thread({
            threadId:"xyz",
            title:"teasing New Thread"
        });
        const responce = await thread.save();
        res.send(responce);
    } catch(err){
        console.log(err);
        res.status(500).json({error:'failed to save in the db'});
    }
})
//test
router.get("/thread", async(req,res)=>{
    try{
        const allThreads = Thread.find({}).sort({updatedAt:-1});
        res.json(allThreads);
    } catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to feltch threads"});
    }
});
//felche by the 
router.get('/thread/:threadId', async(req,res)=>{
    try{
        const {threadId} = req.params;
        const thread = await Thread.findOne({threadId});
        if(!thread){
res.status(404).json({error:"thread is not found"});
        }
        res.json(thread.messages);
    } catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to felecth the thread"});
    }
});
//delete
router.delete("/thread/:threadId",async(req,res)=>{
    try{
        const {threadId} = req.params;
        const thread = Thread.findOneAndDelete(threadId);
        if(!thread){
            res.status(404).json({error:"The Thread is not found"});
        }
        res.status(200).json({success:"The Thread is deleted sucessufully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Flaied to deltete the thread"});
    }
})
export default router;