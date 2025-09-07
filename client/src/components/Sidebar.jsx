import React from "react";
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
  { to: "/ai/blog-titles", label: "Title Generator", Icon: Type },
  { to: "/ai/write-article", label: "Article Writer", Icon: Edit3 },
  { to: "/ai/remove-object", label: "Object Remover", Icon: Eraser },
  { to: "/ai/generate-images", label: "Image Generator", Icon: Image },
  { to: "/ai/remove-background", label: "Background Remover", Icon: Scissors },
  { to: "/ai/review-resume", label: "Resume Reviewer", Icon: ClipboardCheck },
  { to: "/ai/community", label: "Community", Icon: User },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center
        fixed top-14 bottom-0 left-0 transform transition-transform duration-300 ease-in-out
        max-sm:z-50
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
        <LogOut
          onClick={signOut}
          className="w-4.5 text-gray-400 hover:text-gray-700  transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
