import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ user, chats, currentChat, onNewChat, onSelectChat, onRenameChat, onDeleteChat, onLogout, isOpen, onToggle }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartEdit = (chat) => {
    setEditingId(chat.id);
    setEditTitle(chat.title);
  };

  const handleSaveEdit = (chatId) => {
    if (editTitle.trim()) {
      onRenameChat(chatId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const handleKeyPress = (e, chatId) => {
    if (e.key === 'Enter') {
      handleSaveEdit(chatId);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={onNewChat}>
            + New Chat
          </button>
        </div>

        <div className="chat-list">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`chat-item ${currentChat && currentChat.id === chat.id ? 'active' : ''}`}
            >
              {editingId === chat.id ? (
                <div className="chat-edit">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, chat.id)}
                    onBlur={() => handleSaveEdit(chat.id)}
                    autoFocus
                    className="chat-edit-input"
                  />
                </div>
              ) : (
                <>
                  <div 
                    className="chat-title"
                    onClick={() => onSelectChat(chat.id)}
                  >
                    {chat.title}
                  </div>
                  <div className="chat-actions">
                    <button
                      className="chat-action-btn rename-btn"
                      onClick={() => handleStartEdit(chat)}
                      title="Rename"
                    >
                      ✎
                    </button>
                    <button
                      className="chat-action-btn delete-btn"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this chat?')) {
                          onDeleteChat(chat.id);
                        }
                      }}
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            {user.picture && (
              <img src={user.picture} alt={user.name} className="user-avatar" />
            )}
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      
      {isOpen && <div className="sidebar-overlay" onClick={onToggle}></div>}
    </>
  );
}

export default Sidebar;
