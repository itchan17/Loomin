import React, { useState, useEffect } from 'react';
import "../Global.css";
import { Link } from "react-router-dom";
import kachow from "../assets/kachow.png";
import charizard from "../assets/charizard.png";
import user from "../assets/user.png";



const Inbox = () => {

    return (
        <div className="w-full border-r border-gray-200 h-full shadow-inner">
            <div className="grid grid-cols-3">
                <h1 className="col-span-2 text-2xl font-bold pt-10 pl-6 text-slate-800">Messages</h1>
                <button className="col-start-3 pt-10 ml-auto pr-6 font-2xl">
                    <i className="bx bxs-edit hover:text-loomin-yellow"></i>
                </button>
            </div>
            <div className="w-full mr-auto items-center justify-center ">
                <div className="relative flex w-full ml-5 pt-4 items-center">
                    <input
                        type="text"
                        placeholder="What's up?"
                        className="pl-8 pr-4 py-2 rounded-xl bg-white/80 focus:outline-none w-11/12 border border-slate-200 shadow-inner"
                    />
                    <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/6 text-gray-400"></i>
                </div>
            </div>

            <div className="mt-6 h-full overflow-y-auto">
                <div className="space-y-2 border-y px-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4 p-4 rounded-lg cursor-pointer">
                        <div className="flex-shrink-0">
                            <img className="h-12 w-12 rounded-full" src={kachow} alt="User avatar" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                Lightning McQueen
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                                Kachoww
                            </p>
                        </div>
                        <div className="text-xs text-gray-400">
                            2h ago
                        </div>
                    </div>
                </div>
                <div className="space-y-2 px-4 border-y hover:bg-gray-50">
                    <div className="flex items-center space-x-4 p-4 rounded-lg cursor-pointer">
                        <div className="flex-shrink-0">
                            <img className="h-12 w-12 rounded-full" src={charizard} alt="User avatar" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                Charizard
                            </p>
                            <p className="text-sm text-gray-500 truncate ">
                                Test1
                            </p>
                        </div>
                        <div className="text-xs text-gray-400">
                            2h ago
                        </div>
                    </div>
                </div>
                <div className="space-y-2 px-4 border-y hover:bg-gray-50">
                    <div className="flex items-center space-x-4 p-4 rounded-lg cursor-pointer">
                        <div className="flex-shrink-0">
                            <img className="h-12 w-12 rounded-full" src={user} alt="User avatar" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                User
                            </p>
                            <p className="text-sm text-gray-500 truncate ">
                                chat
                            </p>
                        </div>
                        <div className="text-xs text-gray-400">
                            10 minutes ago
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inbox;
