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


