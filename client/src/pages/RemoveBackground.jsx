import React, { useState } from "react";
import { Scissors, Sparkles } from "lucide-react";

const RemoveBackground = () => {
  const [input, setInput] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col lg:flex-row gap-6 text-slate-700 bg-gray-50">
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 w-full max-w-lg mx-auto p-6 bg-gradient-to-b from-orange-50 to-white shadow-md rounded-2xl border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-orange-500" />
          <h1 className="text-xl font-semibold text-orange-800">
            Background Removal
          </h1>
        </div>

        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full mt-2 block rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
          required
        />

        <p className="text-xs text-gray-500 mt-2">
          Supports JPG, PNG, and other formats
        </p>

        <button
          type="submit"
          className="w-full mt-6 flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-medium text-white shadow hover:from-orange-600 hover:to-orange-700 transition-all cursor-pointer"
        >
          <Scissors className="w-5 h-5" />
          Remove Background
        </button>
      </form>

      {/* Right Column */}
      <div className="flex-1 w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl border border-gray-100 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Scissors className="w-5 h-5 text-orange-500" />
          <h1 className="text-lg font-semibold text-gray-800">
            Processed Image
          </h1>
        </div>

        {/* Preview or Placeholder */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {input ? (
            <img
              src={URL.createObjectURL(input)}
              alt="Uploaded Preview"
              className="max-h-80 rounded-xl shadow-md border border-gray-200 object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-4 text-gray-400">
              <Scissors className="w-10 h-10" />
              <p className="text-sm">
                Upload an image and click{" "}
                <span className="font-medium text-orange-500">"Remove Background"</span>{" "}
                to see results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
