from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import base64
from PIL import Image
import datetime
import hashlib

from image_caption_model import image_to_prompt
from protegi_module import generator, user_implement, ocr_implement, simple_implement
from IPython.display import display
from ocr import analyze_image

from pymongo import MongoClient
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create uploads folder if not exists

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["ImagePromptGenerator"]  # Database name
collection = db["Images"]  # Collection name

@app.route("/")
def run():
    return "Hello World!"



@app.route("/generate_prompt", methods=["POST"])
def upload_file():
    if "image" not in request.files:
        return jsonify({"error": "Image File Not Found"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = os.path.splitext(file.filename)[1]  # Get file extension
    filename = f"{timestamp}{file_extension}"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)  # Save the file

    with open(file_path, "rb") as image_file:
        image_data = image_file.read()
    
    image_hash = hashlib.sha256(image_data).hexdigest()
    retrieved = collection.find_one({"image_data": image_hash})

    if retrieved:
        print("Cache Found")
        print(retrieved["generated_caption"])
        return jsonify({"caption": retrieved["generated_caption"]})
    else:
        print("Not Cached")
        
    i = Image.open(file_path)
    mode = "best"
    prompt = image_to_prompt(i, mode)
    caption = generator(prompt, file_path)

    ocr_info = analyze_image(i)
    final_caption = ocr_implement(ocr_info, caption[0])

    simple = simple_implement(caption=prompt, prompt=final_caption)

    print(final_caption)
    print(simple)

    image_data = {
        "image_data": image_hash,
        "generated_caption": final_caption,
        "simple": simple
    }
    collection.insert_one(image_data)
    return jsonify({"caption": final_caption, "simple": simple})

@app.route("/user_edit", methods=["POST"])
def user_edit():
    data = request.json
    if not data or "edit" not in data or "prompt" not in data:
        return jsonify({"error": "User Edit not found"}), 400
    
    edit = data["edit"]
    prompt = data["prompt"]

    final = user_implement(edit, prompt)

    return jsonify({"caption": final})


@app.route("/generate_image", methods=["POST"])
def generating_image():
    data = request.json
    if not data or "prompt" not in data:
        return jsonify({"error": "Prompt not found"}), 400

    prompt = data["prompt"]
    print(prompt)
    #generate_image(prompt)
    generated_data = {
        "prompt": prompt,
        "generated_image_path": image_path
    }
    #collection.insert_one(generated_data)
    image_path = "D:/Projects/New P/AI-Image-Prompt-Generator-Model/uploads/3..webp" 
    with open(image_path, "rb") as img_file:
        base64_string = base64.b64encode(img_file.read()).decode("utf-8")

    if not os.path.exists(image_path):
        return jsonify({"error": "Generated image not found"}), 404
 
   
    return send_file(image_path, mimetype="image/jpeg")
 


if __name__ == "__main__":
    app.run(debug=False)