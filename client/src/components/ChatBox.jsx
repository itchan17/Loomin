import React, { useEffect, useState, useRef } from "react";
import "../global.css";
import useChatStore from "../stores/chatStore";
import useUserStore from "../stores/UserStore";
import useSocketStore from "../stores/socketStore";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import useProfileStore from "../stores/profileStore";

const ChatBox = ({ onBack }) => {
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

  // Profile store
  const defaultProfileImages = useProfileStore(
    (state) => state.defaultProfileImages
  );

  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const onlineUsers = useUserStore((state) => state.onlineUsers);

  const socket = useSocketStore((state) => state.socket);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

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

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 100) + "px";
    }
  }, [message]);

  // Receive message real time through socket
  useEffect(() => {
    if (!socket || !loggedInUser?._id) return;
    console.log(socket);
    socket.on("getMessage", (message) => {
      if (activeChat === message.chatId) {
        getAndUpdateMessageStatus(
          message.chatId,
          loggedInUser._id,
          message._id
        );
      }
      if (activeChat !== message.chatId) {
        setNewMessageNotif(message);
      }
    });

    return () => {
      socket.off("getMessage");
    };
  }, [activeChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending whitespace-only messages
    await sendMessage(activeChat, loggedInUser._id);
  };

  const handleEmojiClick = (emojiData) => {
    useChatStore.setState((state) => ({
      message: state.message + emojiData.emoji,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSubmit(e);
      }
    }
  };

  const dsiplayMessages = () => {
    return messages.map((message) => {
      if (message.senderId === loggedInUser._id) {
        return (
          <div key={message._id} className="flex justify-end mb-4">
            <div className="mr-2 max-w-[80%]">
              <div className="py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white break-words">
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
          <div key={message._id} className="flex justify-start mb-4">
            <img
              src={
                currentRecipient?.profile_picture
                  ? `http://localhost:3000/${currentRecipient.profile_picture}`
                  : defaultProfileImages.profile
              }
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div className="ml-2 max-w-[80%]">
              <div className="py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-white break-words">
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
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="flex-none border-b border-[#A4A4A4] bg-[#D9D9D9] bg-opacity-40 py-3 flex flex-col items-center justify-center relative">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-4 2xl:hidden z-10 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <h1 className="text-2xl font-bold">{`${currentRecipient.first_name} ${currentRecipient.last_name}`}</h1>
        {onlineUsers.some((user) => user.userId === currentRecipient._id) ? (
          <p className="text-sm text-green-600">Online</p>
        ) : (
          ""
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide">
        {messages && dsiplayMessages()}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="flex-none bg-white border-t">
        <form onSubmit={handleSubmit} className="relative px-4 py-2">
          <textarea
            ref={textareaRef}
            rows="1"
            name="message"
            placeholder="Type a message ..."
            value={message}
            onChange={(e) => updateMessageField(e)}
            onKeyPress={handleKeyPress}
            className="w-full min-h-[44px] bg-[#D9D9D9] bg-opacity-40 px-4 py-2 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 resize-none overflow-hidden"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEmojiPicker(!showEmojiPicker);
                }}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-3.646 5.854a.5.5 0 00.708 0l2-2a.5.5 0 00-.708-.708L11 13.793l-1.646-1.647a.5.5 0 00-.708.708l2 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {showEmojiPicker && (
                <div
                  className="fixed inset-0 z-50"
                  onClick={() => setShowEmojiPicker(false)}
                >
                  <div
                    className="absolute bottom-16 right-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className={`p-1 ${
                message.trim()
                  ? "text-blue-500 hover:text-blue-700"
                  : "text-gray-400"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
