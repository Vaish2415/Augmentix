import React from 'react';
import ChatComponent from './ChatComponent';

const App = () => {
  return (
    <div>
      <h1>Welcome to the Chat App</h1>
      {process.env.REACT_APP_FEATURE_CHAT_ENABLED === 'true' ? (
        <ChatComponent />
      ) : (
        <div>Chat feature is disabled.</div>
      )}
    </div>
  );
};

export default App;
