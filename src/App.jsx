
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  
const [input, setInput] = useState('');
  const messagesEndRef = useRef(null); // Corrected: messagesEndRef declaration

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      // Simulate a response from ChatGPT (replace with actual API call)
      setTimeout(() => {
        setMessages([...messages, { text: input, sender: 'user' }, { text: 'This is a simulated response.', sender: 'chatgpt' }]); 
      }, 500); 
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}

          </div>
        ))}
        <div ref={messagesEndRef} /> 
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
