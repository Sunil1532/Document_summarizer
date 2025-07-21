from flask import Flask, request, jsonify
from transformers import pipeline
import torch

app = Flask(__name__)

# Load summarization model once
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=0 if torch.cuda.is_available() else -1)

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    text = data.get("text")

    if not text or len(text.strip()) == 0:
        return jsonify({"error": "No text provided"}), 400

    # BART has ~1024 token limit; truncate input by words to preserve structure
    max_input_length = 1024  # tokens, not characters
    num_words = len(text.split())

    if num_words > 1000:
        text = " ".join(text.split()[:1000])  # truncate to ~1000 words

    try:
        summary = summarizer(
            text,
            max_length=500,     # more detailed
            min_length=150,     # avoid short ones
            do_sample=False
        )[0]['summary_text']

        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)
