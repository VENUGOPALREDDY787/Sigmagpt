import React, { useContext, useState, useEffect } from 'react';
import "./ChatWindow.css";
import { Mycontext } from './MyContext.jsx';
import Chat from './Chat.jsx';
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
    const { prompt, setprompt, reply, setReply, currThreadId, setNewChat, prevChats, setPrevChat } = useContext(Mycontext);
    const [loading, setLoading] = useState(false);
    const [isopen , setIsOpen]= useState(false);

    const getReply = async () => {
        if (!prompt) return;  // prevent empty message
        setLoading(true);
        setNewChat(false);

        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: prompt, threadId: currThreadId })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    // append new chat to prevChats
    useEffect(() => {
        if (prompt && reply) {
            setPrevChat(prevChats => [
                ...prevChats,
                { role: "user", content: prompt },
                { role: "assistant", content: reply }
            ]);
            setprompt(""); // clear input after appending
        }
    }, [reply]);
    const handaleprofileclick =()=>{
        setIsOpen(!isopen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>SigmaGPT &nbsp; <i className="fa-solid fa-angle-down"></i></span>
                <div className="userrIconDiv" onClick={handaleprofileclick}>
                    <span className='userIcon'><i className="fa-solid fa-user"></i></span>
                </div>

            </div>
            {
                isopen && 
                <div className='dropDown'>
                    <div className='dropDownItem'><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan</div>
                    <div className='dropDownItem'><i class="fa-solid fa-gear"></i>Settings </div>
                    <div className='dropDownItem'><i class="fa-solid fa-arrow-right-from-bracket"></i>Log out </div>
                </div>
            }

            <Chat />

            <div className="loaderDiv">
                <ScaleLoader color='#fff' loading={loading} />
            </div>

            <div className="chatInput">
                <div className="userInput">
                    <input
                        placeholder='Ask Something'
                        value={prompt}
                        onChange={(e) => setprompt(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); getReply(); } }}
                    />
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">SigmaGPT can make mistakes. Check important info. See Cookies Preferences.</p>
            </div>
        </div>
    );
}

export default ChatWindow;
