const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log('MongoDB connection error:', err));

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
  origin: process.env.FRONTEND_URL, 
}));
app.use(express.json());

app.use('/api/messages', messageRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('sendMessage', async (messageData) => {
    const message = new Message(messageData);
    await message.save();
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const exampleUser = { _id: 'exampleUserId' }; // Replace with actual user object
const token = jwt.sign({ userId: exampleUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('JWT Token:', token);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
