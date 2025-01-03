import React, { useState } from "react";
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Inbox from "../components/Inbox";
import Header from "../components/header";

const MessagePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex flex-col h-screen w-full">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar isOpen={isSidebarOpen} />
        <Inbox />
      </div>
    </div>
  );
};

export default MessagePage;
