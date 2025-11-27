from __future__ import annotations

import firebase_admin
from firebase_admin import credentials, firestore
import json

from .config import AppConfig


class Database:
    def __init__(self, config: AppConfig) -> None:
        if not firebase_admin._apps:
            if config.firebase_credentials_file:
                # Use service account JSON file
                cred = credentials.Certificate(config.firebase_credentials_file)
                firebase_admin.initialize_app(cred, {
                    'projectId': config.firebase_project_id,
                })
            elif config.firebase_private_key and config.firebase_client_email:
                # Use environment variables for credentials
                service_account_info = {
                    "type": "service_account",
                    "project_id": config.firebase_project_id,
                    "private_key_id": config.firebase_private_key_id,
                    "private_key": config.firebase_private_key.replace('\\n', '\n'),
                    "client_email": config.firebase_client_email,
                    "client_id": config.firebase_client_id,
                    "auth_uri": config.firebase_auth_uri,
                    "token_uri": config.firebase_token_uri,
                    "auth_provider_x509_cert_url": config.firebase_auth_provider_x509_cert_url,
                    "client_x509_cert_url": config.firebase_client_x509_cert_url
                }
                cred = credentials.Certificate(service_account_info)
                firebase_admin.initialize_app(cred, {
                    'projectId': config.firebase_project_id,
                })
            else:
                # Uses GOOGLE_APPLICATION_CREDENTIALS or default cred if running on GCP
                firebase_admin.initialize_app()
        self._db = firestore.client()

    # Collections
    @property
    def users(self):
        return self._db.collection('users')

    @property
    def chats(self):
        return self._db.collection('chats')


