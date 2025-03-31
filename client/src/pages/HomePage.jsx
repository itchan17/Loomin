import React, { useState, useEffect } from "react";
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Header from "../components/header";
import RightSideBar from "../components/rightsidebar";
import Timeline from "../components/timeline";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";
import { Link, useLocation } from "react-router-dom";
import useNotificationStore from "../stores/notificationStore";

const HomePage = () => {
  const location = useLocation();
  // State functions
  const fetchLoggedInUser = useUserStore((state) => state.fetchLoggedInUser);
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const activeChat = useChatStore((state) => state.activeChat);
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const getCountUnreadMessages = useChatStore(
    (state) => state.getCountUnreadMessages
  );

  // Socket store
  const socket = useSocketStore((state) => state.socket);

  // Notification store
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

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

  // Realtime message
  useEffect(() => {
    if (!socket || !loggedInUser?._id) return;
    socket.on("getMessage", (message) => {
      if (activeChat === null) {
        setNewMessageNotif(message);
      }
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, activeChat]);

  useEffect(() => {
    getCountUnreadMessages();
  }, []);

  // Run ealtime notification
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

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />

      <div className="flex flex-1 h-[calc(100vh-4rem)] ">
        <aside className="hidden xl:block w-[320px] min-w-[320px] bg-loomin-white shadow-inner h-full transition-transform border-r border-gray-200">
          <LeftSidebar />
        </aside>

        <main
          id="posts-container"
          className="flex-1 h-screen lg:h-full overflow-y-auto bg-gray-50"
        >
          <div
            className="w-full px-4 pb-20 xl:pb-4 
            md:px-6 xl:px-4"
          >
            <Timeline />
          </div>
        </main>

        <aside className="hidden xl:block w-[320px] min-w-[320px] bg-loomin-white shadow-inner h-full transition-transform overflow-y-auto">
          <RightSideBar />
        </aside>
      </div>

      {/* Mobile and Tablet Bottom Navigation (including iPad Pro portrait) */}
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
