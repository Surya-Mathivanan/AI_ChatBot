import os
from dataclasses import dataclass
from typing import Optional

try:
    from dotenv import load_dotenv  # type: ignore
    load_dotenv()
except Exception:
    pass


@dataclass
class AppConfig:
    jwt_secret: str
    gemini_api_key: Optional[str]
    port: int
    model_name: str
    firebase_project_id: Optional[str]
    firebase_credentials_file: Optional[str]
    
    # Firebase service account credentials
    firebase_private_key_id: Optional[str]
    firebase_private_key: Optional[str]
    firebase_client_email: Optional[str]
    firebase_client_id: Optional[str]
    firebase_auth_uri: Optional[str]
    firebase_token_uri: Optional[str]
    firebase_auth_provider_x509_cert_url: Optional[str]
    firebase_client_x509_cert_url: Optional[str]

    @staticmethod
    def from_env() -> "AppConfig":
        return AppConfig(
            jwt_secret=os.getenv("JWT_SECRET", "change-me"),
            gemini_api_key=os.getenv("GEMINI_API_KEY"),
            port=int(os.getenv("PORT", "8080")),
            model_name=os.getenv("MODEL_NAME", "gemini-1.5-flash"),
            firebase_project_id=os.getenv("FIREBASE_PROJECT_ID"),
            firebase_credentials_file=os.getenv("GOOGLE_APPLICATION_CREDENTIALS"),
            firebase_private_key_id=os.getenv("FIREBASE_PRIVATE_KEY_ID"),
            firebase_private_key=os.getenv("FIREBASE_PRIVATE_KEY"),
            firebase_client_email=os.getenv("FIREBASE_CLIENT_EMAIL"),
            firebase_client_id=os.getenv("FIREBASE_CLIENT_ID"),
            firebase_auth_uri=os.getenv("FIREBASE_AUTH_URI"),
            firebase_token_uri=os.getenv("FIREBASE_TOKEN_URI"),
            firebase_auth_provider_x509_cert_url=os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
            firebase_client_x509_cert_url=os.getenv("FIREBASE_CLIENT_X509_CERT_URL"),
        )


