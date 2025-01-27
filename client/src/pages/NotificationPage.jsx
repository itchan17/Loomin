import React from "react";
import LeftSidebar from "../components/leftsidebar";
import RightSidebar from "../components/rightsidebar";
import Header from "../components/header";
import moment from "moment";
import { Link } from "react-router-dom";
import kachow from "../assets/kachow.png";
import shrek from "../assets/shrek.jpg";
import useUserStore from "../stores/userStore";

const NotificationPage = () => {
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  const notifications = [
    {
      _id: "1",
      type: "follow",
      sender: {
        first_name: "Mama",
        last_name: "Mo",
        profile_picture: kachow,
      },
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      _id: "2",
      type: "follow",
      sender: {
        first_name: "Ha",
        last_name: "Hatdog",
        profile_picture: shrek,
      },
      read: false,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    },
    {
      _id: "3",
      type: "post",
      sender: {
        first_name: "Keng",
        last_name: "Koy",
        profile_picture: kachow,
      },
      postId: "",
      read: false,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    },
  ];

  const renderNotificationContent = (notification) => {
    switch (notification.type) {
      case "follow":
        return (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={notification.sender?.profile_picture}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] rounded-full flex items-center justify-center">
                  <i className="bx bx-user-plus text-white text-sm"></i>
                </div>
              </div>
              <div>
                <p className="font-medium">
                  <span className="font-semibold text-gray-900">
                    {notification.sender?.first_name}{" "}
                    {notification.sender?.last_name}
                  </span>{" "}
                  wants to follow you
                </p>
                <p className="text-sm text-gray-500">
                  {moment(notification.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white rounded-full hover:opacity-90 transition md:w-auto">
                <span className="hidden md:inline">Accept</span>
                <i className="bx bx-check text-xl md:hidden"></i>
              </button>
              <button className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition md:w-auto">
                <span className="hidden md:inline">Decline</span>
                <i className="bx bx-x text-xl md:hidden"></i>
              </button>
            </div>
          </div>
        );
      case "post":
        return (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={notification.sender?.profile_picture}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] rounded-full flex items-center justify-center">
                  <i className="bx bx-image text-white text-sm"></i>
                </div>
              </div>
              <div>
                <p className="font-medium">
                  <span className="font-semibold text-gray-900">
                    {notification.sender?.first_name}{" "}
                    {notification.sender?.last_name}
                  </span>{" "}
                  posted new pictures
                </p>
                <p className="text-sm text-gray-500">
                  {moment(notification.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <Link
              to={`/post/${notification.postId}`}
              className="px-4 py-1.5 bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white rounded-full hover:opacity-90 transition"
            >
              View
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-white">
        {/* Left Sidebar - Hidden on mobile/tablet */}
        <div className="hidden 2xl:block w-[320px] sticky top-0 h-screen overflow-y-auto">
          <LeftSidebar />
        </div>

        <div className="flex-1 min-w-0 border-x border-gray-200 2xl:border-x pb-16 2xl:pb-0">
          {/* Notification Count */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-base">You have</span>
              <span className="text-[#FF6F61] font-medium">
                {notifications.length} Notifications
              </span>
              <span className="text-base">today.</span>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white">
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`px-6 py-4 hover:bg-gray-50 transition ${
                      !notification.read ? "bg-white bg-opacity-5" : ""
                    }`}
                  >
                    {renderNotificationContent(notification)}
                  </div>
                ))}

                {notifications.length === 0 && (
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
          </main>
        </div>

        {/* Right Sidebar - Hidden on mobile/tablet */}
        <div className="hidden 2xl:block w-[320px] sticky top-0 h-screen overflow-y-auto">
          <RightSidebar />
        </div>

        {/* Mobile Navigation */}
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
    </>
  );
};

export default NotificationPage;
