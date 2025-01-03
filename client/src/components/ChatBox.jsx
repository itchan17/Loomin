import React, { useState } from "react";
import "../global.css";

const ChatBox = () => {
  return (
    <div class="w-full flex flex-col justify-between">
      <div class="border-b border-[#A4A4A4] bg-[#D9D9D9] bg-opacity-40 py-3 flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold">Aria Collins</h1>
        <p>Online</p>
      </div>
      {/* Messages */}
      <div class="flex flex-col overflow-y-auto px-5 ">
        <div class="flex justify-end mb-4">
          <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
            Welcome to group everyone !
          </div>
        </div>
        <div class="flex justify-start mb-4">
          <img
            src="https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-white">
            Lorem ipsum dolor sit
          </div>
        </div>
        <div class="flex justify-end mb-4">
          <div>
            <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
              Lorem
            </div>

            <div class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
              Lorem ip
            </div>
          </div>
        </div>
        <div class="flex justify-start mb-4">
          <img
            src="https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-white">
            happy holiday guys!
          </div>
        </div>
        <div class="flex justify-start mb-4">
          <img
            src="https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-white">
            happy holiday guys!
          </div>
        </div>
        <div class="flex justify-start mb-4">
          <img
            src="https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-white">
            happy holiday guys!
          </div>
        </div>
        <div class="flex justify-start mb-4">
          <img
            src="https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-white">
            happy holiday guys!
          </div>
        </div>
        <div class="flex justify-start mb-4">
          <img
            src="https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-white">
            happy holiday guys!
          </div>
        </div>
        <div class="flex justify-start mb-4">
          <img
            src="https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-white">
            happy holiday guys!
          </div>
        </div>
      </div>
      <div class="py-2 px-5">
        <div class="relative hidden md:flex items-center">
          <input
            type="text"
            placeholder="Type a message ..."
            class="w-full bg-[#D9D9D9] bg-opacity-40 px-4 py-2 border border-black rounded-xl bg-white/80 w-64"
          />
          <svg
            class="absolute right-3 w-7 text-gray-500 cursor-pointer"
            width="41"
            height="34"
            viewBox="0 0 41 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.97917 1.90625C6.12309 1.90625 6.2647 1.93641 6.39081 1.99393L37.9308 16.3792C38.3442 16.5678 38.4951 16.9985 38.2677 17.3413C38.1896 17.459 38.0728 17.5559 37.9308 17.6207L6.39081 32.0059C5.97746 32.1945 5.45807 32.0694 5.23073 31.7267C5.16137 31.622 5.125 31.5047 5.125 31.3853V2.61458C5.125 2.22338 5.50743 1.90625 5.97917 1.90625ZM8.54167 6.20854V15.5832H17.0833V18.4165H8.54167V27.7913L32.2019 16.9999L8.54167 6.20854Z"
              fill="#1A1A1A"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
