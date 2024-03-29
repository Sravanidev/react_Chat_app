import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatsContext } from "../context/ChatsContext";


const Chats =() => {
    const {currentUser} = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const {dispatch} = useContext(ChatsContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
    
            return ()=> {
                unsub();
            }
        }
       
       currentUser.uid && getChats() 
    }, [currentUser.uid]);

    console.log(Object.entries(chats));


    const handleSelect = (user)=> {
        dispatch({type: "change_User", payload: user})
    }

    return(
        <div className="chats">
             {Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat)=> (
              <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} >
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo"> 
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>      
             ))}  
        </div>
    )
}

export default Chats;