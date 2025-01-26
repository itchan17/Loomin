import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useUserStore from '../stores/UserStore';

const BottomNav = () => {
  const location = useLocation();
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 xl:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link to="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
          <i className={`bx bxs-home-heart text-2xl ${location.pathname === '/' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">Home</span>
        </Link>
        <Link to={`/profile/${loggedInUser?.username}`} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
          <i className={`bx bx-user text-2xl ${location.pathname.includes('/profile') ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">Profile</span>
        </Link>
        <Link to="/following" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
          <i className={`bx bx-group text-2xl ${location.pathname === '/following' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">Following</span>
        </Link>
        <Link to="/inbox" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
          <i className={`bx bx-message-dots text-2xl ${location.pathname === '/inbox' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">Messages</span>
        </Link>
        <Link to="/notifications" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
          <i className={`bx bx-notification text-2xl ${location.pathname === '/notifications' ? 'text-loomin-orange' : 'text-gray-500'}`}></i>
          <span className="text-xs md:text-sm text-gray-500 group-hover:text-loomin-orange">Alerts</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav; 