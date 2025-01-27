import React, { useState } from 'react';
import LeftSidebar from '../components/leftsidebar';
import RightSidebar from '../components/rightsidebar';
import Header from '../components/header';
import BottomNav from '../components/BottomNav';
import { Link, useLocation } from 'react-router-dom';
import useUserStore from '../stores/UserStore';

const FollowingPage = () => {
  const [activeTab, setActiveTab] = useState('following');
  const [searchQuery, setSearchQuery] = useState('');
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const location = useLocation();

  // Dummy data for following/followers
  const dummyUsers = [
    {
      _id: '1',
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      profile_picture: 'https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg',
      isFollowing: true
    },
    {
      _id: '2',
      username: 'janedoe',
      first_name: 'Jane',
      last_name: 'Doe',
      profile_picture: 'https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg',
      isFollowing: false
    },
    // Add more dummy users as needed
  ];

  const filteredUsers = dummyUsers.filter(user => 
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-white">
        {/* Left Sidebar */}
        <div className="hidden md:block w-[320px]">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 border-x border-gray-200">
          {/* Page Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === 'following' ? 'Following' : 'Followers'}
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'following'
                  ? 'text-[#FF6F61] border-b-2 border-[#FF6F61]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Following
            </button>
            <button
              onClick={() => setActiveTab('followers')}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'followers'
                  ? 'text-[#FF6F61] border-b-2 border-[#FF6F61]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Followers
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:border-[#FF6F61] pl-10"
              />
              <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Users List */}
          <div className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <div key={user._id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={user.profile_picture}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <Link to={`/profile/${user.username}`} className="font-medium text-gray-900 hover:underline">
                      {user.first_name} {user.last_name}
                    </Link>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                <button
                  className={`px-6 py-2 rounded-full border font-medium transition-colors
                    ${user.isFollowing
                      ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
                      : 'border-[#FF6F61] text-[#FF6F61] hover:bg-[#FF6F61] hover:text-white'
                    }`}
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-[320px]">
          <RightSidebar />
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </>
  );
};

export default FollowingPage; 