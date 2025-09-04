import React, { useEffect, useRef, useState } from "react";
import { FileText, Image, Edit3, Type, Scissors, ClipboardCheck } from "lucide-react";
import Card from "./Card";

const features = [
  {
    icon: FileText,
    title: "Text Generator",
    description:
      "Generate compelling text for blogs, code, or marketing with powerful AI-driven language models.",
  },
  {
    icon: Image,
    title: "Image Generator",
    description:
      "Turn ideas into stunning visuals, from photorealistic designs to creative illustrations in seconds.",
  },
  {
    icon: Edit3,
    title: "Article Writer",
    description:
      "Let AI draft complete articles, essays, letters or stories with clarity and structure for your audience.",
  },
  {
    icon: Type,
    title: "Blog Title Generator",
    description:
      "Get engaging blog, articles and content titles instantly, tailored to your niche and target audience.",
  },
  {
    icon: Scissors,
    title: "Background Remover",
    description:
      "Remove image backgrounds instantly with precision, perfect for designs, profiles, and e-commerce.",
  },
  {
    icon: ClipboardCheck,
    title: "Resume Reviewer",
    description:
      "Polish your career profile with AI-driven feedback on formatting, clarity, precision and professional tone.",
  },
];

const Features = () => {
  const [visible, setVisible] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target); // ✅ Fix: map correct index
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
    <section className="px-6 py-16 sm:px-12 lg:px-20">
      <div className="text-center">
        <h2 className="text-slate-700 text-2xl sm:text-4xl font-semibold mb-2">AI-Powered Innovation</h2>
        <p className="text-gray-500 max-w-lg mx-auto mb-2">Transform your ideas into polished text, visuals, and workflows with intelligent automation.</p>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (refs.current[index] = el)}
              className={`transition-all duration-700 ease-out transform ${
                visible.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
