import React, { useState } from "react";
import Attach from '../Images/attach.png';
import AddImage from '../Images/addImage.png';
import { useContext } from "react";
import { ChatsContext } from "../context/ChatsContext";
import { v4 as uuid } from "uuid";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";

const Input =() => {
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatsContext);

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const handleSend = async() => {

        if(img){
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
    
            uploadTask.on(
            (error) => {
            //    setError(true);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then(async(downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: uuid(),
                            text, 
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL,
                        })
                    })
            
                });
            }
            );
            
        }else{
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text, 
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    }

    return(
        <div className="input">
            <input type="text" placeholder="Type Something..."
            value={text} onChange={e=> setText(e.target.value)}
            />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{display: "none"}} id="file" onChange={(e)=> setImg(e.target.files[0])}/>
                <label htmlFor="file">
                    <img src={AddImage} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input;