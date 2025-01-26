import React, { useState, useEffect } from "react";
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Header from "../components/header";
import Profile from "../components/profile";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";
import useProfileStore from "../stores/profileStore";
import { useParams, Link } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();

  // User store
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const fetchLoggedInUser = useUserStore((state) => state.fetchLoggedInUser);

  // Chat store
  const activeChat = useChatStore((state) => state.activeChat);
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const getCountUnreadMessages = useChatStore(
    (state) => state.getCountUnreadMessages
  );

  // Profile store
  const fetchUserProfileData = useProfileStore(
    (state) => state.fetchUserProfileData
  );

  // Socket store
  const socket = useSocketStore((state) => state.socket);

  // Fetch the data of logged in user
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  // Fetch the data user with the username in the params
  useEffect(() => {
    fetchUserProfileData(username);
  }, [username]);

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
            <Profile />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
          <Link to="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className="bx bxs-home-heart text-2xl text-gray-500 group-hover:text-loomin-orange"></i>
            <span className="text-xs text-gray-500 group-hover:text-loomin-orange">Home</span>
          </Link>
          <Link to={`/profile/${loggedInUser?.username}`} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className="bx bx-user text-2xl text-loomin-orange"></i>
            <span className="text-xs text-loomin-orange">Profile</span>
          </Link>
          <Link to="/inbox" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className="bx bx-message-dots text-2xl text-gray-500 group-hover:text-loomin-orange"></i>
            <span className="text-xs text-gray-500 group-hover:text-loomin-orange">Messages</span>
          </Link>
          <Link to="/comingsoon" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <i className="bx bx-notification text-2xl text-gray-500 group-hover:text-loomin-orange"></i>
            <span className="text-xs text-gray-500 group-hover:text-loomin-orange">Notifications</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
