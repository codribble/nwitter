import { authService } from "fbase";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

const Auth = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ newAccount, setNewAccount ] = useState(true);
  const [ error, setError ] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value }
    } = e;

    if( name === "email" ){
      setEmail(value);
    }else if( name === "password" ){
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let data;
      if( newAccount ) { // create account
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else { // log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }

      console.log(data);
    } catch(error) {
      // console.log(error.code);
      setError(error.code);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    const {
      target: { name }
    } = e;

    let provider;
    if( name === "google" ) {
      provider = new GoogleAuthProvider();
    }else if( name === "github" ) {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        <p>{error}</p>
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign in." : "Create Account"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;