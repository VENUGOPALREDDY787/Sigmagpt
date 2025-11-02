import "./ChatWindow.css";
import Chat from "./Chat";
import { MyContext } from "./Mycontex";
import { useContext ,useState,useEffect} from "react";
import {ScaleLoder} from "react-spinners";


function ChatWindow() {
  const { prompt,setPrompt,reply,setReply,currThreadId, setCurrThreadId,pervChat, setPervchat} = useContext(MyContext);
  const [loading,setLoading] = useState(false)
  const getReply = async()=>{
    setLoading(true);
    const options ={
      method:"POST",
      header:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:prompt,
        threadId:currThreadId
      })
    };
    try{
      const reponse =await fetch("http://localhost:8080/api/chat",options);
      const res = await reponse.json();
      console.log(res);
      setReply(res.reply);
    }catch(err){
      console.log(err);
    }
    setLoading(false);
  }
//Append new chat to prevChat
useEffect(() =>{
  if(prompt && reply){
    setPervchat(pervChats =>(
       [...pervChat,{role:"user",content:prompt},{role:'assistant',content:reply}]
    ));
   
  }
  setPrompt("");
},[reply]);


  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          Simagpt <i className="fa-solid fa-arrow-down"></i>
        </span>
        <div className="userIconDiv">
          <span className="userIcon">
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat></Chat>
      <ScaleLoder color="#fff" loading={loading}>

      </ScaleLoder>

      <div className="chatInput">
        <div className="userInput">
          <input type="text" placeholder="Anything Ask " 
          value={prompt} 
          onChange={(e)=>setPrompt(e.target.value)} 
          onKeyDown={(e)=>e.key === 'Enter'?getReply():''}
          />
          <div id="submit"onClick={getReply}>
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          Sigmagpt can make mistakes.Check important info see cookies
          preferendes.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
