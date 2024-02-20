// import React, { useState } from "react";
// import "./styles.css";
// import SignInForm from "./SignIn";
// import SignUpForm from "./SignUp";

// export default function App() {
//   const [type, setType] = useState("signIn");
//   const handleOnClick = text => {
//     if (text !== type) {
//       setType(text);
//       return;
//     }
//   };
//   const containerClass =
//     "container " + (type === "signUp" ? "right-panel-active" : "");
//   return (
//     <div className="App">
//       <h2>Sign in/up Form</h2>
//       <div className={containerClass} id="container">
//         <SignUpForm />
//         <SignInForm />
//         <div className="overlay-container">
//           <div className="overlay">
//             <div className="overlay-panel overlay-left">
//               <h1>Welcome Back!</h1>
//               <p>
//                 To keep connected with us please login with your personal info
//               </p>
//               <button
//                 className="ghost"
//                 id="signIn"
//                 onClick={() => handleOnClick("signIn")}
//               >
//                 Sign In
//               </button>
//             </div>
//             <div className="overlay-panel overlay-right">
//               <h1>Hello, Friend!</h1>
//               <p>Enter your personal details and start journey with us</p>
//               <button
//                 className="ghost "
//                 id="signUp"
//                 onClick={() => handleOnClick("signUp")}
//               >
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

