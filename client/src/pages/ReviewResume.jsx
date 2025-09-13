import React, { useState } from "react";
import { FileText, Sparkles, Loader2, Copy } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setContent("");
      const formData = new FormData();
      formData.append("resume", resume);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Failed to review resume");
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

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    toast.success("Analysis copied to clipboard!");
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6 text-slate-700">
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 max-w-xl w-full bg-gradient-to-b from-teal-50 to-white 
        shadow-md rounded-2xl p-6 border border-teal-100"
      >
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-teal-500" />
          <h1 className="text-xl font-semibold text-teal-800">Resume Review</h1>
        </div>

        {/* Upload Resume */}
        <label className="block text-sm font-medium text-gray-700">
          Upload Resume
        </label>
        <input
          onChange={(e) => setResume(e.target.files[0])}
          type="file"
          accept="application/pdf"
          className="w-full mt-2 block rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
          required
        />

        {/* File Preview */}
        {resume && (
          <p className="mt-2 text-xs text-teal-600 font-medium">
            Selected file: <span className="text-gray-700">{resume.name}</span>
          </p>
        )}

        <p className="text-xs text-gray-500 mt-2">Supports PDF files only.</p>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:from-teal-600 hover:to-teal-700 transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileText className="w-5 h-5" />
          )}
          Review Resume
        </button>
      </form>

      {/* Right Column */}

      <div
        className="flex-1 max-w-xl w-full bg-white shadow-md rounded-2xl p-6 
    border border-gray-100 min-h-[24rem] relative flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-500" />
            <h1 className="text-lg sm:text-xl font-bold text-teal-700">
              Analysis Result
            </h1>
          </div>
          {content && !loading && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-teal-600 border border-teal-200 rounded-md px-2 py-1 hover:bg-teal-50 transition"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
          )}
        </div>

        {/* Content area */}
        <div className="mt-3 h-full overflow-y-auto text-sm text-slate-600 relative">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : !content ? (
            <div className="absolute inset-0 flex justify-center items-center text-center text-gray-400">
              <FileText className="w-10 h-10" />
              <p className="text-sm mt-2">
                Upload a resume and click{" "}
                <span className="font-medium text-teal-500">
                  "Review Resume"
                </span>{" "}
                to see analysis
              </p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
