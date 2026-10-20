from flask import Flask, render_template, request
import os
import requests

app = Flask(__name__)
BACKEND_URL = os.getenv("EXPRESS_BACKEND_URL", "http://backend:3000")

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    form_data = {
        "name": request.form.get("name", "").strip(),
        "email": request.form.get("email", "").strip(),
        "message": request.form.get("message", "").strip(),
    }
    if not form_data["name"] or not form_data["email"] or not form_data["message"]:
        return render_template("result.html", success=False,
                               message="Please complete all fields.", name=""), 400
    try:
        response = requests.post(f"{BACKEND_URL}/submit", json=form_data, timeout=5)
        response.raise_for_status()
        result = response.json()
        return render_template("result.html", success=True,
                               message=result.get("message", "Data received successfully"),
                               name=result.get("name", form_data["name"]))
    except requests.RequestException as error:
        app.logger.exception("Could not contact Express backend")
        return render_template("result.html", success=False,
                               message=f"Backend connection failed: {error}", name=""), 502

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
