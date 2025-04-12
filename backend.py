from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['virtual_police_station']
fir_collection = db['firs']

# Routes

# Submit FIR
@app.route('/api/fir', methods=['POST'])
def submit_fir():
    try:
        data = request.json
        fir_collection.insert_one(data)
        return jsonify({"message": "FIR submitted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get All FIRs
@app.route('/api/fir', methods=['GET'])
def get_firs():
    try:
        firs = list(fir_collection.find({}, {"_id": 0}))  # Exclude MongoDB's _id field
        return jsonify(firs), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Start the server
if __name__ == '__main__':
    app.run(debug=True, port=5000)