import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./Mycontex";
import { useState } from "react";
import {v1 as uuidv1} from "uudi";



function App() {
  const [prompt, setPrompt] = useState("");
  const [reply , setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [pervChat, setPervchat] = useState([]);
  const [newChat, setNewChat] = useState(ture);
  const providerValues ={
    prompt,setPrompt,
    reply,setReply,
    currThreadId, setCurrThreadId,
    pervChat, setPervchat,
    newChat, setNewChat
  };
    return ( 
        <div className="app">
          <MyContext.Provider value={providerValues}>
            <Sidebar></Sidebar>
            <ChatWindow></ChatWindow>
            </MyContext.Provider>
        </div>
     );
}

export default App;