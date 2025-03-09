import React, { useState } from "react";

const SampleImages = () => {
  const [image, setImage] = useState(null);

  const sampleImages = [
    {
      src: "https://image.lexica.art/full_webp/c33a23a8-6924-4403-b096-eec9b08f341d",
      alt: "Vibrant Portrait",
      caption:
        "Dark aesthetic, futuristic mechanical robot with gears and wires, stunning photo. Evil demonic AI god diamond baphomet holding a glass of milk above a human brain, super advanced technology, futuristic, hyper digital background, extremely detailed and realistic, ominous and eerie.",
    },
    {
      src: "https://image.lexica.art/full_webp/02d71991-2925-4b73-9c75-01180338d0e3",
      alt: "Abstract Digital Art",
      caption:
        "A realistic dark photo of a white 20-year-old boy sitting in the corner on the floor, looking down, with a black helmet covering all his face, wearing a black sci-fi tight suit, strong body, in a futuristic room with white metallic walls, dramatic illumination, hyperrealistic, 8K.",
    },
    {
      src: "https://image.lexica.art/full_webp/c9acbddf-e3fb-4873-ac36-0bdfcfced5c2",
      alt: "Owl with Red Leaves",
      caption:
        "A beautiful purple flower in a dark forest, in the style of hyper-realistic sculptures, dark orange and green, post-apocalyptic backdrops, light red and yellow, museum gallery dioramas, soft, dreamy scenes, surreal 8K ZBrush render.",
    },
  ];

  return (
    
    <div className="mt-6 flex flex-col items-center">
    
      {/* Heading Section */}
      <h2 className="text-3xl font-bold text-orange-500 mb-6  border-orange-600 pb-2">
        SAMPLE IMAGES
      </h2>

      {/* Sample Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sampleImages.map((img, index) => (
          <div
            key={index}
            className="bg-neutral-900 p-4 rounded-lg shadow-lg border border-orange-600 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-orange-500/50"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-[250px] object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
            />
            <div className="p-3 text-center text-white text-sm font-semibold opacity-90 transition-opacity duration-300 hover:opacity-100">
              {img.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleImages;
