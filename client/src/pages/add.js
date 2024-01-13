import React from 'react'
import { useState } from 'react'
import axios from 'axios';
const Add = () => {
    const [crypto, setCrypto] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const result = await axios.put("http://localhost:3001/auth/cryptos", {
            userId:window.localStorage.getItem("userID"),
            cryptoName: crypto,
          });
          alert("Added!");
        } catch (error) {
            alert("Already exists!")
          console.error(error);
        }
        setCrypto('');
      };
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Enter Crypto Name:</h2>
        <div className="form-group">
          <input
            type="text"
            id="crypto"
            value={crypto}
            onChange={(event) => setCrypto(event.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default Add
