import { Avatar } from "@material-ui/core";
import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { setchannelInfo } from "./features/channelSlice";
import db from "./firebase";
import "./SidebarChannel.css";
import * as timeago from 'timeago.js'

export const SidebarChannel = ({ id, channelName }) => {
  //when we click on the sidebar channel(we need to dispatch information to redux store that what channel we are in) ,we need to dispatch an action so that header name inside the Chat component can be changed . For that we need to use useDispatch

  const dispatch = useDispatch();

  const [messageInfo,setMessageInfo] =useState([])

  useEffect(() => {
      db.collection("channels")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
        setMessageInfo(
            snapshot.docs.map((doc) =>  doc.data(),
            )
          )
        );
  }, [id]);

  const changingHeaderAfterClick = () => {
    dispatch(
      setchannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
  };

  return (
    <div onClick={changingHeaderAfterClick} className="channel">
      <Avatar src={messageInfo[0]?.photo} />
      <div className="channel__info">
        <h3>{channelName}</h3>
        <p>{messageInfo[0]?.message}</p>
        <small>
          {
            timeago.format(new Date(messageInfo[0]?.timestamp?.toDate()))
          }
        </small>
        {/* <p>Last message sent...</p>
        <small>timestamp</small> */}
      </div>
    </div>
  );
};
