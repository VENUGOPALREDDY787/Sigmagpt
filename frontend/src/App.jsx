import './App.css'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { Mycontext } from './components/MyContext'
import { useState } from 'react'
import {v1 as uuidv1} from "uuid";
function App() {
const [prompt ,setprompt] =useState("");
const [reply, setReply] = useState(null);
const [currThreadId, setCurrThreadId] = useState(uuidv1());
const [prevChats, setPrevChat] = useState([]);
const [newChat, setNewChat] = useState(true);
const [allThreads, setAllThreads] = useState([]);
const providerValues = {
  prompt ,setprompt,
  reply, setReply,
  currThreadId, setCurrThreadId,
  newChat,setNewChat,
  prevChats, setPrevChat,
  allThreads, setAllThreads
};
  return (

    <div className="app">
      <Mycontext.Provider value = {providerValues}>
      <Sidebar/>
      <ChatWindow/>
      </Mycontext.Provider>
    </div>
  )
}

export default App
