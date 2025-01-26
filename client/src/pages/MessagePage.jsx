import React, { useState, useEffect } from "react";
import LeftSidebar from "../components/leftsidebar";
import Inbox from "../components/Inbox";
import Header from "../components/header";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";

const MessagePage = () => {
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

    // Emit "addUser" when the socket or user ID changes
    socket.emit("addUser", loggedInUser._id);

    const handleGetOnlineUsers = (res) => {
      console.log(res);
      setOnlineUsers(res);
    };

    // Attach listener
    socket.on("getOnlineUsers", handleGetOnlineUsers);

    // Cleanup function to remove the listener
    return () => {
      socket.off("getOnlineUsers", handleGetOnlineUsers);
    };
  }, [socket, loggedInUser?._id]);

  // Add new message notif if the user has no active chat
  useEffect(() => {
    if (!socket || !loggedInUser?._id) return;

    // Add the event listener
    socket.on("getMessage", (message) => {
      console.log("Getting New Message Notif");
      if (activeChat === null) {
        console.log(message);
        setNewMessageNotif(message);
      }
    });

    // Cleanup function to remove the event listener
    return () => {
      socket.off("getMessage");
    };
  }, [socket, activeChat]);

  // Fetch the count of unread messages if the component is rendered
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
          <div className="w-full mx-auto">
            <Inbox />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MessagePage;
