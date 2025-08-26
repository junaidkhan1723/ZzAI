import React from "react";

const logos =[
  { name: "OpenAI", src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
 { name: "Meta", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg" },
   { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "NVIDIA", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nvidia.svg" },
    { name: "IBM", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
   { name: "Adobe", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg" }
];

export default function InfiniteLogo() {
  return (
    <div className="w-full bg-gray-50 py-10 overflow-hidden">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
        🤝 Our AI Partners
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center min-w-[180px] mx-6"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
