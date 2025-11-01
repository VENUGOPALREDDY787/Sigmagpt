import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./Mycontex";
import { useState } from "react";



function App() {
  const [prompt, setPrompt] = useState("");
  cosnt [reply , setReply] = useState(null);
  const providerValues ={
    prompt,setPrompt,
    reply,setReply
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