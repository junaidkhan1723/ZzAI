import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InfiniteLogo from "./InfiniteLogo";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  const subheadings = [
    "Write blogs, articles, and stories with AI-powered text generation.",
    "From articles to images to resumes, let AI help you create smarter, faster.",
    "A smarter way to create—text, visuals, and resumes at your fingertips.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % subheadings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [subheadings.length]);

  return (
    <section id="home"
      className="relative flex flex-col items-center justify-center 
                 min-h-screen  px-4 sm:px-12 lg:px-24 
                 text-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat"
    >
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold leading-tight tracking-normal text-gray-900">
        Create smarter content with <br />Next-Gen
        <span className="text-primary"> AI Tools</span>
      </h1>

      {/* Rotating Subheading */}
      <div className="min-h-[3rem] sm:min-h-[4rem] mt-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-600 leading-relaxed"
          >
            {subheadings[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button
          onClick={() => navigate("/ai")}
          className="px-12 py-2.5 sm:px-14 rounded-lg bg-primary text-white 
                     hover:bg-blue-700 transition text-sm sm:text-base cursor-pointer"
        >
          Get Started
        </button>
        <button
          className="px-8 py-2.5 rounded-lg border border-gray-300 
                     hover:bg-gray-100 transition text-sm sm:text-base cursor-pointer"
        >
          Watch Demo
        </button>
      </div>

      {/* Trusted Badge */}
      <div className="flex items-center gap-3 mt-8 mx-auto text-gray-600 text-sm sm:text-base">
        <img src={assets.user_group} alt="Users" className="h-8" />
        Trusted by 10k+ people
      </div>

      {/* Partner Logos */}
      <div className="mt-10">
        <InfiniteLogo />
      </div>

    </section>
  );
};

export default Hero;
