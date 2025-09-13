import React, { useEffect, useState } from "react";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  House,
  Eraser,
  Image,
  Edit3,
  Type,
  Scissors,
  ClipboardCheck,
  User,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Article Writer", Icon: Edit3 },
  { to: "/ai/blog-titles", label: "Title Generator", Icon: Type },
  { to: "/ai/generate-images", label: "Image Generator", Icon: Image },
  { to: "/ai/remove-background", label: "Background Remover", Icon: Scissors },
  { to: "/ai/remove-object", label: "Object Remover", Icon: Eraser },
  { to: "/ai/review-resume", label: "Resume Reviewer", Icon: ClipboardCheck },
  { to: "/ai/community", label: "Community", Icon: User },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Disable scroll on small screens when sidebar is open
  useEffect(() => {
    if (sidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebar]);

    // Handle logout click
  const handleLogoutClick = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    setShowLogoutModal(false);
    signOut();
  };
  const cancelLogout = () => setShowLogoutModal(false);

  return (
    <>
      <div
        className={`z-40 w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center
         top-14 bottom-0 left-0 transform transition-transform duration-300 ease-in-out
        max-sm:absolute
        ${sidebar ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0`}
      >
        <div className="my-7 w-full">
          {/* User Info */}
          <img
            src={user.imageUrl}
            alt="user avatar"
            className="w-14 rounded-full mx-auto"
          />
          <h1 className="mt-1 text-center">{user.fullName}</h1>

          {/* Nav Items */}
          <div className="px-6 mt-5 text-sm text-gray-500 font-medium">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/ai"}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 flex items-center gap-3 rounded transition-colors duration-200
                 ${
                   isActive
                     ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
                     : "text-gray-700 hover:bg-gray-100"
                 }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between ">
          <div
            onClick={openUserProfile}
            className="flex gap-2 items-center cursor-pointer"
          >
            <img src={user.imageUrl} alt="" className="w-8 rounded-full" />
            <div>
              <h1 className="text-sm font-medium">{user.fullName}</h1>
              <p className="text-xs text-gray-500">
                <Protect plan="premium" fallback="Free">
                  Premium{" "}
                </Protect>
                Plan
              </p>
            </div>
          </div>
          {/* Logout Icon */}
          <LogOut
            onClick={handleLogoutClick}
            className="w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer transition"
          />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 select-none">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 sm:w-100">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-3 ">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
