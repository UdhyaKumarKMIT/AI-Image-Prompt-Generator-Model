import { useState } from "react";
import axios from "axios";
import ImageUploader from "./ImageUploader";
import Header from "./Header";
import UserEdit from "./userEdit";
const HeroSection = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState("");

  return (
    <div id="herosection" className="flex flex-col items-center mt-6 lg:mt-12">
       <Header />
      <UploadAndTextSection 
        generatedText={generatedText} 
        setGeneratedText={setGeneratedText} 
      />
      
      <UserEdit 
        generatedText={generatedText}
        setGeneratedText={setGeneratedText}
      />
     {/* <GenerateImageSection 
        generatedText={generatedText} 
        setGeneratedImage={setGeneratedImage} 
        error={error} 
        setError={setError} 
      />
  <ImageDisplaySection generatedImage={generatedImage} />*/}
    </div>
  );
};

const UploadAndTextSection = ({ generatedText, setGeneratedText }) => (
  <div className="w-full flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-6">
    
    {/* Upload Section */}
    <div className="w-[800px] h-[550px] bg-neutral-900 p-6 rounded-lg shadow-md border border-orange-600 flex flex-col items-center">
      <h2 className="text-xl text-white mb-4 text-center">
        📤 Upload an Image
      </h2>
      <ImageUploader setGeneratedText={setGeneratedText} />
    </div>

    {/* Caption Display Section */}
    <div className="w-[800px] h-[550px] bg-neutral-900 p-6 rounded-lg shadow-md border border-orange-600 flex flex-col">
      <h2 className="text-xl text-white mb-4 text-center">
        📝 Generated Caption
      </h2>
      <textarea
        className="w-full h-full p-4 bg-neutral-800 text-white rounded-md resize-none"
        placeholder="Generated Caption..."
        value={generatedText}
        onChange={(e) => setGeneratedText(e.target.value)}
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
        className="w-[800px] bg-orange-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
      >
        🎨 Generate Image
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

// Image Display Section
// Image Display Section
const ImageDisplaySection = ({ generatedImage }) => (
  <div className="w-[800px] h-[400px] bg-neutral-900 p-6 rounded-lg shadow-md border border-orange-600 mt-6 flex flex-col items-center">
    <h2 className="text-xl text-white mb-4 text-center">🖼️ Generated Image</h2>
    <div className="w-full h-full border-2 border-dashed border-gray-500 flex flex-col items-center justify-center text-gray-500 cursor-pointer 
                   hover:border-orange-500 transition duration-300">
      {generatedImage ? (
        <img 
          src={generatedImage} 
          alt="Generated" 
          className="w-full h-full object-contain rounded-lg transition-opacity duration-500 opacity-100" 
        />
      ) : (
        <p className="text-gray-400 transition-opacity duration-500 opacity-75">Generated Image will appear here</p>
      )}
    </div>
  </div>
);


export default HeroSection;
