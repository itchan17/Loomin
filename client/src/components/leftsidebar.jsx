import React, { useState, useEffect } from "react";
import userImage from "../assets/shrek.jpg";
import feedIcon from "../assets/home.svg";
import profileIcon from "../assets/userIcon.svg";
import notificationIcon from "../assets/notification.svg";
import userStore from "../stores/userStore";
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Leftsidebar = ({ isOpen }) => {
  const store = userStore();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMessagePage = location.pathname === '/messages';
  const isComingSoon = location.pathname === './comingsoon'


  useEffect(() => {
    store.fetchLoggedInUser();
  }, []);


  return (
    <aside
      id="sidebar"
      className={`w-1/4 bg-loomin-white shadow-inner h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
    >
      <div className="flex flex-col items-center p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={store.loggedInUser.profile_picture || userImage}
            alt="User"
            className="w-24 h-24 rounded-full"
          />
          <span className="username">{store.loggedInUserName}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 w-full">
          <div className=" flex flex-col items-center">
            <span className="font-bold text-lg">{store.postsCount}</span>
            <span className="text-sm text-gray-600">Looms</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{store.followersCount}</span>
            <span className="text-sm text-gray-600">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{store.followingCount}</span>
            <span className="text-sm text-gray-600">Following</span>
          </div>
        </div>

        <nav className="mt-8 w-full flex flex-col gap-4">
          <hr class="h-px my-1` text-emerald-500"></hr>
          <p className="text-slate-500 font-bold">Menu</p>
          <Link to ='/'>
          <div className={`flex items-center gap-4 px-4 py-2 rounded-lg 
          ${isHomePage
            ? 'bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white'
            : 'hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white'
            }`}>
            <i alt="Feed" className="bx bxs-home-heart text-xl"></i>
           <span className="ml-1 text-xl mb-1">Home</span>
          </div>
          </Link>
          <Link to="/comingsoon">
          <div className={`flex items-center gap-4 px-4 py-2 rounded-lg 
          ${isComingSoon //pa-add nalang ng new const pag meron ng page to 
              ? 'bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white'
              : 'hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white'
            }`}>
            <i alt="Feed" className="bx bx-user text-xl"></i>
            <span className="ml-1 text-xl mb-1">My Profile</span>
          </div>
          </Link>
          <Link to="/comingsoon">
          <div className={`flex items-center gap-4 px-4 py-2 rounded-lg 
          ${isComingSoon //pa-add nalang ng new const pag meron ng page to 
            ? 'bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white'
            : 'hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white'
            }`}>
            <i alt="Feed" className="bx bx-notification text-xl"></i>
            <span className="ml-1 text-xl mb-1">Notifications</span>
          </div>
          </Link>
          <Link to ="/messages">
          <div className={`flex items-center gap-4 px-4 py-2 rounded-lg 
          ${isMessagePage 
            ? 'bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] text-white'
            : 'hover:bg-gradient-to-r hover:from-[#FFD23F] hover:to-[#FF6F61] hover:text-white'
            }`}>
            <i alt="Feed" className="bx bx-message-dots text-xl"></i>
            <span className="ml-1 text-xl mb-1">Messages</span>
          </div>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Leftsidebar;
