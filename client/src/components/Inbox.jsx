import React, { useState } from "react";
import "../global.css";
import ChatBox from "./ChatBox";

const Inbox = () => {
  const [activeMessage, setActiveMessage] = useState(null);
  const handleClick = (id) => {
    setActiveMessage(id);
  };
  return (
    <div class="flex flex-row w-full justify-between bg-white shadow-inner">
      <div class="flex flex-col w-3/5 border-r border-[#A4A4A4] overflow-y-auto px-4 py-10">
        <div className="grid grid-cols-3 pb-5">
          <h1 className="col-span-2 text-3xl font-bold pl-2 text-slate-800">Messages</h1>
          <button className=" rounded-full hover:bg-gray-200 text-center col-start-3 ml-auto pr-6 font-2xl">
            <i className=" pl-5 bx bxs-edit text-2xl"></i>
          </button>
        </div>

        <div className="relative hidden md:flex items-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#D9D9D9] bg-opacity-40 pl-10 pr-4 py-2 border border-slate-200 shadow-inner rounded-xl bg-white/80 focus:outline-none focus:ring-1 focus:ring-loomin-orange "
          />
          <svg
            className="absolute left-3 w-5 h-5 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* Messages */}
        <div
          key={1}
          onClick={() => handleClick(1)}
          className={`cursor-pointer flex w-full ${activeMessage === 1
            ? "shadow-[-1px_7px_6px_-2px_#bfbfbf] bg-[#D9D9D9] bg-opacity-40"
            : ""
            } px-2 py-3 gap-4 items-center rounded`}
        >
          {" "}
          <img
            src={
              "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            }
            alt={"Profile"}
            className="w-16 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            {" "}
            {/* Added flex-1 and min-w-0 */}
            <div className="flex justify-between">
              <span className="font-semibold">Aria Collins</span>
              <span className="font-semibold text-sm antialiased text-slate-900 ml-2">10:30 AM</span>{" "}
              {/* Added ml-2 */}
            </div>
            <div className="pr-16">
              <p className="truncate">
                {" "}
                {/* Changed to truncate class */}
                Hey! Found this cute café, let's
                asdasdasdasdasdasdaasdasdasdasdasdsdasdasdcheck..
              </p>
            </div>
          </div>
        </div>

        <div
          key={2}
          onClick={() => handleClick(2)}
          className={`cursor-pointer flex w-full ${activeMessage === 2
            ? "shadow-[-1px_7px_6px_-2px_#bfbfbf] bg-[#D9D9D9] bg-opacity-40"
            : ""
            } px-2 py-3 gap-4 items-center rounded`}
        >
          {" "}
          <img
            src={
              "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            }
            alt={"Profile"}
            className="w-16 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            {" "}
            {/* Added flex-1 and min-w-0 */}
            <div className="flex justify-between">
              <span className="font-semibold">Aria Collins</span>
              <span className="font-semibold text-sm antialiased text-slate-900 ml-2">10:30 AM</span>{" "}
              {/* Added ml-2 */}
            </div>
            <div className="pr-16">
              <p className="truncate">
                {" "}
                {/* Changed to truncate class */}
                Hey! Found this cute café, let's
                asdasdasdasdasdasdaasdasdasdasdasdsdasdasdcheck..
              </p>
            </div>
          </div>
        </div>
        <div
          key={3}
          onClick={() => handleClick(3)}
          className={`cursor-pointer flex w-full ${activeMessage === 3
            ? "shadow-[-1px_7px_6px_-2px_#bfbfbf] bg-[#D9D9D9] bg-opacity-40"
            : ""
            } px-2 py-3 gap-4 items-center rounded`}
        >
          {" "}
          <img
            src={
              "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            }
            alt={"Profile"}
            className="w-16 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            {" "}
            {/* Added flex-1 and min-w-0 */}
            <div className="flex justify-between">
              <span className="font-semibold">Aria Collins</span>
              <span className="font-semibold text-sm antialiased text-slate-900 ml-2">10:30 AM</span>{" "}
              {/* Added ml-2 */}
            </div>
            <div className="pr-16">
              <p className="truncate">
                {" "}
                {/* Changed to truncate class */}
                Hey! Found this cute café, let's
                asdasdasdasdasdasdaasdasdasdasdasdsdasdasdcheck..
              </p>
            </div>
          </div>
        </div>
        <div
          key={4}
          onClick={() => handleClick(4)}
          className={`cursor-pointer flex w-full ${activeMessage === 4
            ? "shadow-[-1px_7px_6px_-2px_#bfbfbf] bg-[#D9D9D9] bg-opacity-40"
            : ""
            } px-2 py-3 gap-4 items-center rounded`}
        >
          {" "}
          <img
            src={
              "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            }
            alt={"Profile"}
            className="w-16 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            {" "}
            {/* Added flex-1 and min-w-0 */}
            <div className="flex justify-between">
              <span className="font-semibold">Aria Collins</span>
              <span className="font-semibold text-sm antialiased text-slate-900 ml-2">10:30 AM</span>{" "}
              {/* Added ml-2 */}
            </div>
            <div className="pr-16">
              <p className="truncate">
                {" "}
                {/* Changed to truncate class */}
                Hey! Found this cute café, let's
                asdasdasdasdasdasdaasdasdasdasdasdsdasdasdcheck..
              </p>
            </div>
          </div>
        </div>
        <div
          key={5}
          onClick={() => handleClick(5)}
          className={`cursor-pointer flex w-full ${activeMessage === 5
            ? "shadow-[-1px_7px_6px_-2px_#bfbfbf] bg-[#D9D9D9] bg-opacity-40"
            : ""
            } px-2 py-3 gap-4 items-center rounded`}
        >
          {" "}
          <img
            src={
              "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            }
            alt={"Profile"}
            className="w-16 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            {" "}
            {/* Added flex-1 and min-w-0 */}
            <div className="flex justify-between">
              <span className="font-semibold">Aria Collins</span>
              <span className="font-semibold text-sm antialiased text-slate-900 ml-2">10:30 AM</span>{" "}
              {/* Added ml-2 */}
            </div>
            <div className="pr-16">
              <p className="truncate">
                {" "}
                {/* Changed to truncate class */}
                Hey! Found this cute café, let's
                asdasdasdasdasdasdaasdasdasdasdasdsdasdasdcheck..
              </p>
            </div>
          </div>
        </div>
        <div
          key={6}
          onClick={() => handleClick(6)}
          className={`cursor-pointer flex w-full ${activeMessage === 6
            ? "shadow-[-1px_7px_6px_-2px_#bfbfbf] bg-[#D9D9D9] bg-opacity-40"
            : ""
            } px-2 py-3 gap-4 items-center rounded`}
        >
          {" "}
          <img
            src={
              "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            }
            alt={"Profile"}
            className="w-16 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            {" "}
            {/* Added flex-1 and min-w-0 */}
            <div className="flex justify-between">
              <span className="font-semibold">Aria Collins</span>
              <span className="font-semibold text-sm antialiased text-slate-900 ml-2">10:30 AM</span>{" "}
              {/* Added ml-2 */}
            </div>
            <div className="pr-16">
              <p className="truncate">
                {" "}
                {/* Changed to truncate class */}
                Hey! Found this cute café, let's
                asdasdasdasdasdasdaasdasdasdasdasdsdasdasdcheck..
              </p>
            </div>
          </div>
        </div>
      </div>
      {activeMessage ? (
        <ChatBox></ChatBox>
      ) : (
        <div className=" w-full flex flex-col items-center justify-center ">
          <h1 className="font-bold text-2xl">Select a conversation</h1>
          <p className="font-semibold">
            Choose from your existing conversations or start a new one.
          </p>
        </div>
      )}
    </div>
  );
};

export default Inbox;
