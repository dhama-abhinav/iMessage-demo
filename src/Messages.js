import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Messages.css";
import * as timeago from 'timeago.js'

export const Messages = forwardRef(({
  id,
  contents: { timestamp, email, displayName, uid, photo, message },
  
} , ref) => {

    const user = useSelector(selectUser)

    

  return (
    <div ref={ref} className={ `messages ${user.email === email && 'message__sender'}`}>
      <Avatar className='message__image' src={photo} />
      <p>{message}</p>
      <small>
          { timeago.format(new Date(timestamp?.toDate()))}
          {/* new Date(timestamp?.toDate()).toUTCString() */}
          </small>
    </div>
  );
});

//https://i.pinimg.com/originals/b0/bc/57/b0bc57c5f4db8d971de7f448ee351098.png
