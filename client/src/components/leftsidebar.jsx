import React, { useState, useEffect } from "react";
import useUserStore from "../stores/userStore";
import numeral from "numeral";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import useChatStore from "../stores/chatStore";
import useProfileStore from "../stores/profileStore";
import useNotificationStore from "../stores/notificationStore";

const Leftsidebar = ({ isOpen }) => {
  const { username: activeProfileUsername } = useParams();
  const navigate = useNavigate();

  // States
  const profile = useUserStore((state) => state.profile);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  const postsCount = useUserStore((state) => state.postsCount);
  const followingCount = useUserStore((state) => state.followingCount);
  const followersCount = useUserStore((state) => state.followersCount);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMessagePage = location.pathname === "/inbox";
  const isProfilePage = location.pathname.includes("/profile");

  const notificationsCount = useNotificationStore(
    (state) => state.notificationsCount
  );

  const unreadMessagesCount = useChatStore(
    (state) => state.unreadMessagesCount
  );

  // Profile store
  const setProfileInitialLoad = useProfileStore(
    (state) => state.setProfileInitialLoad
  );
  const defaultProfileImages = useProfileStore(
    (state) => state.defaultProfileImages
  );

  useEffect(() => {
    setProfileInitialLoad(true);
  }, [activeProfileUsername]);

  // Format the number
  const formatNumber = (count) => {
    return count > 1000
      ? numeral(count).format("0.0a")
      : numeral(count).format("0a");
  };

  return (
    <div className="flex flex-col h-full p-6">
      {isProfilePage &&
      activeProfileUsername === loggedInUser.username ? null : (
        <>
          <div className="flex items-center h-28 gap-4 mb-4">
            <img
              onClick={() => {
                navigate(`/profile/${loggedInUser.username}`);
              }}
              src={
                profile.profile_picture
                  ? `http://localhost:3000/${profile.profile_picture}`
                  : defaultProfileImages.profile
              }
              alt="User"
              className="w-16 h-16 rounded-full object-cover flex-shrink-0 cursor-pointer"
            />
            <div className="flex flex-col">
              <span
                onClick={() => {
                  navigate(`/profile/${loggedInUser.username}`);
                }}
                className="username text-xl font-semibold cursor-pointer"
              >
                {`${loggedInUser.first_name} ${loggedInUser.last_name}`}
              </span>
              <span
                onClick={() => {
                  navigate(`/profile/${loggedInUser.username}`);
                }}
                className="username text-sm cursor-pointer"
              >
                {`@${loggedInUser.username}`}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4 w-full">
            <div className="flex flex-col items-center">
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

      <nav className="flex flex-col gap-4">
        <p className="text-slate-500 font-bold">Menu</p>
        <Link to="/">
          <div
            className={`flex items-center gap-4 px-4 py-2 rounded-lg w-full 
            ${
              isHomePage
                ? "bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white"
                : "hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white"
            }`}
          >
            <i alt="Feed" className="bx bxs-home-heart text-xl"></i>
            <span className="text-xl">Home</span>
          </div>
        </Link>
        <Link to={`/profile/${loggedInUser.username}`}>
          <div
            className={`flex items-center gap-4 px-4 py-2 rounded-lg w-full
            ${
              isProfilePage && activeProfileUsername === loggedInUser.username
                ? "bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white"
                : "hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white"
            }`}
          >
            <i alt="Feed" className="bx bx-user text-xl"></i>
            <span className="text-xl">My Profile</span>
          </div>
        </Link>
        <Link to="/following">
          <div
            className={`flex items-center gap-4 px-4 py-2 rounded-lg w-full
            ${
              location.pathname === "/following"
                ? "bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white"
                : "hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white"
            }`}
          >
            <i alt="Feed" className="bx bx-group text-xl"></i>
            <span className="text-xl">Following</span>
          </div>
        </Link>
        <Link to="/notifications">
          <div
            className={`flex justify-between gap-4 px-4 py-2 rounded-lg w-full
            ${
              location.pathname === "/notifications"
                ? "bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white"
                : "hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <i alt="Feed" className="bx bx-notification text-xl"></i>
              <span className="text-xl">Notifications</span>
            </div>
            <span className="text-xl font-semibold">
              {notificationsCount ? notificationsCount : ""}
            </span>
          </div>
        </Link>
        <Link to="/inbox">
          <div
            className={`flex items-center justify-between px-4 py-2 rounded-lg w-full
            ${
              isMessagePage
                ? "bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white"
                : "hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <i alt="Feed" className="bx bx-message-dots text-xl"></i>
              <span className="text-xl">Messages</span>
            </div>
            <span className="text-xl font-semibold">
              {unreadMessagesCount ? unreadMessagesCount : ""}
            </span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Leftsidebar;
