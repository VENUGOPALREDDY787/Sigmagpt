import "./Chat.css"
import { useContext } from "react";
import { MyContext } from "./Mycontex";


function Chat() {
    const {newChat, pervChat, setPervchat,} =  useContext(MyContext);
    return ( <>
    {newChat && <h1>Start a New Chat</h1>}
    <div className="chats">

        {
            pervChat?.map((chat,idx)=>
            <div className={chat.role === "user"? "userDiv":"gptDiv"} key={idx}>
                {
                    chat.role === "user"?
                    <p className="userMessage">{chat.content}</p>:
                    <p className="gptMessage">{chat.content}</p>
                }
            </div>
            )
        }

    </div>
    </>

     );
}

export default Chat;