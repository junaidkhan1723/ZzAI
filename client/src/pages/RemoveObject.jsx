import React, { useState } from "react";
import { Eraser, Sparkles } from "lucide-react";

const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [object, setObject] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col lg:flex-row gap-6 text-slate-700 bg-gray-50">
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 w-full max-w-lg mx-auto p-6 bg-gradient-to-b from-fuchsia-50 to-white shadow-md rounded-2xl border border-gray-100"
      >
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-fuchsia-500" />
          <h1 className="text-xl font-semibold text-fuchsia-800">Object Removal</h1>
        </div>

        {/* Upload Image */}
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full mt-2 block rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none"
          required
        />

        {/* Object Input */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Object to Remove
        </label>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={3}
          className="w-full mt-2 p-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 resize-none"
          placeholder="Enter a single object name e.g., wall, pole"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow hover:from-fuchsia-600 hover:to-fuchsia-700 transition-all"
        >
          <Eraser className="w-5 h-5" />
          Remove Object
        </button>
      </form>

      {/* Right Column */}
      <div className="flex-1 w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl border border-gray-100 flex flex-col">
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <Eraser className="w-5 h-5 text-fuchsia-500" />
          <h1 className="text-lg font-semibold text-gray-800">Processed Image</h1>
        </div>

        {/* Image Preview or Placeholder */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded Preview"
              className="max-h-80 rounded-xl shadow-md border border-gray-200 object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-4 text-gray-400">
              <Eraser className="w-10 h-10" />
              <p className="text-sm">
                Upload an image and click{" "}
                <span className="font-medium text-fuchsia-500">"Remove Object"</span>{" "}
                to see results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
