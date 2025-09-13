import React, { useState } from "react";
import { Eraser, Sparkles, Download, Loader2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!image) return toast.error("Please upload an image first!");
      if (object.trim().split(" ").length > 1) {
        return toast.error("Please enter only one object name.");
      }

      setLoading(true);
      setContent("");

      const formData = new FormData();
      formData.append("image", image);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Failed to process image");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // Download handler
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = content;
    link.download = "processed-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6 text-slate-700">
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 max-w-xl w-full bg-gradient-to-b from-fuchsia-50 to-white 
        shadow-md rounded-2xl p-6 border border-fuchsia-100 flex flex-col"
      >
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-fuchsia-500" />
          <h1 className="text-xl font-semibold text-fuchsia-800">
            Object Removal
          </h1>
        </div>

        {/* Upload Image */}
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full mt-2 block rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none"
          required
        />

        {/* Uploaded Preview */}
        {image && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded Preview"
              className="max-h-56 rounded-xl shadow-md border border-gray-200 object-contain"
            />
          </div>
        )}

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
          disabled={loading}
          type="submit"
          className="w-full mt-6 flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow hover:from-fuchsia-600 hover:to-fuchsia-700 transition-all"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Eraser className="w-5 h-5" />
          )}
          Remove Object
        </button>
      </form>

      {/* Right Column */}
      <div
        className="flex-1 max-w-xl w-full bg-white shadow-md rounded-2xl p-6 
        border border-gray-100 min-h-[24rem] relative flex flex-col"
      >
        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eraser className="w-5 h-5 text-fuchsia-500" />
            <h1 className="text-lg sm:text-xl font-bold text-fuchsia-700">
              Processed Image
            </h1>
          </div>
          {content && !loading && (
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 text-fuchsia-600 cursor-pointer" />
            </button>
          )}
        </div>

        {/* States */}
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin text-fuchsia-600" />
              <p className="text-sm">Processing your image...</p>
            </div>
          </div>
        ) : !content ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="flex flex-col items-center gap-4 text-gray-400">
              <Eraser className="w-10 h-10" />
              <p className="text-sm">
                Upload an image and click{" "}
                <span className="font-medium text-fuchsia-500">
                  "Remove Object"
                </span>{" "}
                to see results
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex justify-center items-center flex-1">
            <img
              src={content}
              alt="Processed"
              className="max-w-full max-h-[500px] object-contain rounded-lg shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
