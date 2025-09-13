import React, { useState } from "react";
import { Download, Scissors, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setContent("");
      const formData = new FormData();
      formData.append("image", input);

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Failed to remove background");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInput(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  //handleDownload
  const handleDownload = () => {
    if (!content) return;
    const link = document.createElement("a");
    link.href = content;
    link.download = "background-removed.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6 text-slate-700">
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 max-w-xl w-full bg-gradient-to-b from-orange-50 to-white 
        shadow-md rounded-2xl p-6 border border-orange-100"
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
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          className="w-full mt-2 block rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
          required
        />

        {/* Image Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Preview:</p>
            <img
              src={preview}
              alt="preview"
              className="w-full h-40 object-contain rounded-lg border"
            />
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Supports JPG, PNG, and other formats
        </p>

        <button
          disabled={loading}
          type="submit"
          className="w-full mt-6 flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-medium text-white shadow hover:from-orange-600 hover:to-orange-700 transition-all cursor-pointer"
        >
          {loading ? (
            <span
              className="w-4 h-4 my-1 rounded-full border-2
              border-t-transparent animate-spin"
            ></span>
          ) : (
            <Scissors className="w-5 h-5" />
          )}
          Remove Background
        </button>
      </form>

      {/* Right Column */}
      <div
  className="flex-1 max-w-xl w-full bg-white shadow-md rounded-2xl p-6 
  border border-gray-100 min-h-[24rem] relative flex flex-col"
>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Scissors className="w-6 h-6 text-orange-500" />
      <h1 className="text-lg sm:text-xl font-bold text-orange-700">
        Processed Image
      </h1>
    </div>
    {content && !loading && (
      <button
        onClick={handleDownload}
        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
      >
        <Download className="w-4 h-4 text-orange-500 cursor-pointer" />
      </button>
    )}
  </div>

  {/* States */}
  {loading ? (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <span className="w-10 h-10 animate-spin rounded-full border-4 border-orange-400 border-t-transparent"></span>
        <p className="text-sm">Removing background...</p>
      </div>
    </div>
  ) : !content ? (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
        <Scissors className="w-10 h-10" />
        <p className="text-center max-w-sm">
          Upload an image and click{" "}
          <span className="font-semibold text-orange-500">
            "Remove Background"
          </span>{" "}
          to see results.
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

export default RemoveBackground;
