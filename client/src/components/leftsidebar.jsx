import React, { useState, useEffect } from "react";
import feedIcon from "../assets/home.svg";
import profileIcon from "../assets/userIcon.svg";
import notificationIcon from "../assets/notification.svg";
import useUserStore from "../stores/UserStore";

const Leftsidebar = ({ isOpen }) => {
  // States
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  const postsCount = useUserStore((state) => state.postsCount);
  const followingCount = useUserStore((state) => state.followingCount);
  const followersCount = useUserStore((state) => state.followersCount);

  // State functions
  const fetchLoggedInUser = useUserStore((state) => state.fetchLoggedInUser);

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <aside
      id="sidebar"
      className={`w-3/12 bg-gradient from-black to-white border-r border-gray-200 h-screen transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <div className="flex flex-col items-center p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={loggedInUser.profile_picture}
            alt="User"
            className="w-24 h-24 rounded-full"
          />
          <span className="username">{loggedInUserName}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 w-full">
          <div className=" flex flex-col items-center">
            <span className="font-bold text-lg">{postsCount}</span>
            <span className="text-sm text-gray-600">Looms</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{followersCount}</span>
            <span className="text-sm text-gray-600">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{followingCount}</span>
            <span className="text-sm text-gray-600">Following</span>
          </div>
        </div>
        <nav className="mt-8 w-full flex flex-col gap-4">
          <hr class="h-px my-1` text-emerald-500"></hr>
          <div className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white">
            <img src={feedIcon} alt="Feed" className="w-6 h-6" />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white">
            <img src={profileIcon} alt="Profile" className="w-6 h-6" />
            <span>My Profile</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white">
            <img
              src={notificationIcon}
              alt="Notifications"
              className="w-6 h-6 hover:fill-current hover:text-white"
            />
            <span>Notifications</span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Leftsidebar;
