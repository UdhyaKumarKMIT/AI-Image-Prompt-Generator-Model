import React from "react";

const UserEdit = ({ generatedText, setGeneratedText }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="relative w-100 h-[550px] bg-neutral-900 p-6 mt-20 rounded-lg shadow-md border border-orange-600 flex flex-col">
          {/* Copy Button in Top Left */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-orange-600 hover:bg-orange-700 text-white text-sm px-3 py-1 rounded-md shadow"
          >
            Copy
          </button>

          <h2 className="text-xl text-white mb-4 text-center">📝 User Edit</h2>

          <textarea
            className="w-full h-full p-4 bg-neutral-800 text-white rounded-md resize-none"
            placeholder="Generated Caption..."
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
          />

      <button
        onClick={handleCopy}
        className="w-[730px] bg-orange-500 text-white py-4 mt-10 mx-auto rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
      >Enhance Caption</button>
        </div>
      </div>

      <div className="row">
        <div className="relative w-100 h-[550px] bg-neutral-900 p-6 mt-20 rounded-lg shadow-md border border-orange-600 flex flex-col">
          {/* Copy Button in Top Left */}
         

          <h2 className="text-xl text-white mb-4 text-center">Enhanced Caption</h2>

          <textarea
            className="w-full h-full p-4 bg-neutral-800 text-white rounded-md resize-none"
            placeholder="Generated Caption..."
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
          />
          <button
            onClick={handleCopy}
            className="w-[730px] bg-orange-500 text-white py-4 mt-10 mx-auto rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
        >
            Copy Prompt
          </button>
    
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
