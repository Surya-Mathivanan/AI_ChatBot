# 🚀 Complete Deployment Guide: Render (Backend) + Vercel (Frontend)

## 📋 Prerequisites

- [ ] GitHub repository with your project
- [ ] Render account (free tier available)
- [ ] Vercel account (free tier available)
- [ ] Firebase project configured
- [ ] Google Cloud project with Gemini API enabled

---

## 🔧 STEP 1: Backend Deployment on Render

### 1.1 Prepare Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → Project Settings → Service Accounts
3. Click "Generate new private key"
4. Download the JSON file
5. **IMPORTANT**: Keep this file secure and never commit it to Git

### 1.2 Extract Firebase Credentials

From your downloaded JSON file, extract these values:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
  "client_email": "firebase-adminsdk-xxx@project.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

### 1.3 Deploy to Render

1. **Connect GitHub Repository**

   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your repository

2. **Configure Service**

   - **Name**: `ai-assistant-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `python -m backend.app`
   - **Plan**: Free

3. **Set Environment Variables**

   ```
   PORT=8080
   GEMINI_API_KEY=your_actual_gemini_api_key
   MODEL_NAME=gemini-1.5-flash
   FIREBASE_PROJECT_ID=your_firebase_project_id

   # Firebase Service Account (from JSON file)
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----"
   FIREBASE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete
   - Note your backend URL (e.g., `https://ai-assistant-backend.onrender.com`)

---

## 🌐 STEP 2: Frontend Deployment on Vercel

### 2.1 Prepare Frontend Environment

1. Create `frontend/.env.production` file:

   ```env
   VITE_API_BASE_URL=https://ai-assistant-backend-ojiy.onrender.com
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   ```

2. Update `frontend/src/api/client.ts` to use environment variable:
   ```typescript
   const API_BASE_URL =
     import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
   ```

### 2.2 Deploy to Vercel

1. **Connect GitHub Repository**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**

   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Set Environment Variables**

   - Add all variables from `frontend/.env.production`
   - Ensure `VITE_API_BASE_URL` points to your Render backend

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend will be live at `https://your-project.vercel.app`

---

## 🔗 STEP 3: Update Frontend API Configuration

### 3.1 Update API Client

Ensure your frontend API client points to the deployed backend:

```typescript
// frontend/src/api/client.ts
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### 3.2 Update CORS in Backend

Your backend already has CORS configured, but ensure it allows your Vercel domain:

```python
# backend/app.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",  # Local development
    "https://your-project.vercel.app",  # Your Vercel domain
    "https://*.vercel.app"  # All Vercel subdomains
])
```

---

## 🧪 STEP 4: Testing Deployment

### 4.1 Test Backend

1. Visit your Render backend URL
2. Test the health endpoint: `https://your-backend.onrender.com/health`
3. Check logs in Render dashboard

### 4.2 Test Frontend

1. Visit your Vercel frontend URL
2. Try to sign in with Google
3. Test the chat functionality
4. Check browser console for errors

### 4.3 Test Integration

1. Ensure frontend can communicate with backend
2. Verify Firebase authentication works
3. Test AI chat responses

---

## 🚨 Troubleshooting Common Issues

### Backend Issues

- **Build Failures**: Check Python version compatibility
- **Import Errors**: Ensure all requirements are in `requirements.txt`
- **Firebase Errors**: Verify environment variables are set correctly
- **CORS Errors**: Check allowed origins in backend

### Frontend Issues

- **Build Failures**: Check Node.js version and dependencies
- **Environment Variables**: Ensure all `VITE_*` variables are set in Vercel
- **API Errors**: Verify `VITE_API_BASE_URL` points to correct backend
- **Firebase Errors**: Check Firebase configuration in environment

### General Issues

- **Environment Variables**: Double-check all variables are set correctly
- **Domain Issues**: Ensure URLs are accessible and CORS is configured
- **Authentication**: Verify Firebase project settings and authorized domains

---

## 📱 STEP 5: Domain Configuration

### 5.1 Custom Domain (Optional)

- **Vercel**: Add custom domain in project settings
- **Render**: Custom domains available on paid plans
- **DNS**: Update your domain's DNS records

### 5.2 Update Firebase Authorized Domains

1. Go to Firebase Console → Authentication → Settings
2. Add your Vercel domain to "Authorized domains"
3. Add your custom domain if using one

---

## 🔄 STEP 6: Continuous Deployment

### 6.1 Automatic Deployments

- **Render**: Automatically deploys on Git push to main branch
- **Vercel**: Automatically deploys on Git push to main branch
- **Preview Deployments**: Vercel creates preview deployments for pull requests

### 6.2 Environment Management

- **Development**: Use local `.env` files
- **Production**: Use Render/Vercel environment variables
- **Staging**: Create separate environments if needed

---

## ✅ Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured
- [ ] Firebase credentials set up
- [ ] CORS configured correctly
- [ ] API endpoints working
- [ ] Authentication functional
- [ ] Chat functionality working
- [ ] Custom domain configured (if desired)
- [ ] Monitoring and logging set up

---

## 🆘 Support Resources

- **Render Docs**: [docs.render.com](https://docs.render.com/)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Firebase Docs**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Flask Docs**: [flask.palletsprojects.com](https://flask.palletsprojects.com/)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev/)

---

**🎉 Congratulations! Your AI Assistant is now deployed and accessible worldwide!**
