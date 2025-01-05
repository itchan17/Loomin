import React, { useEffect, useState, useRef } from "react";
import "../global.css";
import useChatStore from "../stores/chatStore";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
const ChatBox = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // Chat states
  const messages = useChatStore((state) => state.messages);
  const message = useChatStore((state) => state.message);
  const setMessages = useChatStore((state) => state.setMessages);
  const currentRecipient = useChatStore((state) => state.currentRecipient);
  const updateMessageField = useChatStore((state) => state.updateMessageField);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const activeChat = useChatStore((state) => state.activeChat);
  const getAndUpdateMessageStatus = useChatStore(
    (state) => state.getAndUpdateMessageStatus
  );
  const setNewMessageNotif = useChatStore((state) => state.setNewMessageNotif);

  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const onlineUsers = useUserStore((state) => state.onlineUsers);

  const socket = useSocketStore((state) => state.socket);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [messages]);

  // Receive message real time through socket
  useEffect(() => {
    console.log("Getting Message");

    if (!socket || !loggedInUser?._id) return;
    // Add the event listener
    socket.on("getMessage", (message) => {
      // If the use has open the chat, update the message status to read
      if (activeChat === message.chatId) {
        // setMessages(message);
        console.log("Works everytime");
        getAndUpdateMessageStatus(
          message.chatId,
          loggedInUser._id,
          message._id
        );
      }
      if (activeChat !== message.chatId) {
        console.log(message);
        setNewMessageNotif(message);
      }
    });

    // Cleanup function to remove the event listener
    return () => {
      socket.off("getMessage");
    };
  }, [activeChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(activeChat, loggedInUser._id);
  };
  const handleEmojiClick = (emojiData) => {
    useChatStore.setState((state) => ({
      message: state.message + emojiData.emoji,
    }));
  };

  const dislpayMessages = () => {
    return messages.map((message) => {
      if (message.senderId === loggedInUser._id) {
        return (
          <div key={message._id} className="flex justify-end mb-4">
            <div className="mr-2">
              <div className=" py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                {message.text}
              </div>
              <div className="flex justify-end">
                <span className="mt-auto text-sm">
                  {moment(message.createdAt).calendar()}
                </span>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={message._id} class="flex justify-start mb-4">
            <img
              src={
                currentRecipient.profile_picture ||
                "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
              }
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div className="ml-2 ">
              <div class="py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-white">
                {message.text}
              </div>
              <span className="mt-auto text-sm">
                {moment(message.createdAt).calendar()}
              </span>
            </div>
          </div>
        );
      }
    });
  };
  return (
    <div class="w-full flex flex-col justify-between">
      <div class="border-b border-[#A4A4A4] bg-[#D9D9D9] bg-opacity-40 py-3 flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold">{`${currentRecipient.first_name} ${currentRecipient.last_name}`}</h1>
        {onlineUsers.some((user) => user.userId === currentRecipient._id) ? (
          <p>Online</p>
        ) : (
          ""
        )}
      </div>
      {/* Messages */}
      <div class="flex flex-col overflow-y-auto px-5 ">
        {messages && dislpayMessages()}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} class="py-2 px-5">
        <div class="relative hidden md:flex items-center">
          <input
            type="text"
            name="message"
            placeholder="Type a message ..."
            value={message}
            onChange={(e) => updateMessageField(e)}
            class="w-full bg-[#D9D9D9] bg-opacity-40 px-4 py-2 border border-black rounded-xl bg-white/80"
          />
          <div className="flex absolute right-3 gap-2">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              type="button"
              className=" w-7 text-gray-500 cursor-pointer"
            >
              {" "}
              <svg
                class="text-black"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"
                ></path>
              </svg>
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-10 right-0">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <button
              type="submit"
              disabled={!message}
              class=" w-7 text-gray-500 cursor-pointer"
              aria-label="Send message"
            >
              <svg
                width="30"
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
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
