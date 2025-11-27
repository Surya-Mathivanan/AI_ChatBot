
# 🤖 GeminiChat - AI Chatbot Application

A full-stack AI chatbot application powered by Google's Gemini AI, featuring Google OAuth authentication and a modern React interface.

![GeminiChat](https://img.shields.io/badge/AI-Gemini-blue)
![Flask](https://img.shields.io/badge/Backend-Flask-green)
![React](https://img.shields.io/badge/Frontend-React-61dafb)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Google Cloud Console Configuration](#google-cloud-console-configuration)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [Deployment](#deployment)
  - [Deploy Backend to Render](#deploy-backend-to-render)
  - [Deploy Frontend to Vercel](#deploy-frontend-to-vercel)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 💬 **AI-Powered Chat** - Real-time conversations with Google's Gemini AI
- 📝 **Multiple Chat Sessions** - Create and manage multiple chat conversations
- 🎨 **Modern UI** - Clean, responsive interface built with React
- 💾 **Persistent Storage** - Save chat history with SQLite/PostgreSQL
- 🔒 **Session Management** - Secure session-based authentication
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## 🛠️ Tech Stack

**Frontend:**
- React 18.2
- React Router v6
- Axios for API calls
- @react-oauth/google for authentication
- CSS3 for styling

**Backend:**
- Flask (Python web framework)
- Flask-SQLAlchemy (ORM)
- Flask-CORS (Cross-origin resource sharing)
- Google Generative AI (Gemini)
- Google OAuth2
- SQLite/PostgreSQL database

## 📁 Project Structure

```
GeminiChat/
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── auth.py             # Authentication routes and logic
│   ├── chat.py             # Chat routes and Gemini AI integration
│   ├── models.py           # Database models (User, Chat, Message)
│   ├── database.py         # Database configuration
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js       # Login component
│   │   │   ├── ChatApp.js     # Main chat application
│   │   │   ├── ChatInterface.js # Chat UI
│   │   │   └── Sidebar.js     # Chat list sidebar
│   │   ├── services/
│   │   │   └── api.js         # Axios configuration
│   │   ├── App.js             # Root component
│   │   ├── index.js           # Entry point
│   │   └── setupProxy.js      # Development proxy config
│   └── package.json           # Node dependencies
├── .env                    # Backend environment variables
├── .env.example           # Example environment variables
└── README.md              # This file
```

## 📦 Prerequisites

- **Python 3.11+**
- **Node.js 16+** and npm
- **Google Cloud Console Account** (for OAuth and Gemini API)
- **Git**

## 🚀 Local Development Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd GeminiChat
```

### Step 2: Backend Setup

#### For Windows (PowerShell):

```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install --upgrade pip
pip install -r backend/requirements.txt
```

#### For macOS/Linux:

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r backend/requirements.txt
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
```

### Step 4: Configure Environment Variables

#### Backend (.env in root directory):

Create a `.env` file in the root directory:

```env
# Backend Environment Variables
DATABASE_URL=sqlite:///./dev.db
SESSION_SECRET=your_random_secret_key_here
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
```

#### Frontend (frontend/.env):

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### Step 5: Run the Application

#### Terminal 1 - Backend:

```powershell
# Make sure virtual environment is activated
python backend/app.py
```

Backend will start on `http://localhost:5000`

#### Terminal 2 - Frontend:

```bash
cd frontend
npm start
```

Frontend will start on `http://localhost:3000`

### Step 6: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🔐 Google Cloud Console Configuration

### 1. Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if prompted
6. Select **Web application**

### 2. Configure OAuth Client

#### For Local Development:

**Authorized JavaScript origins:**
```
http://localhost:3000
http://localhost:5000
```

**Authorized redirect URIs:**
```
http://localhost:3000
```

#### For Production:

**Authorized JavaScript origins:**
```
https://your-frontend-domain.vercel.app
https://your-backend-domain.onrender.com
```

**Authorized redirect URIs:**
```
https://your-frontend-domain.vercel.app
```

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Copy the API key and add it to your `.env` file

## 🌍 Environment Variables

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | `sqlite:///./dev.db` or `postgresql://user:pass@host/db` |
| `SESSION_SECRET` | Secret key for session encryption | `your-random-secret-key` |
| `GOOGLE_OAUTH_CLIENT_ID` | Google OAuth Client ID | `xxxxx.apps.googleusercontent.com` |
| `GOOGLE_OAUTH_CLIENT_SECRET` | Google OAuth Client Secret | `GOCSPX-xxxxx` |
| `GEMINI_API_KEY` | Google Gemini API Key | `AIzaSyxxxxx` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|----------|
| `REACT_APP_GOOGLE_CLIENT_ID` | Google OAuth Client ID (same as backend) | `xxxxx.apps.googleusercontent.com` |

## 📖 Usage Guide

### 1. Sign In
- Click the **Sign in with Google** button
- Select your Google account
- Authorize the application

### 2. Create a New Chat
- Click the **+ New Chat** button in the sidebar
- A new chat session will be created

### 3. Send Messages
- Type your message in the input box at the bottom
- Press **Enter** or click the **Send** button
- Wait for Gemini AI to respond

### 4. Manage Chats
- Click on any chat in the sidebar to open it
- Click the trash icon to delete a chat
- Chat titles are automatically generated from the first message

### 5. Sign Out
- Click your profile picture in the top-right corner
- Select **Logout** from the dropdown

## 🚢 Deployment

### Deploy Backend to Render

#### Step 1: Prepare Backend for Deployment

1. Create a `render.yaml` file in the root directory:

```yaml
services:
  - type: web
    name: geminichat-backend
    env: python
    buildCommand: pip install -r backend/requirements.txt
    startCommand: gunicorn --chdir backend app:app
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: SESSION_SECRET
        generateValue: true
      - key: GOOGLE_OAUTH_CLIENT_ID
        sync: false
      - key: GOOGLE_OAUTH_CLIENT_SECRET
        sync: false
      - key: GEMINI_API_KEY
        sync: false
```

2. Add `gunicorn` to `backend/requirements.txt`:

```bash
echo "gunicorn" >> backend/requirements.txt
```

#### Step 2: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `geminichat-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `gunicorn --chdir backend app:app`
5. Add Environment Variables:
   - `DATABASE_URL` (use Render PostgreSQL or external database)
   - `SESSION_SECRET`
   - `GOOGLE_OAUTH_CLIENT_ID`
   - `GOOGLE_OAUTH_CLIENT_SECRET`
   - `GEMINI_API_KEY`
6. Click **Create Web Service**

#### Step 3: Setup PostgreSQL Database (Optional but Recommended)

1. In Render Dashboard, click **New** → **PostgreSQL**
2. Name it `geminichat-db`
3. Click **Create Database**
4. Copy the **Internal Database URL**
5. Add it as `DATABASE_URL` in your web service environment variables

#### Step 4: Get Backend URL

After deployment, your backend will be available at:
```
https://geminichat-backend.onrender.com
```

### Deploy Frontend to Vercel

#### Step 1: Prepare Frontend for Deployment

1. Update `frontend/src/services/api.js` to use backend URL:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

2. Create `vercel.json` in the `frontend/` directory:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

#### Step 2: Deploy to Vercel

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. **Option A: Deploy via Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Configure:
     - **Root Directory**: `frontend`
     - **Framework Preset**: `Create React App`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
   - Add Environment Variables:
     - `REACT_APP_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
     - `REACT_APP_API_URL`: Your backend URL (e.g., `https://geminichat-backend.onrender.com/api`)
   - Click **Deploy**

3. **Option B: Deploy via CLI**
```bash
cd frontend
vercel
```
Follow the prompts and add environment variables when asked.

#### Step 3: Update Google OAuth Settings

After deployment, update your Google Cloud Console OAuth settings:

1. Go to Google Cloud Console → Credentials
2. Edit your OAuth 2.0 Client ID
3. Add production URLs:

**Authorized JavaScript origins:**
```
https://your-app.vercel.app
https://geminichat-backend.onrender.com
```

**Authorized redirect URIs:**
```
https://your-app.vercel.app
```

#### Step 4: Update Backend CORS Settings

Update `backend/app.py` to allow your Vercel domain:

```python
CORS(app, supports_credentials=True, origins=[
    'http://localhost:3000',
    'https://your-app.vercel.app'
])
```

Redeploy your backend after making this change.

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/google
Authenticate user with Google OAuth token

**Request Body:**
```json
{
  "token": "google_oauth_token"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "picture": "https://..."
  }
}
```

#### GET /api/auth/me
Get current authenticated user

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

#### POST /api/auth/logout
Logout current user

**Response:**
```json
{
  "success": true
}
```

### Chat Endpoints

#### GET /api/chat/chats
Get all chats for current user

**Response:**
```json
{
  "chats": [
    {
      "id": 1,
      "title": "Chat Title",
      "created_at": "2025-01-01T00:00:00",
      "updated_at": "2025-01-01T00:00:00"
    }
  ]
}
```

#### POST /api/chat/chats
Create a new chat

**Request Body:**
```json
{
  "title": "New Chat"
}
```

#### GET /api/chat/chats/:id
Get specific chat with messages

**Response:**
```json
{
  "chat": {
    "id": 1,
    "title": "Chat Title",
    "messages": [
      {
        "id": 1,
        "role": "user",
        "content": "Hello",
        "created_at": "2025-01-01T00:00:00"
      }
    ]
  }
}
```

#### POST /api/chat/chats/:id/messages
Send a message and get AI response

**Request Body:**
```json
{
  "message": "Your message here"
}
```

**Response:**
```json
{
  "user_message": {
    "id": 1,
    "role": "user",
    "content": "Your message"
  },
  "ai_message": {
    "id": 2,
    "role": "model",
    "content": "AI response"
  }
}
```

#### DELETE /api/chat/chats/:id
Delete a chat

**Response:**
```json
{
  "success": true
}
```

## 🔧 Troubleshooting

### Google OAuth 400 Error

**Problem**: "Error 400: redirect_uri_mismatch" or "Error 400: Bad Request"

**Solution**:
1. Check that `REACT_APP_GOOGLE_CLIENT_ID` is set correctly in `frontend/.env`
2. Verify Google Cloud Console has correct authorized origins:
   - `http://localhost:3000` for development
   - Your production URL for deployment
3. Make sure you're NOT adding backend API endpoints as redirect URIs
4. Clear browser cache or use incognito mode
5. Wait 5 minutes after changing Google Console settings

### Gemini API Errors

**Problem**: "Error generating AI response" or "404 model not found"

**Solution**:
1. Verify `GEMINI_API_KEY` is set correctly in `.env`
2. Make sure you're using an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Check if the API key has any restrictions
4. Use model name `gemini-pro` (not `gemini-1.5-flash` for AI Studio keys)
5. Verify you haven't exceeded the free tier quota

### Database Connection Errors

**Problem**: "Could not translate host name" or "Connection refused"

**Solution**:
1. For local development, use: `DATABASE_URL=sqlite:///./dev.db`
2. For production, use a valid PostgreSQL connection string
3. Check that the database server is running and accessible
4. Verify firewall rules allow connections

### CORS Errors

**Problem**: "Access-Control-Allow-Origin" errors in browser console

**Solution**:
1. Make sure backend CORS is configured correctly in `app.py`
2. Include your frontend URL in the CORS origins list
3. Verify `withCredentials: true` is set in frontend API calls
4. Check that both frontend and backend use the same protocol (http/https)

### Frontend Can't Connect to Backend

**Problem**: API calls fail with network errors

**Solution**:
1. Check that backend is running on `http://localhost:5000`
2. Verify `setupProxy.js` is configured correctly
3. Make sure both services are running simultaneously
4. Check firewall isn't blocking port 5000
5. For production, set `REACT_APP_API_URL` environment variable

### Session/Authentication Issues

**Problem**: User gets logged out frequently or auth doesn't persist

**Solution**:
1. Set a secure `SESSION_SECRET` in `.env`
2. Make sure `withCredentials: true` is set in API requests
3. Check that cookies are enabled in browser
4. For production, use HTTPS for both frontend and backend
5. Verify CORS settings allow credentials

## 📝 Notes

- For local development, SQLite is sufficient
- For production, use PostgreSQL for better performance and reliability
- Always use HTTPS in production for OAuth to work properly
- Keep your API keys and secrets secure - never commit them to Git
- The frontend proxy (`setupProxy.js`) only works in development mode
- Backend must be restarted after changing `.env` file
- Frontend requires restart after changing `REACT_APP_*` variables

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👥 Authors

Your Name - Initial work

## 🙏 Acknowledgments

- Google Gemini AI for the AI capabilities
- Flask community for the excellent framework
- React team for the frontend library
- Render and Vercel for hosting platforms

---

**Happy Coding! 🚀**
=======
=======
>>>>>>> 96439e8cca49e0cb9cb5adef830e026fcb984c51
# AI Assistant Chat Application

A streamlined, secure AI chat application featuring Google's Gemini AI. This project provides a minimal yet powerful implementation of:

- 🔐 Secure Google Sign-In authentication
- 💬 Protected AI Assistant chat interface
- 🚪 User session management with logout functionality
- 🤖 Integration with Google's Gemini AI
- 🎯 Clean, focused user experience

## View Online
Live Demo :https://ai-chat-bot-sigma-ten.vercel.app/

## 🏗️ Technology Stack

### Backend

- Python Flask server
- Google Gemini AI for chat responses
- Firebase Admin SDK for authentication
- Flask-CORS for secure cross-origin requests
- Firestore for data persistence

### Frontend

- React with TypeScript
- Vite for fast development and building
- Firebase Authentication
- Zustand for state management
- React Router for navigation
- Axios for API communication

## 🚀 Backend Setup (Flask)

Location: `backend/`

### Prerequisites

- Python 3.10 or higher
- Google Cloud account with Gemini API access
- Firebase project with Authentication and Firestore enabled

### Environment Variables

Create a `.env` file in the backend directory with:

```env
PORT=8080                            # Default port for the server
GEMINI_API_KEY=your_api_key         # Your Google Gemini API key
MODEL_NAME=gemini-1.5-flash         # Gemini model to use
FIREBASE_PROJECT_ID=your_project_id  # Firebase project ID
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json  # Firebase credentials
```

### Installation and Running

1. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # For Unix/macOS
venv\Scripts\activate     # For Windows
```

2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Start the server:

```bash
python -m backend.app
```

### API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/chat` - Send messages to the AI assistant (protected)
- `POST /api/auth/verify` - Verify Firebase authentication tokens

## 🌐 Frontend Setup (Vite + React)

Location: `frontend/`

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase project configuration

### Environment Setup

Create a `.env.local` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8080  # Backend API URL
VITE_FIREBASE_API_KEY=your_api_key       # Firebase API key
VITE_FIREBASE_AUTH_DOMAIN=your_domain    # Firebase auth domain
VITE_FIREBASE_PROJECT_ID=your_project_id # Firebase project ID
VITE_FIREBASE_APP_ID=your_app_id        # Firebase app ID
```

### Installation and Development

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

### Application Features

- 🔒 Protected routes requiring authentication
- 🔑 Google Sign-In integration
- 💬 Interactive chat interface with AI
- 🚪 User-friendly logout functionality
- 📱 Responsive design for all devices

## 🏛️ Project Structure

```
├── backend/
│   ├── routes/          # API route handlers
│   │   ├── auth.py     # Authentication routes
│   │   └── chat.py     # Chat functionality
│   ├── services/       # Business logic
│   │   └── gemini_client.py
│   ├── utils/         # Helper functions
│   └── app.py         # Main application
├── frontend/
│   ├── src/
│   │   ├── api/       # API client
│   │   ├── components/# React components
│   │   ├── pages/     # Main pages
│   │   └── store/     # State management
│   └── vite.config.ts # Build configuration
```

## 🔒 Security Features

- Secure token-based authentication with Firebase
- Protected API endpoints
- CORS protection
- Environment variable management
- Secure session handling

## 📈 Future Improvements

- Add conversation history persistence
- Implement typing indicators
- Add support for markdown formatting
- Enhance error handling
- Add user preferences
- Implement rate limiting

## 💡 Usage

1. Navigate to the application URL
2. Click "Sign in with Google"
3. Once authenticated, you'll be redirected to the Chat page
4. Start interacting with the AI assistant
5. Use the logout button in the header when finished

## 📄 License

This project is MIT licensed. See the LICENSE file for details.
<<<<<<< HEAD
>>>>>>> 96439e8cca49e0cb9cb5adef830e026fcb984c51
=======
>>>>>>> 96439e8cca49e0cb9cb5adef830e026fcb984c51
