import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/leftsidebar";
import RightSidebar from "../components/rightsidebar";
import Header from "../components/header";
import moment from "moment";
import { Link } from "react-router-dom";
import useUserStore from "../stores/userStore";
import useNotificationStore from "../stores/notificationStore";
import Notification from "../components/Notification";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";

const NotificationPage = () => {
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const fetchLoggedInUser = useUserStore((state) => state.fetchLoggedInUser);
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);

  // Notification store
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );
  const notifications = useNotificationStore((state) => state.notifications);
  const clearAllNotifications = useNotificationStore(
    (state) => state.clearAllNotifications
  );
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );

  // Chat store
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const activeChat = useChatStore((state) => state.activeChat);

  // Socket store
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    fetchNotifications();
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (!socket || !loggedInUser?._id) return;
    socket.emit("addUser", loggedInUser._id);

    const handleGetOnlineUsers = (res) => {
      console.log(res);
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

  const displayNotifications = () => {
    return notifications.map(
      (
        notification // Added return and changed {} to ()
      ) => <Notification notification={notification}></Notification>
    ); // Removed extra semicolon
  };

  const handleClearAllNotifications = () => {
    clearAllNotifications();
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />
      <div className="flex flex-1 bg-white overflow-hidden">
        {/* Left Sidebar - Hidden on mobile/tablet */}
        <div className="hidden xl:block w-[320px]">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 border-x border-gray-200 flex flex-col">
          {/* Fixed Header Section */}
          <div className="flex-none border-b border-gray-200">
            <div className="px-2 sm:px-6 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
                <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                  <span className="text-base">You have</span>
                  <span className="text-[#FF6F61] font-medium">
                    {notifications ? notifications.length : "0"} Notifications
                  </span>
                </div>
              </div>

              <button
                onClick={handleClearAllNotifications}
                className="px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white rounded-full hover:opacity-90 transition md:w-auto"
              >
                <span className="text-sm sm:text-base font-bold">Clear all</span>
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-gray-200">
              {notifications && displayNotifications()}

              {notifications?.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] bg-opacity-10 rounded-full mx-auto flex items-center justify-center mb-4">
                    <i className="bx bx-bell text-3xl bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] bg-clip-text text-transparent"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No notifications yet
                  </h3>
                  <p className="text-gray-500">
                    We'll notify you when something arrives!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden 2xl:block w-[320px]">
          <RightSidebar />
        </div>
      </div>

      {/* Bottom Navigation */}
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

export default NotificationPage;
