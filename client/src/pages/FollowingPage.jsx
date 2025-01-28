import React, { useState, useEffect } from "react";
import LeftSidebar from "../components/leftsidebar";
import RightSidebar from "../components/rightsidebar";
import Header from "../components/header";
import BottomNav from "../components/BottomNav";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../stores/UserStore";
import useNotificationStore from "../stores/notificationStore";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";

const FollowingPage = () => {
  const [activeTab, setActiveTab] = useState("following");
  const [searchQuery, setSearchQuery] = useState("");

  // User store
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const fetchLoggedInUser = useUserStore((state) => state.fetchLoggedInUser);

  // Socket store
  const socket = useSocketStore((state) => state.socket);

  // Notif store
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );

  // Chat store
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const activeChat = useChatStore((state) => state.activeChat);

  // Fetch the data of logged in user
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

  // Dummy data for following/followers
  const dummyUsers = [
    {
      _id: "1",
      username: "johndoe",
      first_name: "John",
      last_name: "Doe",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: true,
    },
    {
      _id: "2",
      username: "janedoe",
      first_name: "Jane",
      last_name: "Doe",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    {
      _id: "3",
      username: "mama",
      first_name: "mo",
      last_name: "hatdog",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    {
      _id: "4",
      username: "mama",
      first_name: "mo",
      last_name: "hatdog",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    {
      _id: "5",
      username: "mama",
      first_name: "mo",
      last_name: "hatdog",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    {
      _id: "6",
      username: "mama",
      first_name: "mo",
      last_name: "hatdog",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    {
      _id: "7",
      username: "mama",
      first_name: "mo",
      last_name: "hatdog",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    {
      _id: "8",
      username: "mama",
      first_name: "mo",
      last_name: "hatdog",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    {
      _id: "9",
      username: "mama",
      first_name: "mo",
      last_name: "hatdog",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    {
      _id: "10",
      username: "mama",
      first_name: "mo",
      last_name: "hatdog",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    {
      _id: "11",
      username: "mama",
      first_name: "mo",
      last_name: "hatdog",
      profile_picture:
        "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
      isFollowing: false,
    },
    // Add more dummy users as needed
  ];

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />
      <div className="flex min-h-screen bg-white ">
        {/* Left Sidebar */}
        <div className="hidden md:block w-[320px]">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 border-x border-gray-200">
          {/* Page Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === "following" ? "Following" : "Followers"}
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "following"
                  ? "text-[#FF6F61] border-b-2 border-[#FF6F61]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Following
            </button>
            <button
              onClick={() => setActiveTab("followers")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "followers"
                  ? "text-[#FF6F61] border-b-2 border-[#FF6F61]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Followers
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:border-[#FF6F61] pl-10"
              />
              <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-4 h-full overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-lg transition-shadow w-full sm:max-w-[240px] mx-auto"
              >
                {/* User Card Header */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={user.profile_picture}
                    alt=""
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                  <Link
                    to={`/profile/${user.username}`}
                    className="font-medium text-gray-900 hover:underline"
                  >
                    {user.first_name} {user.last_name}
                  </Link>
                  <p className="text-sm text-gray-500 mb-4">@{user.username}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  {activeTab === "following" ? (
                    <>
                      <Link
                        to={`/profile/${user.username}`}
                        className="w-full px-4 py-2 rounded-full bg-[#FF6F61] text-white font-medium text-center hover:bg-[#ff5c4d] transition-colors"
                      >
                        View Profile
                      </Link>
                      <button className="w-full px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors">
                        Unfollow
                      </button>
                    </>
                  ) : (
                    <button
                      className={`w-full px-4 py-2 rounded-full font-medium transition-colors
                        ${
                          user.isFollowing
                            ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
                            : "bg-[#FF6F61] text-white hover:bg-[#ff5c4d]"
                        }`}
                    >
                      {user.isFollowing ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default FollowingPage;
