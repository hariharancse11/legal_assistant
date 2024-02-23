import React from 'react';
import './App.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="hero-container">
      <h1>Welcome to Our Legal Assistant</h1>
      <p>Solutions for your legal and medical documentation needs</p>
      <div className="services">
        <div className="service">
          <h4>Summarize Medical Bills</h4>
          <p>Let us simplify your medical expenses by condensing lengthy bills into clear and concise summaries.</p>
        </div>
        <div className="service">
          <h4>Legal Advisor AI</h4>
          <p>Our Legal Advisor AI Assistant provides instant access to legal expertise, streamlining your workflow and enhancing efficiency.</p>
        </div>
        <div className="service">
          <h4>Generating Demand Letters</h4>
          <p>Our automated system can draft demand letters tailored to your needs, saving you time and effort.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
