import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <div className="flex mt-2">
          <img
            src={assets.Zzlogo}
            alt="Zz.ai logo"
            className="w-12 sm:w-14 -mt-3 -me-2 sm:-ms-4 -ms-8 cursor-pointer select-none"
          />
          <div
            onClick={() => navigate("/")}
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
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
      </nav>

      {/** side bar */}
      <div className="flex-1 w-full flex h-[calc(100vh-64px)] ">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <div className="flex-1 sm:bg-gray-100 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
