import React, { useState } from 'react';
const url = 'https://firebase-with-react.vercel.app/api';
// const url = 'http://localhost:4000/api';
import axios from 'axios';

const Form = ({addUser}) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    country: ''
  });

  const handleInput = (e) => {
    setUser(prev => {
      const {value, name} = e.target;
      return {
        ...prev,
        [name]: value
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${url}/users/create`, user);
      addUser(res.data.user);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>Create a New User</h1>
      <div className="form-container">
        <input 
          type="text" 
          name='username' 
          placeholder='enter username' 
          value={user.username} 
          onChange={handleInput}
        />
        <input 
          type="email" 
          name='email' 
          placeholder='enter email' 
          value={user.email} 
          onChange={handleInput}
        />
        <input 
          type="text" 
          name='country' 
          placeholder='enter country' 
          value={user.country} 
          onChange={handleInput}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Form;