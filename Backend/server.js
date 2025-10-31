import express, { application, json } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRouter from "./routes/chat.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const connectDb = async()=>{await mongoose.connect('mongodb://127.0.0.1:27017/sigmagpt')}

app.use('/api',chatRouter)


// app.post("/text",async(req,res)=>{
//     const options ={
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//             "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model:"gpt-4o-mini",
//             messages :[{
//                 role:"user",
//                 content:req.body.message
//             }]
//         })
//     };
//     try{
//         const response = await fetch("https://api.openai.com/v1/chat/completions",options);
//         const data = response.json();
//         console.log(data.choices[0],message.content);
//         res.send(data.choices[0],message.content);
//     }catch(err){
//         console.log(err);
//     }
// });

app.listen(PORT ,()=>{
 console.log(`the server is rning in the ${PORT}`);
 connectDb().then(()=>{
    console.log("databast is connected");
}).catch((err)=>{
    console.log(" U got the errornectiong the database plsee check in con")
});
});

