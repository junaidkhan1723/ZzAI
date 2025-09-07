import React from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  House,
  Eraser,
  Image,
  Edit3,
  Type,
  Scissors,
  ClipboardCheck,
  User,
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
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-start items-center
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
        <div
          className="mt-4 flex flex-col 
                        max-sm:w-5/6 max-sm:mx-auto  
                        sm:w-full font-medium "
        >
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
    </div>
  );
};

export default Sidebar;
