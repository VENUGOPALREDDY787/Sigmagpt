import "./ChatWindow.css";
import Chat from "./Chat";
import { MyContext } from "./Mycontex";
import { useContext } from "react";


function ChatWindow() {
  const { prompt,setPrompt,reply,setReply} = useContext(MyContext);
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          Simagpt <i class="fa-solid fa-arrow-down"></i>
        </span>
        <div className="userIconDiv">
          <span className="userIcon">
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat></Chat>
      <div className="chatInput">
        <div className="userInput">
          <input type="text" placeholder="Anything Ask " />
          <div id="submit">
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
