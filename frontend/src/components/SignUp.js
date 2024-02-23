import React, { useState } from "react";
import axios from 'axios';


function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async(evt) => {
    evt.preventDefault();

    const { name, email, password } = state;
    // alert(
    //   `You are sign up with name: ${name} email: ${email} and password: ${password}`
    // );

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }

    try {
      // Make API request for authentication
      const response = await axios.post('http://127.0.0.1:8000/signup/', {
      username: email,
      password: password
  });

  // console.log('Signup successful:', response.data);
  if (response.status) {
      alert('Sign Up successful...');
  }
  
      // await onSignUp({ username, password });
  } catch (error) {
      alert('Failed to sign up');
  }
  };

  
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
