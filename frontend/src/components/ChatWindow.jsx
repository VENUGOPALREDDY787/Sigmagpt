import React from 'react';
import "./ChatWindow.css";
import { Mycontext } from './MyContext.jsx';
import Chat from './Chat.jsx';
function ChatWindow() {
    const {prompt ,setprompt,reply, setReply,currThreadId, setCurrThreadId} = Mycontext;
    const getReply = async()=>{
        const options={
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            message:prompt,
            threadId:currThreadId,
        })
    };
    try{
        const responce = await fetch("http://localhost:8080/api/chat",options);
        setReply(responce.reply);
        setprompt('');
    } catch(err){
        console.log(err);
    }
    }
    return (<div className="chatWindow">
        <div className="navbar">
            <span>SigmaGPT &nbsp; <i className="fa-solid fa-angle-down"></i></span>
            <div className="userrIconDiv">
               <span className='userIcon'> <i className="fa-solid fa-user"></i></span>
            </div>
        </div>
        <Chat></Chat>
        <div className="chatInput">
            <div className="userInput">
                <input placeholder='Ask Somthing' value={prompt} onChange={(e)=> setprompt(e.target.value)}
                onKeyDown={(e)=>e.key ==="Enter"?getReply():""}></input>
                <div id="submit" onClick={getReply} ><i className="fa-solid fa-paper-plane"></i></div>
            </div>
            <p className="info">SigmaGpt can make mistakes. Check important info .See  Cookies Perferences.</p>
        </div>
    </div> );
}

export default ChatWindow;