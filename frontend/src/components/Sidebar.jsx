import React, { useEffect, useContext } from 'react';
import { Mycontext } from './MyContext';
import { v1 as uuidv1 } from "uuid";
import "./Sidebar.css";

function Sidebar() {
    const { 
        allThreads, setPrevChat, setAllThreads, currThreadId, setCurrThreadId,
        newChat, setNewChat, setprompt, setReply 
    } = useContext(Mycontext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            setAllThreads(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setprompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChat([]);
    };

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            setPrevChat(res);           // assuming backend returns messages array
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log(err);
        }
    };
    const deleteThread = async(threadId)=>{

    try {
        const responce = await fetch(`http://localhost:8080/api/thread/${threadId}`,{method:"delete"});
        const res= await responce.json();
        console.log(res);
        setAllThreads(prev => prev.filter(thread => thread.thread!== threadId));
        if(threadId === currThreadId){
            createNewChat();
        }
    } catch (error) {
        console.log(err);
    }
}

    return (
        <section className='sidebar'>
            {/* new chat button */}
            <button onClick={createNewChat}>
                <img src='src/assets/download.png' alt='gpt logo' className='logo' />
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* history */}
            <ul className="history">
                {allThreads?.map((thread, idx) => (
                    <li key={idx} onClick={() => changeThread(thread.threadId)}
                    className={thread.threadId === currThreadId?"highlighted":""}
                    >
                        {thread.title} <i className="fa-solid fa-trash-can" onClick={(e)=>{e.stopPropagation();
                            deleteThread(thread.threadId);
                        }}></i>
                    </li>
                ))}
            </ul>

            {/* Signup */}
            <div className="sign">
                <p>by Venu Gopal</p>
            </div>
        </section>
    );
}

export default Sidebar;
