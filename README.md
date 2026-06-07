# AI Translation Studio

A transformer-powered language translation application built with FastAPI, Hugging Face MarianMT, and a modern JavaScript frontend.

## Overview

AI Translation Studio provides real-time English ↔ Spanish translation using pre-trained MarianMT transformer models from Hugging Face.

The project demonstrates how modern NLP models can be integrated into a production-style web application through a FastAPI backend and an interactive frontend.

## Features

* English → Spanish translation
* Spanish → English translation
* Transformer-based MarianMT models
* FastAPI REST API
* Interactive API documentation (Swagger UI)
* Modern responsive UI
* Translation history tracking
* Copy translation functionality
* Character counter
* Language swap support
* CPU-based inference

## Tech Stack

### Backend

* Python
* FastAPI
* Hugging Face Transformers
* MarianMT
* PyTorch

### Frontend

* HTML
* CSS
* JavaScript

## Project Structure

language-translator-ai/

├── backend/

│ ├── app/

│ │ ├── main.py

│ │ ├── translator.py

│ │ └── config.py

│ └── requirements.txt

│

├── frontend/

│ ├── index.html

│ ├── css/

│ └── js/

│

├── screenshots/

├── sample_data/

└── README.md

## How It Works

1. User enters text in the frontend.
2. JavaScript sends a POST request to FastAPI.
3. FastAPI receives the request.
4. MarianMT performs translation inference.
5. The translated text is returned as JSON.
6. The frontend displays the result instantly.

## Installation

Clone the repository:

```bash
git clone https://github.com/Muhammad-Jarrar-shaf/language-translator-ai.git
cd language-translator-ai
```

Create a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Run the backend:

```bash
cd backend
uvicorn app.main:app --reload
```

Open the frontend:

```bash
frontend/index.html
```

## API Endpoint

POST /translate

Example Request:

```json
{
  "text": "Hello, how are you?",
  "source_lang": "en",
  "target_lang": "es"
}
```

Example Response:

```json
{
  "translated_text": "Hola, ¿cómo estás?"
}
```

## Future Improvements

* Additional language support
* Translation confidence scoring
* BLEU score evaluation
* Speech-to-text translation
* Text-to-speech output
* Docker deployment
* Cloud deployment

## Learning Outcomes

This project helped me understand:

* Machine Translation
* Transformer Architectures
* NLP Model Inference
* REST API Development
* Frontend–Backend Communication
* Hugging Face Ecosystem
* Production-style AI Application Development

```
```
