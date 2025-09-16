import React, { useState, useEffect, useRef } from "react";
import { Play, ArrowRight, Zap, Lock, BarChart2, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InfiniteLogo from "./InfiniteLogo";
import { assets } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";

const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { isSignedIn } = useUser();

  const features = [
    {
      icon: (
        <Cpu className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
      ),
      text: "AI-Powered Generation",
    },
    {
      icon: (
        <Zap className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
      ),
      text: "Lightning Fast Processing",
    },
    {
      icon: (
        <Lock className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
      ),
      text: "Enterprise Security",
    },
    {
      icon: (
        <BarChart2 className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
      ),
      text: "Advanced Analytics",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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

  const handleStartClick = () => {
    if (isSignedIn) {
      navigate("/ai");
    } else {
      window.Clerk?.openSignUp();
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex items-center text-center justify-center min-h-[calc(100vh-80px)] bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat"
      style={{ paddingTop: "80px" }}
    >
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center items-center space-y-10">
        {/* Main Heading */}
        <div className="space-y-2 select-none">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-wide animate-fadeInUp animation-delay-200">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Create smarter content with
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Next-Gen{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
              AI Tools
            </span>
          </h1>

          {/* Rotating Subheading */}
          <div className="min-h-[2rem] sm:min-h-[3rem] mt-3 -mb-2 ">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-700 leading-relaxed"
              >
                {subheadings[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 animate-fadeInUp animation-delay-400 -mt-2 sm:mt-0 select-none">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2 shadow-sm transition-all duration-300 ${
                activeFeature === idx
                  ? "scale-105 bg-blue-50"
                  : "bg-white hover:scale-105"
              }`}
            >
              {feature.icon}
              <span className="text-sm font-medium text-gray-700">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-500">
          <button
            onClick={handleStartClick}
            className="group relative px-9 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Creating Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <span className="flex items-center gap-2">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </span>
          </button>
        </div>

        {/* Trusted Badge */}
        <div className="flex items-center gap-2 mx-auto text-gray-700 text-sm sm:text-base select-none">
          <img src={assets.user_group} alt="Users" className="h-8" />
          Trusted by <strong>1000+</strong> people
        </div>

        {/* Partner Logos */}
        <div className="mt-1">
          <InfiniteLogo />
        </div>
      </div>
    </section>
  );
};

export default Hero;
