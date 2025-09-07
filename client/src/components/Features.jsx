import React, { useEffect, useRef, useState } from "react";
import { Eraser, Image, Edit3, Type, Scissors, ClipboardCheck } from "lucide-react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const features = [
  {
    icon: Type,
    title: "Title Generator",
    description:
      "Get engaging blog, articles and content titles instantly, tailored to your niche and target audience.",
    path: "/ai/blog-titles",
    badge: "Free", 
  },
  {
    icon: Edit3,
    title: "Article Writer",
    description:
      "Let AI draft complete articles, essays, letters or stories with clarity and structure for your audience.",
    path: "/ai/write-article",
    badge: "Free", 
  },
  {
    icon: Eraser,
    title: "Object Remover",
    description:
      "Easily remove unwanted objects from your images with AI-powered precision, leaving clean and natural results.",
    path: "/ai/remove-object",
    badge: "Premium", 
  },
  {
    icon: Image,
    title: "Image Generator",
    description:
      "Turn ideas into stunning visuals, from photorealistic designs to creative illustrations in seconds.",
    path: "/ai/generate-images",
    badge: "Premium", 
  },
  {
    icon: Scissors,
    title: "Background Remover",
    description:
      "Remove image backgrounds instantly with precision, perfect for designs, profiles, and e-commerce.",
    path: "/ai/remove-background",
    badge: "Premium", 
  },
  {
    icon: ClipboardCheck,
    title: "Resume Reviewer",
    description:
      "Polish your career profile with AI-driven feedback on formatting, clarity, precision and professional tone.",
    path: "/ai/review-resume",
    badge: "Premium", 
  },
];


const Features = () => {
  const [visible, setVisible] = useState([]);
  const refs = useRef([]);
  const navigate = useNavigate();
  const {user} = useUser();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target); 
          if (entry.isIntersecting && index !== -1) {
            setVisible((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="px-6 py-16 sm:px-12 lg:px-20" id="features">
      <div className="text-center">
        <h2 className="text-slate-700 text-2xl sm:text-4xl font-semibold mb-2" >AI-Powered Innovation</h2>
        <p className="text-gray-500 max-w-lg mx-auto mb-4">Transform your ideas into polished text, visuals, and workflows with intelligent automation.</p>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {features.map((feature, index) => (
            <div onClick={()=> user && navigate(feature.path)}
              key={index}
              ref={(el) => (refs.current[index] = el)}
              className={`transition-all duration-700 ease-out transform ${
                visible.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card {...feature}  />
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};

export default Features;
