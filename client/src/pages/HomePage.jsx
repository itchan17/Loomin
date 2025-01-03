import React, { useState } from "react";
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Header from "../components/header";
import RightSideBar from "../components/rightsidebar";
import Timeline from "../components/timeline";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 h-screen overflow-hidden">
          <LeftSidebar isOpen={isSidebarOpen} />
          <main className="w-2/4 overflow-auto bg-gray-200">
            <Timeline />
          </main>
          <RightSideBar />
        </div>
      </div>
    </>
  );
};

export default HomePage;
