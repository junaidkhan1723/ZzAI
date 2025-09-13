import React, { useState } from "react";
import { Image, Sparkles, Download, Loader2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli-style",
    "Anime-style",
    "Cartoon-style",
    "Fantasy-style",
    "3D-style",
    "Portrait-style",
    "Pixel-art",
    "Cyberpunk",
    "Watercolor",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setContent("");
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Failed to generate image");
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

  //handleDownload
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = content;
    link.download = "generated-image.png";
    link.click();
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
        <label
          htmlFor="image-prompt"
          className="block mt-6 text-sm font-medium text-gray-700"
        >
          Describe Your Image
        </label>
        <textarea
          id="image-prompt"
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
              aria-pressed={selectedStyle === item}
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
          <label className="relative cursor-pointer flex items-center gap-2">
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
            <span className="text-sm text-gray-700">Make this image public</span>
          </label>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-green-600 
          hover:bg-green-700 text-white px-4 py-3 text-sm font-medium rounded-xl 
          transition-all shadow-md cursor-pointer disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Image className="w-4 h-4" />
          )}
          Generate Image
        </button>
      </form>

      {/* Right col */}
      <div
        className="flex-1 max-w-xl w-full bg-white shadow-md rounded-2xl p-6 
        border border-gray-100 min-h-[24rem] relative flex flex-col"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="w-6 h-6 text-green-600" />
            <h1 className="text-lg sm:text-xl font-bold text-green-700">
              Generated Image
            </h1>
          </div>
          {content && !loading && (
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 text-green-600 cursor-pointer" />
            </button>
          )}
        </div>

        {/* States */}
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin text-green-600" />
              <p className="text-sm">Generating your image...</p>
            </div>
          </div>
        ) : !content ? (
          <div className="absolute inset-0 flex justify-center items-center">
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
        ) : (
          <div className="mt-3 flex justify-center items-center flex-1">
            <img
              src={content}
              alt="Generated"
              className="max-w-full max-h-[500px] object-contain rounded-lg shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
