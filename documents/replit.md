# AI Chatbot Application

## Overview
A full-stack AI chatbot application built with React frontend and Flask backend. Users can log in with their Google account, chat with Gemini AI, and manage their chat history with full CRUD operations.

## Tech Stack
- **Frontend**: React (JavaScript, no TypeScript), Vanilla CSS
- **Backend**: Python Flask
- **Database**: PostgreSQL (Neon)
- **Authentication**: Google OAuth 2.0
- **AI**: Google Gemini API

## Features
- Google OAuth authentication
- Real-time chat with Gemini AI
- Chat history management (create, read, rename, delete)
- Mobile-responsive design with collapsible sidebar
- User session management

## Project Structure
```
├── backend/
│   ├── app.py              # Main Flask application
│   ├── database.py         # Database configuration
│   ├── models.py           # SQLAlchemy models
│   ├── auth.py             # Authentication endpoints
│   ├── chat.py             # Chat endpoints
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service
│   │   └── App.js          # Main App component
│   └── package.json        # Node dependencies
└── .env                    # Environment variables

```

## Database Schema
- **users**: Stores user information from Google OAuth
- **chats**: Stores chat sessions
- **messages**: Stores individual messages in chats

## Environment Variables Required
- DATABASE_URL: PostgreSQL connection string
- SESSION_SECRET: Secret key for Flask sessions
- GOOGLE_OAUTH_CLIENT_ID: Google OAuth Client ID
- GOOGLE_OAUTH_CLIENT_SECRET: Google OAuth Client Secret
- GEMINI_API_KEY: Google Gemini API key
- REACT_APP_GOOGLE_CLIENT_ID: Google OAuth Client ID (for frontend)

## API Endpoints
### Authentication
- POST /api/auth/google - Google OAuth login
- POST /api/auth/logout - Logout
- GET /api/auth/me - Get current user

### Chat
- GET /api/chat/chats - Get all user chats
- POST /api/chat/chats - Create new chat
- GET /api/chat/chats/:id - Get specific chat with messages
- PUT /api/chat/chats/:id - Update chat (rename)
- DELETE /api/chat/chats/:id - Delete chat
- POST /api/chat/chats/:id/messages - Send message and get AI response

## Recent Changes
- 2025-11-01: Initial project setup
- Created complete backend with Flask and PostgreSQL
- Created React frontend with Google OAuth integration
- Implemented mobile-responsive design
- Added CRUD operations for chat management
