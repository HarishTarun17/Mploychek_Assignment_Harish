import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      setUser(response.data.user);
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:5000/api/records')
        .then(response => {
          setRecords(response.data);
        });

      if (user.role === 'Admin') {
        axios.get('http://localhost:5000/api/users')
          .then(response => {
            setAllUsers(response.data);
          });
      }
    }
  }, [user]);

  return (
    <div className="App">
      {!user ? (
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <h3>Your Role: {user.role}</h3>
          <div className="record-list">
            <h3>Records:</h3>
            <ul>
              {records.map(record => (
                <li key={record.id}>{record.name}</li>
              ))}
            </ul>
          </div>
          {user.role === 'Admin' && (
            <div className="user-list">
              <h3>All Users:</h3>
              <ul>
                {allUsers.map(u => (
                  <li key={u.id}>{u.username} ({u.role})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
