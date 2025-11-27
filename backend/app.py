<<<<<<< HEAD
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from datetime import datetime
import os
try:
    # optional: load environment variables from a .env file if python-dotenv is installed
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass
from functools import wraps
from database import db

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SESSION_SECRET', 'dev-secret-key')

# Prefer an explicitly configured DATABASE_URL (recommended). If not set, fall
# back to a local SQLite file for quick local development to avoid runtime
# errors on init. This makes `python backend/app.py` work without additional
# environment setup.
db_uri = os.environ.get('DATABASE_URL')
if not db_uri:
    # relative path './dev.db' in repository root when running from repo root
    db_uri = 'sqlite:///./dev.db'
    print("[warning] DATABASE_URL not set — falling back to SQLite at './dev.db'.")

app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, supports_credentials=True, origins=['*'])

db.init_app(app)

from models import User, Chat, Message
from auth import auth_bp
from chat import chat_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(chat_bp, url_prefix='/api/chat')

with app.app_context():
    db.create_all()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
=======
from __future__ import annotations

import os
from flask import Flask, jsonify, request
from flask_cors import CORS

from .config import AppConfig
from .db import Database
from .services.gemini_client import GeminiClient
from .routes.auth import auth_bp
from .routes.chat import chat_bp
from .utils.firebase_auth import FirebaseVerifier


def create_app(config: AppConfig | None = None) -> Flask:
    app = Flask(__name__)

    cfg = config or AppConfig.from_env()

    # CORS for all routes (adjust origins as needed)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize services once and attach per-request handles
    db = Database(cfg)
    gemini = GeminiClient(cfg)
    firebase = FirebaseVerifier(cfg)

    @app.before_request
    def inject_services() -> None:  # type: ignore[override]
        setattr(request, "app_ctx_db", db)
        setattr(request, "app_ctx_gemini", gemini)
        setattr(request, "app_ctx_firebase", firebase)

    @app.get("/health")
    def health():
        return jsonify({
            "ok": True,
            "geminiEnabled": gemini.enabled,
            "firebaseEnabled": firebase.enabled,
        }), 200

    # Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(chat_bp)

    return app


if __name__ == "__main__":
    application = create_app()
    port = int(os.getenv("PORT", "8080"))
    application.run(host="0.0.0.0", port=port)


>>>>>>> 96439e8cca49e0cb9cb5adef830e026fcb984c51
