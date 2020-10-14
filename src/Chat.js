import React, { useEffect, useState } from "react";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";
import { Messages } from "./Messages";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/channelSlice";
import db from "./firebase";
import firebase from 'firebase'
import { selectUser } from "./features/userSlice";
import FlipMove from 'react-flip-move'

export const Chat = () => {

  const user = useSelector(selectUser)
  const [input, setInput] = useState("");
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [messages, setMessages] = useState([]);

  //when i am clicking on the sidebar channel ,then  what it is doing is finding that channel name in the database collection and in messages and grabbing all the messages and then taking snapshots of all then they are stored in message array which is declared above in useState hook

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [channelId]);

  //sending message
  const sendMessage= (e)=>{
    e.preventDefault()

    db.collection('channels').doc(channelId).collection('messages').add(
      {
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        message:input,
        uid:user.uid,
        photo:user.photo,
        email:user.email,
        displayName:user.displayName
      }
    )

    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>To : {channelName}</h4>
        <strong>Details</strong>
      </div>
      <div className="chat__messages">
        <FlipMove>
        {messages.map(({ id, data }) => (
          <Messages key={id} contents={data} />
        ))}
        </FlipMove>
        
        {/* <Messages />
        <Messages />
        <Messages />
        <Messages /> */}
      </div>
      <div className="chat__input">
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="iMessage"
          />
          <button 
          onClick={sendMessage}
          type="submit">
            Send message
            </button>
          <MicIcon className="chat__inputMicIcon" />
        </form>
      </div>
    </div>
  );
};
// https://reynders.co/content/images/2018/01/whatsapp.jpg
