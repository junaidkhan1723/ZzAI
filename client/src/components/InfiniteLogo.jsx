import React from "react";

const logos = [
  {
    name: "OpenAI",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
  },  
  {
    name: "Microsoft",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Google",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Meta",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
  },
  {
    name: "Amazon",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "NVIDIA",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nvidia.svg",
  },
  {
    name: "IBM",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "Adobe",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg",
  },
];

export default function InfiniteLogo() {
  return (
   <div className="w-screen sm:max-w-5xl py-4 overflow-hidden">
      <div className="relative w-full overflow-hidden mx-8 sm:mx-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center min-w-[80px] sm:min-w-[100px] mx-2 sm:mx-5 flex-shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-6 sm:h-7 md:h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
