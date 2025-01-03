import React, { useState } from 'react';
import "../global.css";
import user from "../assets/user.png";

const Chatbox = () => {


    return (
        <div className="flex flex-col h-full">
            <div className=" items-center p-4 border-b text-center">
                <div className="items-center flex ml-3 text-center">
                    <h3 className="w-full font-semibold">John Doe</h3>
                    <button><i class='text-xl bx bx-dots-vertical-rounded' ></i></button>
                </div>
                <p className="text-sm text-gray-500">Online</p>
            </div>

            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-start">
                    <img className="w-12 h-12 rounded-full" src={user} alt="User" />
                    <div className="ml-2 bg-gray-100 rounded-2xl p-3 max-w-[50%]">
                        <p className="text-sm ">dadkadajkdhkhjwkkch</p>
                        <span className="text-xs text-gray-500 mt-1">9:40 PM</span>
                    </div>
                </div>


                <div className="flex items-start justify-end">
                    <div className="mr-2 bg-gradient-to-r from-loomin-yellow to-loomin-orange rounded-2xl p-3 min-w-[15%] max-w-[70%]">
                        
                        <p className="text-sm text-white">heheheh</p>
                        
                        <span className="text-xs text-white/80 mt-1">10:21 PM</span>
                    </div>
                </div>
                <div className="flex items-start">
                    <img className="w-12 h-12 rounded-full" src={user} alt="User" />
                    <div className="ml-2 bg-gray-100 rounded-2xl p-3 min-w-[15%] max-w-[70%]">
                        <p className="text-sm">ok done</p>
                        <span className="text-xs text-gray-500 mt-1">10:30 PM</span>
                    </div>
                </div>
            </div>
            

            <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-orange-100 rounded-full">
                        <i className="bx bx-smile text-xl text-gray-500 hover:text-loomin-orange"></i>
                    </button>
                    <button className="p-2 hover:bg-orange-100 rounded-full">
                        <i className="bx bx-image text-xl text-gray-500 hover:text-loomin-orange"></i>
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 p-2 rounded-2xl bg-gray-100 focus:outline-none focus:ring-1 focus:ring-loomin-orange"
                    />
                    <button className="p-2 rounded-full hover:bg-orange-400">
                        <i className="bx bx-send text-xl "></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;