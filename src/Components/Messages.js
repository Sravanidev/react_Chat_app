import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatsContext } from "../context/ChatsContext";
import { db } from "../firebase";
import { doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

const Messages =()=> {
    const [messages, setMessages] = useState([]);
    const {data} = useContext(ChatsContext);
    
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc)=> {
            doc.exists() && setMessages(doc.data().messages||[]);
        });
  
        return ()=> {
            unsub();
        }
    }, [data.chatId]);

    return(
        <div className="messages">
            {messages.map((mes)=> (
                <Message message={mes} key = {mes.id}/>
            ))}

        </div>
    )
}

export default Messages;