import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import api from '../services/api';
import './ChatApp.css';

function ChatApp({ user, onLogout }) {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const response = await api.get('/chat/chats');
      setChats(response.data.chats);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const response = await api.post('/chat/chats', { title: 'New Chat' });
      const newChat = response.data.chat;
      setChats([newChat, ...chats]);
      setCurrentChat({ ...newChat, messages: [] });
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleSelectChat = async (chatId) => {
    try {
      const response = await api.get(`/chat/chats/${chatId}`);
      setCurrentChat(response.data.chat);
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const handleRenameChat = async (chatId, newTitle) => {
    try {
      await api.put(`/chat/chats/${chatId}`, { title: newTitle });
      setChats(chats.map(chat => 
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      ));
      if (currentChat && currentChat.id === chatId) {
        setCurrentChat({ ...currentChat, title: newTitle });
      }
    } catch (error) {
      console.error('Error renaming chat:', error);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await api.delete(`/chat/chats/${chatId}`);
      setChats(chats.filter(chat => chat.id !== chatId));
      if (currentChat && currentChat.id === chatId) {
        setCurrentChat(null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleSendMessage = async (message) => {
    if (!currentChat) return;

    try {
      const response = await api.post(`/chat/chats/${currentChat.id}/messages`, {
        message: message
      });

      const updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, response.data.user_message, response.data.ai_message]
      };
      
      setCurrentChat(updatedChat);
      
      setChats(chats.map(chat => {
        if (chat.id === currentChat.id) {
          return {
            ...chat,
            title: updatedChat.title,
            updated_at: new Date().toISOString()
          };
        }
        return chat;
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="chat-app">
      <Sidebar
        user={user}
        chats={chats}
        currentChat={currentChat}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />
      <ChatInterface
        chat={currentChat}
        onSendMessage={handleSendMessage}
        onToggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}

export default ChatApp;
