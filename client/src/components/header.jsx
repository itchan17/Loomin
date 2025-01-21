import { useState } from "react";
import React from "react";
import "../global.css";
import logo from "../assets/loomin.png";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";
import LogoutModal from "./LogoutModal";

const Header = ({ toggleSidebar }) => {
  const logout = useAuthStore((state) => state.logout);
  const clearUser = useUserStore((state) => state.clearUser);
  const clearActiveChat = useChatStore((state) => state.clearActiveChat);
  const socket = useSocketStore((state) => state.socket);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      clearActiveChat();
      socket.disconnect();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <header className="flex justify-between items-center h-16 text-black py-4 pl-2 pr-2 md:pl-6 md:pr-8 bg-gradient-to-r from-loomin-yellow to-loomin-orange drop-shadow-md sticky top-0">
        {/* Search Button for Mobile */}
        <button
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg md:hidden hover:bg-loomin-yellow-700"
          onClick={() => document.querySelector('input[type="text"]').focus()}
        >
          <span className="sr-only">Open search</span>
          <svg
            className="w-6 h-6"
            fill="white"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center w-24">
            <img
              src={logo}
              alt="Loomin Logo"
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Search Bar */}
          <div className="relative hidden md:flex items-center">
            <input
              type="text"
              placeholder="What's up?"
              className="pl-10 pr-4 py-2 rounded-xl bg-white/80 focus:outline-none focus:ring-1 focus:ring-loomin-orange w-64"
            />
            <svg
              className="absolute left-3 w-5 h-5 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex items-center ml-auto">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="bx bx-log-out text-2xl text-white rotate-180 hover:bg-orange-700 px-5 py-2 rounded-full cursor-pointer"
          ></button>
        </div>
      </header>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
