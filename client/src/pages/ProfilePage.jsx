import React, { useState, useEffect } from "react";
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Header from "../components/header";
import RightSideBar from "../components/rightsidebar";
import Timeline from "../components/timeline";
import Profile from "../components/profile";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";

const ProfilePage = () => {
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  const activeChat = useChatStore((state) => state.activeChat);
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);
  const getCountUnreadMessages = useChatStore(
    (state) => state.getCountUnreadMessages
  );

  const socket = useSocketStore((state) => state.socket);

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
    <>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <Header />
        <div className="flex flex-1 h-screen">
          <LeftSidebar />
          <main className="flex-auto bg-loomin-white">
            <Profile />
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
