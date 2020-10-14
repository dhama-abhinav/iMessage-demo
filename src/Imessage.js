import React from "react";
import "./Imessage.css";
import { Chat } from "./Chat";
import { Sidebar } from "./Sidebar";

export const Imessage = () => {
  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
};
