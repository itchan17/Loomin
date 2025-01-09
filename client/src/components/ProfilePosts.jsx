import React from 'react';
import userIcon from "../assets/user.png";
import 'boxicons';

const ProfilePosts = () => {
    return (
        <div className="flex gap-8 bg-[#D9D9D9]">
            {/* Left side - Details */}
            <div className="w-1/3">
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">Details</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <i className='bx bx-map text-gray-500 text-xl'></i>
                            <span className="text-gray-600">Amsterdam, Netherlands</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className='bx bx-book text-gray-500 text-xl'></i>
                            <span className="text-gray-600">University of Amsterdam</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className='bx bx-briefcase text-gray-500 text-xl'></i>
                            <span className="text-gray-600">Fishball Chef</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className='bx bx-calendar text-gray-500 text-xl'></i>
                            <span className="text-gray-600">January 17, 1999</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Posts */}
            <div className="flex-1">
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <div className="flex items-center gap-3">
                        <img src={userIcon} alt="User" className="w-10 h-10 rounded-full" />
                        <input 
                            type="text"
                            placeholder="What's on your mind? Share your thoughts, moments, or creativity with the world!"
                            className="w-full p-2 bg-gray-100 rounded-lg"
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button className="flex items-center gap-2 text-gray-500">
                            <i className='bx bx-image-alt text-xl'></i>
                            Photo
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3">
                                <img src={userIcon} alt="User" className="w-10 h-10 rounded-full" />
                                <div>
                                    <h3 className="font-semibold">Lucas Blair</h3>
                                    <p className="text-gray-500 text-sm">@BlairBound</p>
                                </div>
                            </div>
                            <button className="text-gray-500">•••</button>
                        </div>
                        <p className="text-gray-800 mb-4">Sample post content here...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePosts;