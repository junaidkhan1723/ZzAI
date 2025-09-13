import React, { useState } from "react";
import { Edit, Sparkles } from "lucide-react";
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6 text-slate-700">
      {/** Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 max-w-xl w-full bg-gradient-to-b from-blue-50 to-white 
        shadow-md rounded-2xl p-6 border border-blue-100"
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h1 className="text-lg sm:text-xl font-bold text-blue-700">
            Article Configuration
          </h1>
        </div>

        {/* Article Topic */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Article Topic
        </label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full mt-2 p-3 text-sm rounded-xl border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="The Future of Artificial Intelligence..."
          required
        />

        {/* Article Length */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Article Length
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {articleLength.map((item, index) => (
            <button
              type="button"
              onClick={() => setSelectedLength(item)}
              key={index}
              className={`px-4 py-1.5 text-xs sm:text-sm rounded-full border transition-all cursor-pointer
                ${
                  selectedLength.text === item.text
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "text-gray-600 border-gray-300 hover:border-blue-400"
                }`}
            >
              {item.text}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-8 flex justify-center items-center gap-2 
          bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm 
          font-medium rounded-xl transition-all shadow-md cursor-pointer"
        >
          <Edit className="w-4 h-4" />
          Generate Article
        </button>
      </form>

      {/** Right col */}
      <div
        className="flex-1 max-w-xl w-full bg-white shadow-md rounded-2xl p-6 
        border border-gray-100 min-h-[24rem] flex flex-col"
      >
        <div className="flex items-center gap-2">
          <Edit className="w-6 h-6 text-blue-600" />
          <h1 className="text-lg sm:text-xl font-bold text-blue-700">
            Generated Article
          </h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
            <Edit className="w-10 h-10" />
            <p className="text-center max-w-sm">
              Enter a topic and select a length, then click{" "}
              <span className="font-semibold text-blue-500">
                "Generate Article"
              </span>{" "}
              to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
