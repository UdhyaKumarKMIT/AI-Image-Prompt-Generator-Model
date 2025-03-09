import os
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__)

@app.route("/serve-image/<filename>")
def serve_image(filename):
    """Serve images from the static folder"""
    return send_from_directory("static/Images", filename)

@app.route("/generate_image", methods=["POST"])
def generate_image():
    image_filename = "image2.jpg"  # Your generated image
    image_path = os.path.join("static/Images", image_filename)  

    # Ensure the directory exists
    os.makedirs("static/Images", exist_ok=True)

    # Instead of returning a local path, return a valid URL
    image_url = f"http://127.0.0.1:5000/serve-image/{image_filename}"

    return jsonify({"image_url": image_url})
