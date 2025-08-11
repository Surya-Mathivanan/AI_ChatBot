# AI Assistant Only

Minimal backend + frontend extracted from the original project to provide:

- Google Sign-In authentication
- Protected AI Assistant chat page
- Logout

## Backend (Flask)

Location: `backend/`

Environment variables:

- `PORT` (default `8080`)
- `GEMINI_API_KEY` (optional; if missing, the chat responds with stubbed guidance)
- `MODEL_NAME` (default `gemini-1.5-flash`)
- `FIREBASE_PROJECT_ID` (required for verifying Firebase ID tokens)
- `GOOGLE_APPLICATION_CREDENTIALS` (path to a Firebase service account JSON for Firestore access)

Install and run:

```bash
pip install -r backend/requirements.txt
python -m backend.app
```

Health check: `GET /health`

## Frontend (Vite + React)

Location: `frontend/`

Environment variables (e.g., `.env.local`):

- `VITE_API_BASE_URL` (e.g., `http://localhost:8080`)
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

Install and run:

```bash
cd frontend
npm install
npm run dev
```

Navigate to the app, sign in with Google, then use the Chat page. Logout is available in the header.
