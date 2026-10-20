
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return "Flask backend is running!"


@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data received"}), 400

    name = data.get("name", "").strip()

    if not name:
        return jsonify({"error": "Name is required"}), 400

    return jsonify({
        "message": "Data received successfully",
        "name": name
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
