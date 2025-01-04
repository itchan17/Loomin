import React, { useState, useEffect } from "react";
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Header from "../components/header";
import RightSideBar from "../components/rightsidebar";
import Timeline from "../components/timeline";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";

const HomePage = () => {
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  const socket = useSocketStore((state) => state.socket);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header />
        <div className="flex flex-1 h-screen overflow-hidden">
          <LeftSidebar />
          <Timeline />
          <RightSideBar />
        </div>
      </div>
    </>
  );
};

export default HomePage;
