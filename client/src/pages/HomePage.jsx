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

const HomePage = () => {
  const location = useLocation();
  // State functions
  const fetchLoggedInUser = useUserStore((state) => state.fetchLoggedInUser);
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const activeChat = useChatStore((state) => state.activeChat);
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const getCountUnreadMessages = useChatStore((state) => state.getCountUnreadMessages);
  const socket = useSocketStore((state) => state.socket);

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

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />
      
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-[320px] min-w-[320px] bg-loomin-white shadow-inner h-screen transition-transform border-r border-gray-200">
          <LeftSidebar />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="w-full md:max-w-[650px] mx-auto px-0 md:px-4 pb-20 md:pb-4">
            <Timeline />
          </div>
        </main>
        
        {/* Right Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-[320px] min-w-[320px] bg-loomin-white shadow-inner h-screen transition-transform border-l border-gray-200">
          <RightSideBar />
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
          <Link to="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className={`bx bxs-home-heart text-2xl ${location.pathname === '/' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
            <span className="text-xs text-gray-500 group-hover:text-loomin-orange">Home</span>
          </Link>
          <Link to={`/profile/${loggedInUser?.username}`} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className={`bx bx-user text-2xl ${location.pathname.includes('/profile') ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
            <span className="text-xs text-gray-500 group-hover:text-loomin-orange">Profile</span>
          </Link>
          <Link to="/inbox" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className={`bx bx-message-dots text-2xl ${location.pathname === '/inbox' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
            <span className="text-xs text-gray-500 group-hover:text-loomin-orange">Messages</span>
          </Link>
          <Link to="/comingsoon" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className={`bx bx-notification text-2xl ${location.pathname === '/comingsoon' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
            <span className="text-xs text-gray-500 group-hover:text-loomin-orange">Notifications</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
