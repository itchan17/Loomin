import React, { useState, useEffect } from "react";
import LeftSidebar from "../components/leftsidebar";
import Inbox from "../components/Inbox";
import Header from "../components/header";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";
import { Link, useLocation } from "react-router-dom";

const MessagePage = () => {
  const location = useLocation();
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const fetchLoggedInUser = useUserStore((state) => state.fetchLoggedInUser);

  const activeChat = useChatStore((state) => state.activeChat);
  const clearActiveChat = useChatStore((state) => state.clearActiveChat);
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const getCountUnreadMessages = useChatStore(
    (state) => state.getCountUnreadMessages
  );
  const displayNewChat = useChatStore((state) => state.displayNewChat);
  const chats = useChatStore((state) => state.chats);

  const socket = useSocketStore((state) => state.socket);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchLoggedInUser();

    return () => {
      clearActiveChat();
    };
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

  useEffect(() => {
    getCountUnreadMessages();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />

      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Hidden on mobile and tablet */}
        <aside className="hidden 2xl:block w-[320px] min-w-[320px] bg-loomin-white shadow-inner h-full transition-transform border-r border-gray-200">
          <LeftSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden bg-gray-50 pb-16 2xl:pb-0">
          <Inbox />
        </main>
      </div>

      {/* Mobile and Tablet Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 xl:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link to="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className={`bx bxs-home-heart text-2xl ${location.pathname === '/' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          </Link>
          <Link to={`/profile/${loggedInUser?.username}`} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className={`bx bx-user text-2xl ${location.pathname.includes('/profile') ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          </Link>
          <Link to="/following" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className={`bx bx-group text-2xl ${location.pathname === '/following' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          </Link>
          <Link to="/inbox" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className={`bx bx-message-dots text-2xl ${location.pathname === '/inbox' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          </Link>
          <Link to="/notifications" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className={`bx bx-notification text-2xl ${location.pathname === '/notifications' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
