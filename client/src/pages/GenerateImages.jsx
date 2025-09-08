import React, { useState } from "react";
import { Image, Sparkles } from "lucide-react";

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli-style",
    "Anime-style",
    "Cartoon-style",
    "Fantasy-style",
    "3D-style",
    "Portrait-style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6 text-slate-700">
      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 max-w-xl w-full bg-gradient-to-b from-green-50 to-white 
        shadow-md rounded-2xl p-6 border border-green-100"
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-green-600" />
          <h1 className="text-lg sm:text-xl font-bold text-green-700">
            AI Image Generator
          </h1>
        </div>

        {/* Input */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Describe Your Image
        </label>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full mt-2 p-3 text-sm rounded-xl border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          placeholder="A futuristic city skyline at sunset..."
          required
        />

        {/* Styles */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Choose Style
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {imageStyle.map((item) => (
            <button
              type="button"
              onClick={() => setSelectedStyle(item)}
              key={item}
              className={`px-4 py-1.5 text-xs sm:text-sm rounded-full border transition-all 
                ${
                  selectedStyle === item
                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                    : "text-gray-600 border-gray-300 hover:border-green-400 cursor-pointer"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Public toggle */}
        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span
              className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full
              transition peer-checked:translate-x-4"
            ></span>
          </label>
          <p className="text-sm text-gray-700">Make this image public</p>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-green-600 
          hover:bg-green-700 text-white px-4 py-3 text-sm font-medium rounded-xl 
          transition-all shadow-md cursor-pointer"
        >
          <Image className="w-4 h-4" />
          Generate Image
        </button>
      </form>

      {/* Right col */}
      <div
        className="flex-1 max-w-xl w-full bg-white shadow-md rounded-2xl p-6 
        border border-gray-100 min-h-[24rem] flex flex-col"
      >
        <div className="flex items-center gap-2">
          <Image className="w-6 h-6 text-green-600" />
          <h1 className="text-lg sm:text-xl font-bold text-green-700">
            Generated Image
          </h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
            <Image className="w-10 h-10" />
            <p className="text-center max-w-sm">
              Describe your idea, choose a style, and click{" "}
              <span className="font-semibold text-green-500">
                "Generate Image"
              </span>{" "}
              to bring your imagination to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
