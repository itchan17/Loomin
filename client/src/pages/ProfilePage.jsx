import React, { useState, useEffect } from "react";
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Header from "../components/header";
import Profile from "../components/profile";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";
import useProfileStore from "../stores/profileStore";
import { useParams, Link, useLocation } from "react-router-dom";
import useNotificationStore from "../stores/notificationStore";

const ProfilePage = () => {
  const { username } = useParams();
  const location = useLocation();

  // User store
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const fetchLoggedInUser = useUserStore((state) => state.fetchLoggedInUser);
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);

  // Chat store
  const activeChat = useChatStore((state) => state.activeChat);
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const getCountUnreadMessages = useChatStore(
    (state) => state.getCountUnreadMessages
  );

  // Profile store
  const fetchUserProfileData = useProfileStore(
    (state) => state.fetchUserProfileData
  );

  //Notif store
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );

  // Socket store
  const socket = useSocketStore((state) => state.socket);

  // Fetch the data of logged in user
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  // Fetch the data user with the username in the params
  useEffect(() => {
    fetchUserProfileData(username);
  }, [username]);

  useEffect(() => {
    if (!socket || !loggedInUser?._id) return;
    socket.emit("addUser", loggedInUser._id);
    const handleGetOnlineUsers = (res) => {
      setOnlineUsers(res);
    };
    socket.on("getOnlineUsers", handleGetOnlineUsers);
    return () => {
      socket.off("getOnlineUsers", handleGetOnlineUsers);
    };
  }, [socket, loggedInUser?._id]);

  // Add new message notif if the user has no active chat
  useEffect(() => {
    if (!socket || !loggedInUser?._id) return;

    socket.on("getMessage", (message) => {
      console.log("Getting New Message Notif");
      if (activeChat === null) {
        console.log(message);
        setNewMessageNotif(message);
      }
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, activeChat]);

  // Realtime notif
  useEffect(() => {
    if (!socket || !loggedInUser?._id) return;
    socket.on("getNotif", (notif) => {
      console.log(notif);
      setNotifications(notif);
    });

    return () => {
      socket.off("getNotif");
    };
  }, [socket]);

  // Fetch the count of unread messages if the component is rendered
  useEffect(() => {
    getCountUnreadMessages();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Hidden on mobile and tablet */}
        <aside className="hidden 2xl:block w-[320px] min-w-[320px] bg-loomin-white shadow-inner h-screen transition-transform border-r border-gray-200">
          <LeftSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="w-full mx-auto">
            <Profile />
          </div>
        </main>
      </div>

      {/* Mobile and Tablet Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 xl:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link
            to="/"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <i
              className={`bx bxs-home-heart text-2xl ${
                location.pathname === "/"
                  ? "text-loomin-orange"
                  : "text-gray-500"
              }`}
            ></i>
            <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">
              Home
            </span>
          </Link>
          <Link
            to={`/profile/${loggedInUser?.username}`}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <i
              className={`bx bx-user text-2xl ${
                location.pathname.includes("/profile")
                  ? "text-loomin-orange"
                  : "text-gray-500"
              }`}
            ></i>
            <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">
              Profile
            </span>
          </Link>
          <Link
            to="/following"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <i
              className={`bx bx-group text-2xl ${
                location.pathname === "/following"
                  ? "text-loomin-orange"
                  : "text-gray-500"
              }`}
            ></i>
            <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">
              Following
            </span>
          </Link>
          <Link
            to="/inbox"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <i
              className={`bx bx-message-dots text-2xl ${
                location.pathname === "/inbox"
                  ? "text-loomin-orange"
                  : "text-gray-500"
              }`}
            ></i>
            <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">
              Messages
            </span>
          </Link>
          <Link
            to="/notifications"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <i
              className={`bx bx-notification text-2xl ${
                location.pathname === "/notifications"
                  ? "text-loomin-orange"
                  : "text-gray-500"
              }`}
            ></i>
            <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">
              Alerts
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
