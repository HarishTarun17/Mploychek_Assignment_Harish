const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const users = [
  { id: '1', username: 'admin', password: 'admin123', role: 'Admin' },
  { id: '2', username: 'user', password: 'user123', role: 'General User' }
];

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get User Records API
app.get('/api/records', (req, res) => {
  const records = [
    { id: uuidv4(), name: 'Record 1' },
    { id: uuidv4(), name: 'Record 2' },
    { id: uuidv4(), name: 'Record 3' }
  ];
  res.json(records);
});

// Get All Users (Admin Only)
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
