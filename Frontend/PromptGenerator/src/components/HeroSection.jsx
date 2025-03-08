import { useState } from "react";
import axios from "axios";
import ImageUploader from "./ImageUploader";
import Header from "./Header";

const HeroSection = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-12">
      <Header />
      <UploadAndTextSection generatedText={generatedText} setGeneratedText={setGeneratedText} />
      <GenerateImageSection generatedText={generatedText} setGeneratedImage={setGeneratedImage} error={error} setError={setError} />
      <ImageDisplaySection generatedImage={generatedImage} />
    </div>
  );
};

const UploadAndTextSection = ({ generatedText, setGeneratedText }) => (
  <div className="w-full flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-6">
    {/* Upload Section */}
    <div className="w-[600px] h-[400px] bg-neutral-900 p-6 rounded-lg shadow-md border border-orange-600 flex flex-col items-center">
      <h2 className="text-xl text-white mb-4 text-center">📤 Upload an Image</h2>
      <ImageUploader setGeneratedText={setGeneratedText} />
    </div>

    {/* Caption Display Section */}
    <div className="w-[600px] h-[400px] bg-neutral-900 p-6 rounded-lg shadow-md border border-orange-600 flex flex-col">
      <h2 className="text-xl text-white mb-4 text-center">📝 Generated Caption</h2>
      <textarea
  className="w-full h-full p-4 bg-neutral-800 text-white rounded-md resize-none"
  placeholder="Generated Caption..."
  value={generatedText}
  onChange={(e) => setGeneratedText(e.target.value)} // This allows typing
/>

    </div>
  </div>
);

// Generate Image Section
const GenerateImageSection = ({ generatedText, setGeneratedImage, error, setError }) => {
  const generateImage = async () => {
    if (!generatedText) {
      setError("Please enter a prompt.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate_image",
        { prompt: generatedText },
        { responseType: "blob" } // Important for handling image files
      );
  
      const imageUrl = URL.createObjectURL(response.data);
      setGeneratedImage(imageUrl);
      setError("");
    } catch (err) {
      setError("Failed to fetch image from the server.");
    }
    
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <button
        onClick={generateImage}
        className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition"
      >
        Generate Image
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

// Image Display Section
const ImageDisplaySection = ({ generatedImage }) => (
  <div className="w-[800px] h-[400px] bg-neutral-900 p-6 rounded-lg shadow-md border border-orange-600 mt-6 flex items-center justify-center">
    {generatedImage ? (
      <img src={generatedImage} alt="Generated" className="w-full h-full object-contain rounded-xl" />
    ) : (
      <p className="text-gray-300">Generated Image will appear here</p>
    )}
  </div>
);

export default HeroSection;
