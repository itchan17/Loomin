import React, { useState, useEffect } from 'react';
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Header from "../components/header";
import Inbox from '../components/inbox';



const Messages = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <Header toggleSidebar={toggleSidebar} />
            <div className="flex flex-1 h-screen overflow-hidden">
                <LeftSidebar isOpen={isSidebarOpen} />
                <main className="w-4/12 overflow-auto bg-gray-200">
                <Inbox></Inbox>
                   
                </main>
            </div>
        </div>
    );

}

export default Messages;