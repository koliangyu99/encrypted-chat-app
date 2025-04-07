// frontend/src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket);
    socket.onmessage = (event) => {
      setChat((prev) => [...prev, event.data]);
    };
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && message) {
      // Send plain text for now (you can add encryption on the client later)
      ws.send(message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Encrypted Chat App</h2>
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', padding: '10px' }}>
        {chat.map((msg, index) => <div key={index}>{msg}</div>)}
      </div>
      <input
        type="text"
        placeholder="Enter message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '70%', marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
