import React, { useState } from "react";
import axios from "axios";

const UserEdit = ({ generatedText }) => {
  const [editText, setEditText] = useState("");
  const [finalText, setFinalText] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(finalText);
  };

  const userEditfn = async () => {
    generatedText = localStorage.getItem("large")
    if (!generatedText.trim()) {
      alert("Original caption not available. Please generate one first.");
      return;
    }
    if (!editText.trim()) {
      alert("Nothing to enhance. Please enter or generate a caption.");
      return;
    }

    

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/user_edit",
        {
          edit: editText,
          prompt: generatedText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setFinalText(response.data.caption);
    } catch (err) {
      alert("Failed to enhance caption. Check backend.");
    }
  };

  return (
    <div className="container">
      {/* Edit Input Section */}
      <div className="row">
        <div className="relative w-100 h-[550px] bg-neutral-900 p-6 mt-20 rounded-lg shadow-md border border-orange-600 flex flex-col">
          <button
            onClick={() => navigator.clipboard.writeText(editText)}
            className="absolute top-4 right-4 bg-orange-600 hover:bg-orange-700 text-white text-sm px-3 py-1 rounded-md shadow"
          >
            Copy
          </button>

          <h2 className="text-xl text-white mb-4 text-center">📝 User Edit</h2>

          <textarea
            className="w-full h-full p-4 bg-neutral-800 text-white rounded-md resize-none"
            placeholder="Enter your edit here..."
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button
            onClick={userEditfn}
            className="w-[730px] bg-orange-500 text-white py-4 mt-10 mx-auto rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
          >
            Enhance Caption
          </button>
        </div>
      </div>

      {/* Final Enhanced Caption Section */}
      <div className="row">
        <div className="relative w-100 h-[550px] bg-neutral-900 p-6 mt-20 rounded-lg shadow-md border border-orange-600 flex flex-col">
          <h2 className="text-xl text-white mb-4 text-center">Enhanced Caption</h2>

          <textarea
            className="w-full h-full p-4 bg-neutral-800 text-white rounded-md resize-none"
            placeholder="Enhanced caption will appear here..."
            value={finalText}
            readOnly
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
