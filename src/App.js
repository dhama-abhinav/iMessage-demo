import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { Imessage } from "./Imessage";
import { Login } from "./Login";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName : authUser.displayName
          })
        );
      }
      else{
        //for  logout
        dispatch(logout())
      }
    });
  },[dispatch]);

  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
