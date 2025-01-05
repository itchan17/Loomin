import React, { useState, useEffect } from "react";
import "../global.css";
import ChatBox from "./ChatBox";
import useChatStore from "../stores/chatStore";
import useUserStore from "../stores/UserStore";
import Chat from "./Chat";
import SearchResult from "./SearchResult";
import useSocketStore from "../stores/socketStore";
import axios from "axios";
import debounce from "lodash.debounce";

const Inbox = () => {
  // Chat states
  const chats = useChatStore((state) => state.chats);
  const chatsLoading = useChatStore((state) => state.chatsLoading);
  const getUserChats = useChatStore((state) => state.getUserChats);
  const activeChat = useChatStore((state) => state.activeChat);
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const newMessageNotif = useChatStore((state) => state.newMessageNotif);
  const sortChats = useChatStore((state) => state.sortChats);

  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  // Socket store
  const socket = useSocketStore((state) => state.socket);

  // Locat state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // If this component get rendered will fetch all the chat created by the user
  useEffect(() => {
    getUserChats(loggedInUser._id);
  }, [loggedInUser]);

  // If there's new message and newMessageNotif get updated, it will sort the chats based on the latest message in the notif
  useEffect(() => {
    if (newMessageNotif.length !== 0) {
      sortChats(newMessageNotif[newMessageNotif.length - 1].chatId);
    }
  }, [newMessageNotif]);

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

  // Search for user with debounce delaying the trigger of request to the server for 300m
  const debouncedSearch = debounce(async (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearchLoading(true);
    try {
      const response = await axios.get(`/users/search?keyword=${term}`);
      setSearchResults(response.data);
      setIsSearchLoading(false);
    } catch (error) {
      console.error("Search error:", error);
    }
  }, 300);

  // Run the debouncedSearch everytime there's a changes in searchTerm
  useEffect(() => {
    debouncedSearch(searchTerm);

    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const displayChats = () => {
    return chats.map((chat) => {
      return <Chat key={chat._id} chat={chat} />;
    });
  };

  const displaySearchResults = () => {
    if (isSearchLoading) return <div>Loading...</div>;
    if (!isSearchLoading && searchResults.length === 0)
      return <div>No results found.</div>;
    return searchResults.map((user) => {
      return <SearchResult key={user._id} user={user} />;
    });
  };

  return (
    <div className="flex flex-row w-full justify-between bg-white">
      {console.log(searchResults)}
      <div className="flex flex-col w-3/5 border-r border-[#A4A4A4] overflow-y-auto px-4 py-10">
        <h1 className="font-bold text-3xl mb-4">Messages</h1>

        <div className="relative hidden md:flex items-center mb-6">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search..."
            className="w-full bg-[#D9D9D9] bg-opacity-40 pl-10 pr-4 py-2 border border-slate-200 shadow-inner rounded-xl bg-white/80 focus:outline-none focus:ring-1 focus:ring-loomin-orange "
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

        {chats && !searchTerm && displayChats()}
        {searchTerm && (
          <div>
            <h1 className="font-bold mb-2">Search Results:</h1>
            {displaySearchResults()}
          </div>
        )}
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
