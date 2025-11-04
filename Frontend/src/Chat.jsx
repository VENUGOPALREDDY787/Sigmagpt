import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./Mycontex";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, pervChat,reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if(!pervChat?.length)return;

    const content = reply.split("");
     let idx =0;
     const interval =setInterval(()=>{
        setLatestReply(content.slice(0,idx+1).join(""));
        idx++;
        if(idx >= content.length) clearInterval(interval);
     },40);
     return ()=>{clearInterval(interval);}
  }, [pervChat, reply]);
  return (
    <>
      {newChat && <h1>Start a New Chat</h1>}
      <div className="chats">
        {pervChat?.slice(0, -1).map((chat, idx) =>
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? 
              <p className="userMessage">{chat.content}</p>
             : 
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            }
            {
                pervChat.length > 0 && latestReply !== null &&
                <div className="gptDiv" key={"typing"}>
                     <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {latestReply}
              </ReactMarkdown>
                </div>
            }
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
