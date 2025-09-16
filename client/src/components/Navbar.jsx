import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || "#home");

  // Debounced resize handler for performance
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".hamburger-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu with Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isMobileMenuOpen]);

  // Update active link on hash change
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigation links with section ids
  const navigationLinks = [
    { name: "Home", path: "#home" },
    { name: "Features", path: "#features" },
    { name: "Plans", path: "#plans" },
    { name: "Contact", path: "#contact" },
  ];

  // Handle navigation clicks
  const handleNavClick = (path) => {
    if (path.startsWith("#")) {
      const id = path.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, null, path);
        setActiveHash(path);
      }
      setIsMobileMenuOpen(false);
    } else {
      navigate(path);
      setActiveHash(path);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navbar container */}
      <div className="fixed z-50 w-full bg-transparent backdrop-blur-sm flex justify-between sm:justify-around items-center py-3 px-4 sm:px-20 xl:px-32">
        
        {/* Logo section */}
        <div className="flex">
          <img
            src={assets.Zzlogo}
            alt="Zz.ai logo"
            className="w-14 -mt-3 -me-2 cursor-pointer select-none"
          />
          <div
            onClick={() => handleNavClick("/")}
            className="cursor-pointer text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity select-none"
            style={{
              fontFamily: "sans-serif", 
              fontWeight: "800",
              background: "linear-gradient(135deg, #1E40AF 0%, #6D28D9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Zz.ai
          </div>
        </div>

        {/* Desktop navigation links */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          {navigationLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              aria-label={`Navigate to ${link.name}`}
              className={`relative transition-all duration-300 ${
                activeHash === link.path
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                  : "text-gray-700 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent cursor-pointer"
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Desktop authentication*/}
        <div className="hidden md:flex items-center">
          {user ? (
            <UserButton />
          ) : (
            <button
              aria-label="sign-in"
              onClick={() => openSignIn({})}
              className="group relative flex items-center justify-center gap-2 
                         rounded-full text-sm font-medium cursor-pointer
                         bg-primary hover:bg-indigo-700
                         text-white px-10 py-2.5
                         transition-all duration-200 ease-out
                         transform hover:scale-[1.02]
                         focus:outline-none focus:ring-2 focus:ring-blue-700/50 focus:ring-offset-2 focus:ring-offset-white
                         active:scale-[0.98]
                         border border-blue-700/50
                         shadow-sm hover:shadow-md"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800/0 via-gray-700/20 to-gray-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          )}
        </div>

        {/* Mobile hamburger menu button */}
        <div className="md:hidden flex items-center gap-3">
          {user && <UserButton />}
          <button
            aria-label="Toggle mobile menu"
            className="hamburger-button p-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      <div
        className={`mobile-menu fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />

        {/* Menu content */}
        <div className="relative h-full flex flex-col justify-center items-center space-y-8">
          {navigationLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              aria-label={`Navigate to ${link.name}`} 
              className={`text-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                activeHash === link.path
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
              } ${isMobileMenuOpen ? "animate-fadeInUp" : ""}`} 
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              {link.name}
            </button>
          ))}

          {/* Authentication Button */}
          {!user && (
            <button
              aria-label="sign-in" 
              onClick={() => openSignIn({})}
              className={`group relative flex items-center justify-center gap-2 
                          rounded-lg text-sm font-medium cursor-pointer
                          bg-gray-900 hover:bg-gray-800
                          text-white px-4 py-2 md:px-6 md:py-2.5
                          transition-all duration-200 ease-out
                          transform hover:scale-[1.02]
                          focus:outline-none focus:ring-2 focus:ring-gray-700/50 focus:ring-offset-2 focus:ring-offset-white
                          active:scale-[0.98]
                          border border-gray-700/50
                          shadow-sm hover:shadow-md
                          ${isMobileMenuOpen ? "animate-fadeInUp" : ""}`}
              style={{
                animationDelay: `${navigationLinks.length * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Get started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800/0 via-gray-700/20 to-gray-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
