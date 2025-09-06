import React from "react";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="flex flex-col bg-slate-50 items-center justify-around w-full py-16 text-sm text-gray-800/70"
    >
      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <a
          href="#"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          Home
        </a>
        <a
          href="#"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          About
        </a>
        <a
          href="#"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          Services
        </a>
        <a
          href="mailto:patanjunaid7888@gmail.com"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          Contact
        </a>
        <a
          href="#"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          Help
        </a>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-4 mt-8 text-indigo-500">
        <a
          href="mailto:patanjunaid7888@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <Mail size={24} />
        </a>
        <a
          href="https://github.com/junaidkhan1723"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/junaidkhan1723"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://instagram.com/junaid_khan1723"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <Instagram size={24} />
        </a>
      </div>

      {/* Copyright */}
      <p className="mt-8 text-center">
        Copyright © 2025 <a href="#">Zz.ai</a> || All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
