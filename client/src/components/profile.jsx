import React, { useState } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.png";
import userIcon from "../assets/user.png";
import ProfilePosts from "./ProfilePosts";
import ProfileAbout from "./ProfileAbout";
import EditProfileModal from './EditProfileModal';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('posts');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="flex flex-col w-full h-full bg-loomin-white">
            <div className="flex flex-col items-center px-6 py-0 bg-loomin-white pb-6">
                <div className="relative">
                    <img
                        src={banner}
                        alt="banner"
                        className="rounded-b-xl h-64 w-full object-cover"
                    />
                    <div className="mt-2">
                        <button 
                            onClick={() => setIsEditModalOpen(true)}
                            className="absolute right-0 border border-orange-300 text-sm px-6 py-0.5 h-8 hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange rounded-3xl"
                        >
                            <p className="text-transparent text-base font-semibold bg-clip-text bg-gradient-to-r from-loomin-yellow to-loomin-orange hover:text-white">
                                Edit Profile
                            </p>
                        </button>
                    </div>
                    <div className="flex flex-col-3 ml-16 items-left gap-4 -mt-10">
                        <div className="col-span-2">
                            <img
                                src={userIcon}
                                alt="User"
                                className="w-24 h-24 rounded-full shadow-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-start pt-8 px-3">
                                <div className="flex-col">
                                    <div className="flex items-center gap-4">
                                        <h1 className="text-2xl font-bold text-black">John Doe</h1>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-gray-500 font-semibold text-base">@user1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6 mt-0 px-3">
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="font-bold text-lg">150</span>
                                    <span className="text-gray-500 text-sm">Followers</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="font-bold text-lg">100</span>
                                    <span className="text-gray-500 text-sm">Following</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <hr className="w-full border-t border-gray-400 mb-2" />
                        <div className="flex gap-6 p-4 rounded-t-lg">
                            <button 
                                className={`font-semibold ${activeTab === 'posts' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('posts')}
                            >
                                Posts
                            </button>
                            <button 
                                className={`font-semibold ${activeTab === 'about' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('about')}
                            >
                                About
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />

            <div className="px-6 py-4 bg-[#D9D9D9]">
                {activeTab === 'posts' && <ProfilePosts />}
                {activeTab === 'about' && <ProfileAbout />}
            </div>
        </div>
    );
}

export default Profile;