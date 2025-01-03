import React, { useState } from "react";
import LeftSidebar from "../components/leftsidebar";
import Inbox from "../components/Inbox";
import Header from "../components/header";

const MessagePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full">
      <Header/>
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar/>
        <Inbox />
      </div>
    </div>
  );
};

export default MessagePage;
