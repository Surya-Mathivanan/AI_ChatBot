# AI Assistant Chat Application

A streamlined, secure AI chat application featuring Google's Gemini AI. This project provides a minimal yet powerful implementation of:

- 🔐 Secure Google Sign-In authentication
- 💬 Protected AI Assistant chat interface
- 🚪 User session management with logout functionality
- 🤖 Integration with Google's Gemini AI
- 🎯 Clean, focused user experience

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
