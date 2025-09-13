import React, { useState,useEffect,useCallback,useRef,useMemo,} from "react";
import { Edit, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import CopyButton from "./CopyButton";
import clsx from "clsx";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// AI article generation
const useGenerateArticle = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const generateArticle = async (topic, length) => {
    if (!topic.trim()) {
      toast.error("Please enter a valid topic.");
      return null;
    }

    try {
      setLoading(true);
      const prompt = `Write a ${length.text.toLowerCase()} article on the topic: "${topic}".`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: length.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) return data.content;
      toast.error(data.message || "Failed to generate article");
      return null;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateArticle, loading };
};

// Main Component
const WriteArticle = () => {
  const articleLengthOptions = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const suggestions = [
    "The Future of AI in Industry",
    "Cybersecurity Trends in 2025",
    "The Evolution of Cloud Computing",
    "Digital Marketing in the AI Era",
    "E-commerce Innovations in 2025",
    "The Future of Electric Vehicles",
    "AI in Creative Industries",
  ];

  const [selectedLength, setSelectedLength] = useState(articleLengthOptions[0]);
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const inputRef = useRef(null);

  const { generateArticle, loading } = useGenerateArticle();

  // Auto-focus on input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      setSelectedLength((prev) => {
        const idx = articleLengthOptions.findIndex(
          (item) => item.text === prev.text
        );
        return articleLengthOptions[
          (idx +
            (e.key === "ArrowRight" ? 1 : -1) +
            articleLengthOptions.length) %
            articleLengthOptions.length
        ];
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Word & character count
  const [wordCount, charCount] = useMemo(() => {
    if (!content) return [0, 0];
    const words = content.trim().split(/\s+/).length;
    return [words, content.length];
  }, [content]);

  // Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const generated = await generateArticle(input, selectedLength);
    if (generated) setContent(generated);
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6 text-slate-700">
      <ArticleForm
        input={input}
        setInput={setInput}
        inputRef={inputRef}
        articleLength={articleLengthOptions}
        selectedLength={selectedLength}
        setSelectedLength={setSelectedLength}
        loading={loading}
        onSubmitHandler={onSubmitHandler}
        suggestions={suggestions}
      />
      <GeneratedArticlePanel
        content={content}
        loading={loading}
        wordCount={wordCount}
        charCount={charCount}
      />
    </div>
  );
};

// Left column
const ArticleForm = ({
  input,
  setInput,
  inputRef,
  articleLength,
  selectedLength,
  setSelectedLength,
  loading,
  onSubmitHandler,
  suggestions,
}) => (
  <form
    onSubmit={onSubmitHandler}
    className="flex-1 max-w-xl w-full bg-gradient-to-b from-blue-50 to-white 
      shadow-md rounded-2xl p-6 border border-blue-100 flex flex-col h-full"
  >
    <div className="flex items-center gap-2">
      <Sparkles className="w-6 h-6 text-blue-600" />
      <h1 className="text-lg sm:text-xl font-bold text-blue-700">
        Article Configuration
      </h1>
    </div>

    <label
      htmlFor="topic-input"
      className="block mt-6 text-sm font-medium text-gray-700"
    >
      Article Topic
    </label>
    <input
      id="topic-input"
      ref={inputRef}
      onChange={(e) => setInput(e.target.value)}
      value={input}
      type="text"
      className="w-full mt-2 p-3 text-sm rounded-xl border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="The Future of Artificial Intelligence..."
      required
    />

    <label className="block mt-6 text-sm font-medium text-gray-700">
      Article Length
    </label>
    <div
      className="mt-3 flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Select article length"
    >
      {articleLength.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setSelectedLength(item)}
          role="radio"
          aria-checked={selectedLength.text === item.text}
          tabIndex={0}
          className={clsx(
            "px-4 py-1.5 text-xs sm:text-sm rounded-full border transition-all cursor-pointer",
            selectedLength.text === item.text
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "text-gray-600 border-gray-300 hover:border-blue-400"
          )}
        >
          {item.text}
        </button>
      ))}
    </div>

    <button
      disabled={loading}
      type="submit"
      className="w-full mt-8 flex justify-center items-center gap-2 
        bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm 
        font-medium rounded-xl transition-all shadow-md cursor-pointer"
    >
      {loading ? (
        <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
      ) : (
        <Edit className="w-4 h-4" />
      )}
      Generate Article
    </button>

    <div className="hidden lg:flex flex-col mt-auto pt-6 border-t border-gray-200 cursor-pointer">
      <h4 className="text-xs font-semibold text-gray-500 mb-2">
        Suggested Topics
      </h4>
      <div className="flex flex-col gap-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setInput(s);
              inputRef.current?.focus();
            }}
            className="text-left text-sm text-blue-600 hover:underline cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  </form>
);

// Right column
const GeneratedArticlePanel = ({ content, loading, wordCount, charCount }) => (
  <div
    className="flex-1 max-w-xl w-full bg-white shadow-md rounded-2xl p-6 
      border border-gray-100 min-h-[24rem] flex flex-col relative"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Edit className="w-6 h-6 text-blue-600" />
        <h1 className="text-lg sm:text-xl font-bold text-blue-700">
          Generated Article
        </h1>
      </div>
      <CopyButton content={content} />
    </div>

    <div className="mt-3 h-full overflow-y-auto text-sm text-slate-600">
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : !content ? (
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
      ) : (
        <div className="prose prose-sm max-w-none reset-tw">
          <Markdown>{content}</Markdown>
          <p className="mt-4 text-xs text-gray-500 font-semibold">
            Word Count: {wordCount} • Characters: {charCount}
          </p>
        </div>
      )}
    </div>
  </div>
);

export default WriteArticle;
