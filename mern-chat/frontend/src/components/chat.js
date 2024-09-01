import React, { useState } from 'react';
import Message from './Message';

function Chat({ socket, messages }) {
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');

  const sendMessage = () => {
    if (message.trim() && sender.trim()) {
      const messageData = { sender, content: message };
      socket.emit('sendMessage', messageData);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} content={msg.content} />
        ))}
      </div>
      <input
        type="text"
        placeholder="Your name"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
