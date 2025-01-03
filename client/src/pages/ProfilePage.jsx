import React, { useState } from "react";
import "../global.css";
import LeftSidebar from "../components/leftsidebar";
import Header from "../components/header";
import RightSideBar from "../components/rightsidebar";
import Timeline from "../components/timeline";
import Profile from "../components/profile";


const ProfilePage = () => {


    return (
        <>
            <div className="flex flex-col h-full w-full overflow-hidden">
                <Header/>
                <div className="flex flex-1 h-screen">
                    <LeftSidebar/>
                    <main className="flex-auto bg-loomin-white">
                    <Profile/>
                    </main>
                </div>
            </div>
        </>


    );
};

export default ProfilePage;