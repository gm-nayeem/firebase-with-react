import React, { useEffect, useState } from 'react'
import '../app.scss';
import Form from '../components/Form';
const url = 'http://localhost:4000/api';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`${url}/users/all`);
      setUsers(res.data.users);
    }
    getUsers()
  }, []);

  const addUser = (user) => {
    setUsers(prev => [...prev, user])
  }

  return (
    <div className='home'>
      <h1>I am from home page.</h1>
      <Form addUser={addUser} />
      <div className="user-container">
        {
          users.length > 0 && (
            users.map(user => (
              <div className="user-info" key={user._id}>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <p>{user.country}</p>
              </div>
            ))
          )
        }
      </div>

    </div>
  )
}

export default Home;