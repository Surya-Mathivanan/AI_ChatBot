from __future__ import annotations

from typing import Any, Dict, List, Optional

from ..config import AppConfig

try:
    import google.generativeai as genai  # type: ignore
except Exception:  # pragma: no cover
    genai = None  # type: ignore


class GeminiClient:
    def __init__(self, config: AppConfig) -> None:
        self._api_key: Optional[str] = config.gemini_api_key
        self._model_name: str = config.model_name
        self.enabled: bool = bool(self._api_key and genai is not None)
        if self.enabled and genai is not None:
            genai.configure(api_key=self._api_key)
            self._model = genai.GenerativeModel(self._model_name)
        else:
            self._model = None

    def chat(self, messages: List[Dict[str, str]], context: Optional[Dict[str, Any]] = None) -> str:
        if not self.enabled or self._model is None:
            last = messages[-1]["content"] if messages else ""
            return f"[Stub Response]\n\n{last}\n\n- Focus on fundamentals.\n- Practice daily.\n- Review mistakes."

        parts: List[str] = []
        if context:
            parts.append(f"Context: {context}")
        for m in messages:
            role = m.get("role", "user")
            content = m.get("content", "")
            parts.append(f"{role.upper()}: {content}")
        response = self._model.generate_content("\n".join(parts))
        return getattr(response, "text", "")


