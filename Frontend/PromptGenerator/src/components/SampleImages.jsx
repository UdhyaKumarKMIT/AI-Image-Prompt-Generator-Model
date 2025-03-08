import React, { useState } from 'react';

const SampleImages = () => {
  // Example state to handle image uploading
  const [image, setImage] = useState(null);

  return (
    <div className="mt-6">
     

      {/* Heading for sample images */}
      <h2 className="text-xl text-white text-center mb-4">🎨 Sample Images</h2>

      {/* Flex container for displaying images in a row */}
      <div className="flex justify-center space-x-4">
        <img
          src="https://img.freepik.com/premium-photo/gay-pride-month-ai-generated-high-quality-realism-portrait_744422-7554.jpg"
          className="rounded-lg w-1/3 border border-orange-700 shadow-sm shadow-orange-400 transition-transform duration-300 hover:scale-105"
          alt="Vibrant Portrait"
        />
        <img
          src="https://wallpaperaccess.com/full/1711825.jpg"
          className="rounded-lg w-1/3 border border-orange-700 shadow-sm shadow-orange-400 transition-transform duration-300 hover:scale-105"
          alt="Abstract Digital Art"
        />
        <img
          src="https://wallpaperaccess.com/full/9070086.png"
          className="rounded-lg w-1/3 border border-orange-700 shadow-sm shadow-orange-400 transition-transform duration-300 hover:scale-105"
          alt="Owl with Red Leaves"
        />
      </div>
    </div>
  );
};

export default SampleImages;
