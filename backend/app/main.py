from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from app.translator import TranslatorService

app = FastAPI(
    title="AI Language Translation Service",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

translator = TranslatorService()


class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str


@app.get("/")
def root():
    return {
        "message": "Translation API is running"
    }


@app.post("/translate")
def translate(request: TranslationRequest):

    try:

        translated_text = translator.translate(
            request.text,
            request.source_lang,
            request.target_lang
        )

        return {
            "original_text": request.text,
            "translated_text": translated_text,
            "source_language": request.source_lang,
            "target_language": request.target_lang
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )