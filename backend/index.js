import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import cors from "cors";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api",chatRoutes)
const connecDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected with db");
    } catch(err){
        console.log("Failed to connect to the database",err);
    }
}


app.listen(PORT,() =>{
    console.log(`server running on ${PORT}`);
    connecDB();
});


// app.post("/test", async (req, res)=>{
//     const options={
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body:JSON.stringify({
//             model:"gpt-4o-mini",
//             messages:[{
//                 role:"user",
//                 content: req.body.messages
//             }]
//         })
//     };
    
//     try{
//         const responce = await fetch("https://api.openai.com/v1/chat/completions",options);
//         const data = await responce.json();
//         // console.log(data);
//         res.send(data.choices[0].messages.content);
//     }catch(err){
//         console.log(err);
//     }
// });