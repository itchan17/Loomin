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
        <Header></Header>
        <div className="flex flex-1 h-screen overflow-hidden">
          <LeftSidebar/>
          <main className="flex-auto overflow-auto bg-loomin-white">
          <Timeline/>
          </main>
          <RightSideBar/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
