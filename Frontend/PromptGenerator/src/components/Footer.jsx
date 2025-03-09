import React from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";

function Footer() {
  const contributors = [
    {
      name: "Udhya Kumar K",
      github: "https://github.com/UdhyaKumarKMIT",
      githubHandle: "UdhyaKumarKMIT",
      email: "udhyak2004@gmail.com",
    },
    {
      name: "Mithun Aadhitya",
      github: "https://github.com/UdhyaKumarKMIT",
      githubHandle: "UdhyaKumarKMIT",
      email: "udhyak2004@gmail.com",
    },
    {
      name: "Gopika S",
      github: "https://github.com/gopikashreesakthi",
      githubHandle: "gopikashreesakthi",
      email: "gopikashreesakthi@gmail.com",
    },
  ];

  return (
    <div id="contributors" className="bg-neutral-900 text-white p-10 mt-10 rounded-t-lg shadow-md">
      {/* Footer Heading */}
      <h2 className="text-3xl font-bold text-center text-orange-400 uppercase tracking-wide">
        Contributors
      </h2>

      {/* Contributors Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 text-center">
        {contributors.map((contributor, index) => (
          <div
            key={index}
            className="p-6 bg-neutral-800 rounded-lg shadow-lg border border-orange-500 transform transition duration-300 hover:scale-105 hover:shadow-orange-500/50"
          >
            <h1 className="text-2xl font-bold text-orange-400 transition-all duration-300 hover:text-orange-300">
              {contributor.name}
            </h1>
            <div className="mt-3 flex flex-col items-center space-y-2">
              <a
                href={contributor.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition duration-300"
              >
                <FaGithub size={20} className="transition-transform duration-300 hover:rotate-12" />
                <span className="break-words text-sm md:text-base">{contributor.githubHandle}</span>
              </a>
              <a
  href={`mailto:${contributor.email}`}
  className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition duration-300"
>
  <FaEnvelope size={20} className="transition-transform duration-300 hover:scale-110" />
  <span className="break-words text-sm md:text-base">{contributor.email}</span>
</a>

            </div>
          </div>
        ))}
      </div>

      {/* Common College Name */}
      <h3 className="text-center text-lg font-semibold text-gray-300 mt-8 opacity-80">
        Students at Madras Institute of Technology
      </h3>

      {/* Copyright Section */}
      <p className="text-center text-sm mt-4 opacity-75">
        © {new Date().getFullYear()} All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
