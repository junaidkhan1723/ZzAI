import React, { useState } from "react";
import { Hash, Sparkles } from "lucide-react";

const BolgTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategories, setSelectedCategories] = useState("General");
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6 text-slate-700">
      {/** Left Section */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 max-w-xl w-full bg-gradient-to-b from-purple-100 to-white 
        shadow-md rounded-2xl p-6 border border-purple-100"
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h1 className="text-lg sm:text-xl font-bold text-purple-700">
            AI Title Generator
          </h1>
        </div>

        {/* Keyword Input */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Keyword
        </label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full mt-2 p-3 text-sm rounded-xl border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="The Future of Artificial Intelligence..."
          required
        />

        {/* Category Selection */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Category
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {blogCategories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setSelectedCategories(item)}
              className={`px-4 py-1.5 text-xs sm:text-sm rounded-full border transition-all cursor-pointer
                ${
                  selectedCategories === item
                    ? "bg-purple-600 text-white border-purple-600 shadow-md"
                    : "text-gray-600 border-gray-300 hover:border-purple-400"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-8 flex justify-center items-center gap-2 
          bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 text-sm 
          font-medium rounded-xl transition-all shadow-md cursor-pointer"
        >
          <Hash className="w-4 h-4" />
          Generate Title
        </button>
      </form>

      {/** Right Section */}
      <div
        className="flex-1 max-w-xl w-full bg-white shadow-md rounded-2xl p-6 
        border border-gray-100 min-h-[24rem] flex flex-col"
      >
        <div className="flex items-center gap-2">
          <Hash className="w-6 h-6 text-purple-600" />
          <h1 className="text-lg sm:text-xl font-bold text-purple-700">
            Generated Titles
          </h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
            <Hash className="w-10 h-10" />
            <p className="text-center max-w-sm">
              Enter a keyword and select a category, then click{" "}
              <span className="font-semibold text-purple-500">
                "Generate Title"
              </span>{" "}
              to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BolgTitles;
