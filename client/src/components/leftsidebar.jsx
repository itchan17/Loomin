import React, { useState, useEffect } from "react";
import feedIcon from "../assets/home.svg";
import profileIcon from "../assets/userIcon.svg";
import notificationIcon from "../assets/notification.svg";
import useUserStore from "../stores/UserStore";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useChatStore from "../stores/chatStore";

const Leftsidebar = ({ isOpen }) => {
  // States
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  const postsCount = useUserStore((state) => state.postsCount);
  const followingCount = useUserStore((state) => state.followingCount);
  const followersCount = useUserStore((state) => state.followersCount);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMessagePage = location.pathname === "/inbox";
  const isComingSoon = location.pathname === "./comingsoon";
  const isProfilePage = location.pathname === "/profile";

  // State functions
  const fetchLoggedInUser = useUserStore((state) => state.fetchLoggedInUser);

  const clearActiveChat = useChatStore((state) => state.clearActiveChat);

  // Format the number
  const formatNumber = (count) => {
    return count > 1000
      ? numeral(count).format("0.0a")
      : numeral(count).format("0a");
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <aside
      id="sidebar"
      className="w-1/4 bg-loomin-white shadow-inner h-screen transition-transform border-r border-gray-200"
    >
      <div className="flex flex-col items-center p-6">
        {!isProfilePage && (
          <>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={loggedInUser.profile_picture || profileIcon}
                alt="User"
                className="w-24 h-24 rounded-full"
              />
              <span className="username">{loggedInUserName}</span>
            </div>
            <div className="flex justify-between gap-4 px-2 w-full">
              <div className=" flex flex-col items-center">
                <span className="font-bold text-lg">
                  {formatNumber(postsCount)}
                </span>
                <span className="text-sm text-gray-600">Looms</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">
                  {formatNumber(followersCount)}
                </span>
                <span className="text-sm text-gray-600">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">
                  {formatNumber(followingCount)}
                </span>
                <span className="text-sm text-gray-600">Following</span>
              </div>
            </div>
            <hr className="w-full border-t border-gray-200 my-4" />
          </>
        )}

        <nav className=" w-full flex flex-col gap-4">
          <p className="text-slate-500 font-bold">Menu</p>
          <Link to="/">
            <div
              onClick={clearActiveChat}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg 
          ${
            isHomePage
              ? "bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white"
              : "hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white"
          }`}
            >
              <i alt="Feed" className="bx bxs-home-heart text-xl"></i>
              <span className="ml-1 text-xl mb-1">Home</span>
            </div>
          </Link>
          <Link to="/profile">
            <div
              onClick={clearActiveChat}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg 
          ${
            isProfilePage //pa-add nalang ng new const pag meron ng page to
              ? "bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white"
              : "hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white"
          }`}
            >
              <i alt="Feed" className="bx bx-user text-xl"></i>
              <span className="ml-1 text-xl mb-1">My Profile</span>
            </div>
          </Link>
          <Link to="/comingsoon">
            <div
              onClick={clearActiveChat}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg 
          ${
            isComingSoon //pa-add nalang ng new const pag meron ng page to
              ? "bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white"
              : "hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white"
          }`}
            >
              <i alt="Feed" className="bx bx-notification text-xl"></i>
              <span className="ml-1 text-xl mb-1">Notifications</span>
            </div>
          </Link>
          <Link to="/inbox">
            <div
              onClick={clearActiveChat}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg 
          ${
            isMessagePage
              ? "bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white"
              : "hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white"
          }`}
            >
              <i alt="Feed" className="bx bx-message-dots text-xl"></i>
              <span className="ml-1 text-xl mb-1">Messages</span>
            </div>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Leftsidebar;
