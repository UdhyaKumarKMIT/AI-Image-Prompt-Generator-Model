// ImageUploader.jsx
import { useState } from "react";
import axios from "axios";

export default function ImageUploader({ setGeneratedText }) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  // Handle image selection
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
      setFile(selectedFile);
    }
  };

  // Handle drag-and-drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const imageUrl = URL.createObjectURL(droppedFile);
      setImage(imageUrl);
      setFile(droppedFile);
    }
  };

  // Function to send image to Flask backend and get caption
  const generateCaption = async () => {
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate_prompt", 
        formData, 
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setGeneratedText(response.data.simple);
    } catch (err) {
      alert("Failed to generate caption. Check backend.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Upload Area */}
      <label
        htmlFor="fileInput"
        className="border-2 border-dashed border-gray-400 rounded-lg w-[600px] h-[350px] 
                   flex flex-col items-center justify-center text-gray-500 cursor-pointer 
                   hover:border-orange-500 transition duration-300"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {image ? (
          <img 
            src={image} 
            alt="Uploaded" 
            className="w-full h-full object-cover rounded-lg" 
          />
        ) : (
          <p className="text-center text-2xl">
            Drop Image Here  
            <br /> - or - <br />  
            <span className="text-orange-500">Click to Upload</span>
          </p>
        )}
      </label>

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Generate Caption Button */}
      <button
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-700 transition"
        onClick={generateCaption}
      >
        Generate Caption
      </button>
    </div>
  );
}
