import React from "react"
import { useState } from "react";
import { signInWithGoogle } from "./auth-context";
import "./signInWithGoogle.css";

export default function SignInBtn() {
  const [user, setUser] = useState();
  const SignInBtnClick = async () => {
    let userBySignIn = await signInWithGoogle();
    if (userBySignIn) setUser(userBySignIn);
    console.log(userBySignIn);
  };
  return (
    <div className="signInBtn" onClick={SignInBtnClick}>
      <p>Sign In With Google</p>
    </div>
  );
}
