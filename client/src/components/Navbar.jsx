import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //  Close mobile menu on resize 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  Close mobile menu on outside click
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

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Price", path: "/price" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />

      {/* Navbar */}
      <div className="fixed z-50 w-full bg-transparent backdrop-blur-sm flex justify-between sm:justify-around items-center py-3 px-4 sm:px-20 xl:px-32">
        
        {/* Logo */}
        <div className="flex ">
        <img src={assets.Zzlogo} alt="" className="w-14 -mt-3 -me-2" />
        <div
          onClick={() => handleNavClick("/")}
          className="cursor-pointer text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity"
          style={{
            fontFamily: "Poppins, sans-serif",
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-semibold ">
          {navigationLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`relative transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                    : "text-gray-700 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent cursor-pointer"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center">
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn({})}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-600 text-white px-10 py-2.5 hover:bg-blue-700 transition-colors"
            >
              Get started <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {user && <UserButton />}
          <button
            className="hamburger-button p-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // prevent immediate close
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

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={(e) => e.stopPropagation()} //prevent close when clicking inside
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center space-y-8">
          {navigationLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`text-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
                } ${isMobileMenuOpen ? "animate-fade-in-up" : ""}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                {link.name}
              </button>
            );
          })}

          {/* Mobile Auth */}
          {!user && (
            <button
              onClick={() => openSignIn({})}
              className={`flex items-center gap-2 rounded-full text-lg cursor-pointer bg-primary text-white px-12 py-3 
                          hover:bg-blue-900 transition-all duration-200 transform hover:scale-105 ${
                            isMobileMenuOpen ? "animate-fade-in-up" : ""
                          }`}
              style={{
                animationDelay: `${navigationLinks.length * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              Get started <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

    </>
  );
};

export default Navbar;
