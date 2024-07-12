from flask import Flask, jsonify, request
import cohere
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os


cohere_api_key = os.getenv("COHERE_API_KEY")
app = Flask(__name__)
CORS(app)

# Initialize the Cohere client once with your API key
cohere_client = cohere.Client(cohere_api_key)

@app.route('/api/model', methods=['POST'])
def model():
    fact = request.get_json()
    print(fact)
    # Assuming `fact` contains a dictionary with a 'text' key
    if 'text' not in fact:
        return jsonify({"error": "Invalid input, 'text' field is required"}), 400

    response = cohere_client.chat(
        message=f"predict whether it is true or fake {fact['text']} and provide the percentage of confidence.Make the prediction(true or false) and confidence bold"
    )
    
    return jsonify(response.text)

if __name__ == '__main__':
    app.run(debug=True)
