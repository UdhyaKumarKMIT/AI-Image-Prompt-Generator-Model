import React from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa"; // Import icons

function Footer() {
  return (
    <div className="bg-neutral-900 text-white p-6 mt-10">
      {/* Institute Name */}
      <p className="text-center text-lg font-semibold">
        Madras Institute of Technology, Anna University
      </p>

      
      <div className="flex flex-col items-center mt-4 space-y-4">

        <div>
        <h1 className="text-xl font-bold">Udhya Kumar K</h1>
          <a href="https://github.com/UdhyaKumarKMIT" target="_blank" rel="noopener noreferrer" className="ml-4 text-gray-300 hover:text-orange-500">
            <FaGithub size={24} />UdhyaKumarKMIT
          </a>
          <a href="mailto:udhyak2004@gmail.com" className="ml-4 text-gray-300 hover:text-orange-500">
            <FaEnvelope size={24} />udhyak2004@gmail.com
          </a>
        </div>
        <div>
        <h1 className="text-xl font-bold">Udhya Kumar K</h1>
          <a href="https://github.com/UdhyaKumarKMIT" target="_blank" rel="noopener noreferrer" className="ml-4 text-gray-300 hover:text-orange-500">
            <FaGithub size={24} />UdhyaKumarKMIT
          </a>
          <a href="mailto:your_email@example.com" className="ml-4 text-gray-300 hover:text-orange-500">
            <FaEnvelope size={24} />udhyak2004@gmail.com
          </a>
        </div>
        <div>
        <h1 className="text-xl font-bold">Udhya Kumar K</h1>
          <a href="https://github.com/UdhyaKumarKMIT" target="_blank" rel="noopener noreferrer" className="ml-4 text-gray-300 hover:text-orange-500">
            <FaGithub size={24} />UdhyaKumarKMIT
          </a>
          <a href="mailto:your_email@example.com" className="ml-4 text-gray-300 hover:text-orange-500">
            <FaEnvelope size={24} />udhyak2004@gmail.com
          </a>
        </div>
     </div>

      {/* Copyright Section */}
      <p className="text-center text-sm mt-6">© {new Date().getFullYear()} All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
