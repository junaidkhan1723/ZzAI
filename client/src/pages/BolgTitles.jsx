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

  const [selectedCategories, setSelectedCategories] = useState('General');
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/** left col */}
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-purple-600" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The Future Of artificial intelligence is..."
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>

        <div className="mt-3 gap-3 flex flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              onClick={() => setSelectedCategories(item)}
              key={item}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer 
                ${
                  selectedCategories === item
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-500 border-gray-300"
                } `}
            >
              {item}
            </span>
          ))}
        </div>
        <br />

        <button
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r
        from-purple-600 to-purple-500 text-white px-4 p-2 mt-6 text-sm rounded-lg cursor-pointer transition-all "
        >
          <Hash className="w-5" />
          Generate Title
        </button>
      </form>


      {/** right col */}
      <div
        className="w-full max-w-lg p-4  bg-white rounded-lg flex flex-col border
      border-gray-200 min-h-96 "
      >
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-purple-600" />
          <h1 className="text-xl font-semibold">Generated titles</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Hash className="w-9 h-9" />
            <p>Enter a topic and click "Generate Title" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BolgTitles;
