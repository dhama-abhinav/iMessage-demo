import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";

const signIN = ()=>{
    auth.signInWithPopup(provider)
    .catch((error)=> alert(error.message))
}

export const Login = () => {
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://i.pinimg.com/originals/b0/bc/57/b0bc57c5f4db8d971de7f448ee351098.png"
          alt=""
        />
        
      </div>
      <h1>iMessage</h1>
      <Button onClick={signIN}>SIGN IN</Button>
    </div>
  );
};
