import React, { useState } from "react";
import "../styles.css";
// import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import Together from "./Together";

export default function App() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");



    const [state, setState] = React.useState({
      email: "",
      password: ""
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const handleChange = evt => {
      const value = evt.target.value;
      setState({
        ...state,
        [evt.target.name]: value
      });
    };
  
    const handleOnSubmit = async(evt) => {
      evt.preventDefault();
  
      const { email, password } = state;
      // alert(`You are login with email: ${email} and password: ${password}`);
  
      // for (const key in state) {
      //   setState({
      //     ...state,
      //     [key]: ""
      //   });
      // }
      try{
      const response = await fetch('http://127.0.0.1:8000/signin/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        });
  
        const data = await response.json();
  
        if (data.status === true) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          alert('SignIn Successful')
        } else {
          // Handle unsuccessful sign in
          alert('Invalid Credentials');
        }
      } catch (error) {
        alert('Error signing in:', error);
      }
  
    };
  
    
  return (
    <div>
    { !loggedIn ?(
    <div className="App">
      <h2>Legal Assistant</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    ):(
    <Together />
  )}
  </div>
  );
}




