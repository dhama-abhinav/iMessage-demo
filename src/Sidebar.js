import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import { SidebarChannel } from "./SidebarChannel";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

export const Sidebar = () => {

  const user = useSelector(selectUser);
  //for rendering sidebar channels
  const [channels, setChannels] = useState([]);

  useEffect(()=>{
    db.collection('channels').onSnapshot( snapshot => {
      setChannels(snapshot.docs.map(doc =>(
        {
          id : doc.id,
          channel : doc.data()
        }
      )))
    })
  },[])
  //const dispatch = useDispatch()

  const addChannelOnClick =()=>{
      const channelName=prompt('Enter channel name')
      if(channelName){
          db.collection('channels').add({
              channelName:channelName
          })
      }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__headerInput">
          <input placeholder="search" />
          <SearchIcon />
        </div>
        <IconButton>
          <ChatIcon onClick={addChannelOnClick} className="sidebar__chatIcon" />
        </IconButton>
      </div>
      <div className="sidebar__channels">

        {channels.map(({id ,channel}) => (
          <SidebarChannel key={id} id={id} channelName={channel.channelName} />
        ))}
        {/* <SidebarChannel />
                <SidebarChannel />
                <SidebarChannel />
                <SidebarChannel /> */}
      </div>
    </div>
  );
};
