from transformers import MarianMTModel, MarianTokenizer

from app.config import MODEL_CONFIG 


class TranslatorService:
    def __init__(self):
        self.models = {}
        self.tokenizers = {}

        self.load_models()

    def load_models(self):
        for lang_pair, model_name in MODEL_CONFIG.items():

            print(f"Loading {model_name}...")

            tokenizer = MarianTokenizer.from_pretrained(model_name)
            model = MarianMTModel.from_pretrained(model_name)

            self.tokenizers[lang_pair] = tokenizer
            self.models[lang_pair] = model

        print("All models loaded successfully.")

    def translate(self, text, source_lang, target_lang):

        lang_pair = (source_lang, target_lang)

        if lang_pair not in self.models:
         raise ValueError(
         f"Unsupported translation pair: {source_lang}->{target_lang}"
    )

        tokenizer = self.tokenizers[lang_pair]
        model = self.models[lang_pair]

        inputs = tokenizer(
            text,
            return_tensors="pt",
            padding=True,
            truncation=True
        )

        translated = model.generate(**inputs)

        result = tokenizer.decode(
            translated[0],
            skip_special_tokens=True
        )

        return result