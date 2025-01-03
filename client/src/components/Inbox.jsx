import React, { useState, useEffect } from "react";
import "../global.css";
import ChatBox from "./ChatBox";
import useChatStore from "../stores/chatStore";
import useUserStore from "../stores/UserStore";
import Chat from "./Chat";
import { io } from "socket.io-client";

const Inbox = () => {
  const [socket, setSocket] = useState(null);

  // Chat states
  const chats = useChatStore((state) => state.chats);
  const chatsLoading = useChatStore((state) => state.chatsLoading);
  const getUserChats = useChatStore((state) => state.getUserChats);
  const activeChat = useChatStore((state) => state.activeChat);
  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    console.log(loggedInUser._id);
    if (socket === null) return;
    if (socket && loggedInUser._id) {
      socket.emit("addUser", loggedInUser._id);
      socket.on("getOnlineUsers", (res) => {
        console.log(res);
      });
    }
  }, [socket, loggedInUser]);

  useEffect(() => {
    getUserChats(loggedInUser._id);
  }, [loggedInUser]);

  const displayChats = () => {
    return chats.map((chat) => {
      return <Chat key={chat._id} chat={chat} />;
    });
  };

  return (
    <div className="flex flex-row w-full justify-between bg-white">
      <div className="flex flex-col w-3/5 border-r border-[#A4A4A4] overflow-y-auto px-4 py-10">
        <h1 className="font-bold text-3xl mb-4">Messages</h1>

        <div className="relative hidden md:flex items-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#D9D9D9] bg-opacity-40 pl-10 pr-4 py-2 border border-black rounded-xl bg-white/80 focus:outline-none focus:ring-1 focus:ring-loomin-orange w-64"
          />
          <svg
            className="absolute left-3 w-5 h-5 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {chats && displayChats()}
      </div>

      {activeChat ? (
        <ChatBox></ChatBox>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">Select a conversation</h1>
          <p className="font-semibold">
            Choose from your existing conversations or start a new one.
          </p>
        </div>
      )}
    </div>
  );
};

export default Inbox;
