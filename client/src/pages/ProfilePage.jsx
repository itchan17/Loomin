import React, { useState, useEffect } from "react";
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Header from "../components/header";
import Profile from "../components/profile";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";
import useProfileStore from "../stores/profileStore";
import { useParams } from "react-router-dom";

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
    <>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header />
        <div className="flex flex-1 h-screen overflow-hidden">
          <LeftSidebar />
          <Profile />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
