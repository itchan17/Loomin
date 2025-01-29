import React, { useState, useEffect } from "react";
import LeftSidebar from "../components/leftsidebar";
import RightSidebar from "../components/rightsidebar";
import Header from "../components/header";
import BottomNav from "../components/BottomNav";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../stores/userStore";
import useNotificationStore from "../stores/notificationStore";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";
import Following from "../components/Following";
import Followers from "../components/Followers";

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
      <div className="flex flex-1 bg-white overflow-hidden">
        {/* Left Sidebar */}
        <div className="hidden md:block w-[320px]">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 border-x border-gray-200 flex flex-col">

          {/* Fixed Header Section */}
          <div className="flex-none">
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


          {/* Following / Followers Component */}
          {activeTab === "following" ? (
            <Following></Following>
          ) : (
            <Followers></Followers>
          )}

        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default FollowingPage;
