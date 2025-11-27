import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import "./ChatInterface.css";

function ChatInterface({ chat, onSendMessage, onToggleSidebar, sidebarOpen }) {
  const { theme, toggleTheme } = useTheme();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || sending) return;

    setSending(true);
    await onSendMessage(message);
    setMessage("");
    setSending(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <button className="menu-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        <h2 className="chat-header-title">
          {chat ? chat.title : "Select or create a chat"}
        </h2>
        <label
          className="ui-switch"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <input
            type="checkbox"
            checked={theme === "light"}
            onChange={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          />
          <div className="slider">
            <div className="circle" />
          </div>
        </label>
      </div>

      <div className="messages-container">
        {!chat ? (
          <div className="empty-state">
            <div className="welcome-logo">
              <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="35" stroke="url(#welcomeGradient)" strokeWidth="3"/>
                <path d="M40 15 L40 40 L55 55" stroke="url(#welcomeGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="40" cy="40" r="5" fill="url(#welcomeGradient)"/>
                <defs>
                  <linearGradient id="welcomeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4285f4" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2>Welcome to Gemini Chat</h2>
            <p>Create a new chat or select an existing one to start chatting</p>
            <div className="example-prompts">
              <div className="prompt-card" onClick={() => chat && setMessage("Explain quantum computing in simple terms")}>
                <div className="prompt-icon">💡</div>
                <span>Explain quantum computing</span>
              </div>
              <div className="prompt-card" onClick={() => chat && setMessage("Write a creative story about space")}>
                <div className="prompt-icon">✨</div>
                <span>Write a creative story</span>
              </div>
              <div className="prompt-card" onClick={() => chat && setMessage("Help me debug this code")}>
                <div className="prompt-icon">🔧</div>
                <span>Debug code</span>
              </div>
            </div>
          </div>
        ) : chat.messages && chat.messages.length > 0 ? (
          <div className="messages-list">
            {chat.messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.role}`}>
                <div className="message-content">
                  <div className="message-role">
                    {msg.role === "user" ? "You" : "AI"}
                  </div>
                  <div className="message-text">{msg.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="empty-chat">
            <p>Send a message to start the conversation</p>
          </div>
        )}
      </div>

      {chat && (
        <div className="input-container">
          <form onSubmit={handleSubmit} className="message-form">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="message-input"
              rows="1"
              disabled={sending}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!message.trim() || sending}
            >
              {sending ? "..." : "➤"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
