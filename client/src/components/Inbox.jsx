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
import { Link, useLocation } from "react-router-dom";
import Header from "./header";

const Inbox = () => {
  // Chat states
  const chats = useChatStore((state) => state.chats);
  const chatsLoading = useChatStore((state) => state.chatsLoading);
  const getUserChats = useChatStore((state) => state.getUserChats);
  const activeChat = useChatStore((state) => state.activeChat);
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const newMessageNotif = useChatStore((state) => state.newMessageNotif);
  const sortChats = useChatStore((state) => state.sortChats);
  const inboxSearchTerm = useChatStore((state) => state.inboxSearchTerm);
  const updateSearchField = useChatStore((state) => state.updateSearchField);
  const clearActiveChat = useChatStore((state) => state.clearActiveChat);

  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  // Socket store
  const socket = useSocketStore((state) => state.socket);

  // Local states
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  useEffect(() => {
    getUserChats(loggedInUser._id);
  }, [loggedInUser]);

  useEffect(() => {
    if (newMessageNotif.length !== 0) {
      sortChats(newMessageNotif[newMessageNotif.length - 1].chatId);
    }
  }, [newMessageNotif]);

  useEffect(() => {
    // Show chat view when active chat is set
    if (activeChat) {
      setShowMobileChat(true);
    }
  }, [activeChat]);

  const handleBackToInbox = () => {
    setShowMobileChat(false);
    clearActiveChat();
  };

  // Search functionality with debounce
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

  useEffect(() => {
    debouncedSearch(inboxSearchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [inboxSearchTerm]);

  const displayChats = () => {
    return chats.map((chat) => {
      return <Chat key={chat._id} chat={chat} />;
    });
  };

  const displaySearchResults = () => {
    if (isSearchLoading) return <div>Loading...</div>;
    if (!isSearchLoading && searchResults?.length === 0)
      return <div>No results found.</div>;
    return searchResults?.map((user) => {
      return <SearchResult key={user._id} user={user} />;
    });
  };

  return (
    <div className="flex flex-1 h-full">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Mobile and Tablet Inbox View */}
        <div className={`xl:hidden flex flex-col w-full h-full ${showMobileChat ? 'hidden' : 'flex'}`}>
          <div className="flex flex-col p-4">
            <h1 className="font-bold text-3xl mb-4">Messages</h1>
            <div className="relative flex items-center mb-6">
              <input
                onChange={updateSearchField}
                value={inboxSearchTerm}
                type="text"
                placeholder="Search..."
                className="w-full bg-[#D9D9D9] bg-opacity-40 pl-10 pr-4 py-2 border border-slate-200 shadow-inner rounded-xl bg-white/80 focus:outline-none focus:ring-1 focus:ring-loomin-orange"
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
            {chats && !inboxSearchTerm && displayChats()}
            {inboxSearchTerm && (
              <div>
                <h1 className="font-bold mb-2">Search Results:</h1>
                {displaySearchResults()}
              </div>
            )}
          </div>
        </div>

        {/* Mobile and Tablet Chat View */}
        <div className={`xl:hidden ${showMobileChat ? 'block' : 'hidden'} h-full`}>
          {activeChat ? (
            <ChatBox onBack={handleBackToInbox} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <h1 className="font-bold text-2xl text-center">Select a conversation</h1>
              <p className="font-semibold text-center">
                Choose from your existing conversations or start a new one.
              </p>
            </div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden xl:flex w-full h-full">
          {/* Desktop Inbox List */}
          <div className="w-3/5 border-r border-[#A4A4A4] h-full overflow-y-auto">
            <div className="px-4 py-10">
              <h1 className="font-bold text-3xl mb-4">Messages</h1>
              <div className="relative flex items-center mb-6">
                <input
                  onChange={updateSearchField}
                  value={inboxSearchTerm}
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-[#D9D9D9] bg-opacity-40 pl-10 pr-4 py-2 border border-slate-200 shadow-inner rounded-xl bg-white/80 focus:outline-none focus:ring-1 focus:ring-loomin-orange"
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
              {chats && !inboxSearchTerm && displayChats()}
              {inboxSearchTerm && (
                <div>
                  <h1 className="font-bold mb-2">Search Results:</h1>
                  {displaySearchResults()}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Chat View */}
          <div className="w-2/5 h-full">
            {activeChat ? (
              <ChatBox onBack={null} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-50">
                <h1 className="font-bold text-2xl text-center">Select a conversation</h1>
                <p className="font-semibold text-center">
                  Choose from your existing conversations or start a new one.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inbox;
