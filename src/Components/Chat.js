import React, { useContext } from "react";
import Cam from '../Images/cam.png';
import More from "../Images/more.png";
import Add from '../Images/add.png';
import Messages from "./Messages";
import Input from "./Input";
import { ChatsContext } from "../context/ChatsContext";

const Chat =() => {
    const {data} = useContext(ChatsContext);

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt=""/>
                    <img src={Add} alt=""/>
                    <img src={More}  alt=""/>
                </div>

               
            </div>
            <Messages />
            <Input />
        </div>
    )
}


export default Chat;