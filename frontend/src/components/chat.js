import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageSend = async() => {
    if (input.trim() !== '') {
        const list = [...messages, { sender: 'user', text: input }];
        setMessages(list);
        try {
            // Make API request for authentication
            const responseData = await axios.post(API_URL+'/chat/', {
              prompt: input
        });
        if (responseData.status===200){
        const result = (responseData.data);
        
        setMessages([...list,{ sender: 'bot', text: result.text }])
      
      }
        } catch (error) {
            alert('Something Went Wrong!');
        }
    }
    // console.log(messages);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div style={{ maxWidth: '100%', margin: 'auto', padding: '10px' }}>
      <h3>Legal Advisor</h3>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
      <style>
    {`
      ::-webkit-scrollbar {
        width: 12px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      ::-webkit-scrollbar-thumb {
        background: #888;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `}
  </style>
        {messages.map((message, index) => (
          <div key={index} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
            <strong>{message.sender === 'user' ? 'You:' : 'Advisor:'}</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        style={{ width: '85%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={handleMessageSend} style={{ padding: '10px 20px' }}>Send</button>
    </div>
  );
}

export default Chat;
