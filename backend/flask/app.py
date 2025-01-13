from flask import Flask, jsonify, request
import cohere
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Retrieve the Cohere API key from environment variables
cohere_api_key = os.getenv("COHERE_API_KEY")
port = os.getenv("PORT")

# Initialize the Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Initialize the Cohere client with your API key
cohere_client = cohere.Client(cohere_api_key)

@app.route('/api/model', methods=['POST'])
def model():
    fact = request.get_json()
    print(fact)
    
    # Validate the input
    if 'fact' not in fact:
        return jsonify({"error": "Invalid input, 'text' field is required"}), 400

    # Make a request to the Cohere API
    response = cohere_client.chat(
        message=f"predict whether it is true or fake {fact['fact']} and provide the percentage of confidence. Prediction, Confidence, Explanation, and Source of information with ':'"
    )
    
    # Process the response text
    response_text = response.text
    print(response_text)
    
    # Initialize variables
    prediction = None
    confidence = None
    explanation = None
    source = None
    
    # Splitting and parsing logic
    parts = response_text.split('\n')
    for part in parts:
        if 'Prediction' in part:
            prediction = part.split(':')[1].strip()
        elif 'Confidence' in part:
            confidence = part.split(':')[1].strip()
        elif 'Explanation' in part:
            explanation = part.split(':', 1)[1].strip()
        elif 'Source' in part:
            source = part.split(':',1)[1].strip()
    
    # Construct the JSON response
    result = {
        "prediction": prediction,
        "confidence": confidence,
        "explanation": explanation,
        "source":source
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=port)
