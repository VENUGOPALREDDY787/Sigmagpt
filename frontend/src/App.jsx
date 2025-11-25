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
const providerValues = {
  prompt ,setprompt,
  reply, setReply,
  currThreadId, setCurrThreadId
};
  return (

    <div className="app">
      <Mycontext.Provider vlaues = {providerValues}>
      <Sidebar/>
      <ChatWindow/>
      </Mycontext.Provider>
    </div>
  )
}

export default App
