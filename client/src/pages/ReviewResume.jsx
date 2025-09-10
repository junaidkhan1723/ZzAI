import React, { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

const ReviewResume = () => {
  const [resume, setResume] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (resume) {
      console.log("Uploaded Resume:", resume.name);
    }
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
        <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
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
          className="w-full mt-6 flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:from-teal-600 hover:to-teal-700 transition-all"
        >
          <FileText className="w-5 h-5" />
          Review Resume
        </button>
      </form>

      {/* Right Column */}
      <div className="flex-1 max-w-xl w-full bg-white shadow-md rounded-2xl p-6 
        border border-gray-100 min-h-[24rem] flex flex-col">
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-teal-500" />
          <h1 className="text-lg sm:text-xl font-bold text-teal-700">Analysis Result</h1>
        </div>

        {/* Placeholder */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center gap-4 text-gray-400">
            <FileText className="w-10 h-10" />
            <p className="text-sm">
              Upload a resume and click{" "}
              <span className="font-medium text-teal-500">"Review Resume"</span> to see analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
