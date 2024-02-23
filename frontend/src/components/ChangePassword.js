import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../config';

function ChangePassword(props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can implement your logic for changing the password
    // For demonstration purposes, let's just display a message
    if (newPassword !== confirmNewPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
    const responseData = await axios.post(API_URL+'/change-password/',{
      old_password:currentPassword,
      new_password:newPassword,
      email: props.data
    }

    );
    // Reset the form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    if (responseData.data.status){
    
    setMessage('Password successfully changed.');
  }
  else{
    setMessage('Current password do not match');
  }
  };

  return (
    <div className='changepassword'>
      <h2>Change Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <p>
          Current Email: <b>{props.data}</b>
        </p>
        <label>
          Current Password:<br/>
          <input 
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label>
          New Password:<br/>
          <input 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm New Password:<br/>
          <input 
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
