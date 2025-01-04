import useUserStore from "../stores/UserStore";
import React, { useState, useEffect } from "react";
import useChatStore from "../stores/chatStore";
import moment from "moment";

const Chat = ({ chat, setActiveMessage, activeMessage }) => {
  const fetchRecipientUser = useChatStore((state) => state.fetchRecipientUser);
  const [recipientUser, setRecipientUser] = useState({});
  const activeChat = useChatStore((state) => state.activeChat);
  const selectChat = useChatStore((state) => state.selectChat);
  const updateMessageStatus = useChatStore(
    (state) => state.updateMessageStatus
  );
  const getLatestMessage = useChatStore((state) => state.getLatestMessage);
  const newMessageNotif = useChatStore((state) => state.newMessageNotif);

  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  const [latestMessage, setLatestMessage] = useState([]);

  const handleClick = (chatId, recipientUser) => {
    selectChat(chatId, recipientUser);
    updateMessageStatus(chatId, loggedInUser._id);
  };

  useEffect(() => {
    fetchRecipientUser(chat, setRecipientUser, loggedInUser._id);
  }, []);

  useEffect(() => {
    getLatestMessage(chat._id, setLatestMessage);
  }, []);

  useEffect(() => {
    if (
      newMessageNotif &&
      newMessageNotif?.some((message) => message.chatId === chat._id)
    ) {
      const latestMessage = newMessageNotif.filter(
        (message) => message.chatId === chat._id
      );
      setLatestMessage(latestMessage[latestMessage.length - 1]);
    }
  }, [newMessageNotif]);

  return (
    <div
      key={chat._id}
      onClick={() => handleClick(chat._id, recipientUser)}
      className={`cursor-pointer flex w-full ${
        activeChat === chat._id
          ? "shadow-[-1px_7px_6px_-2px_#bfbfbf] bg-[#D9D9D9] bg-opacity-40"
          : ""
      } px-2 py-3 gap-4 items-center rounded`}
    >
      <img
        src={
          recipientUser.profile_picture ||
          "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
        }
        alt={"Profile"}
        className="w-16 rounded-full flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <span className="font-semibold">{`${recipientUser.first_name} ${recipientUser.last_name}`}</span>
          <span className="font-semibold ml-2">
            {" "}
            {latestMessage ? moment(latestMessage.createdAt).fromNow() : ""}
          </span>
        </div>
        <div className="pr-16">
          <p className="truncate">
            {latestMessage && latestMessage.senderId === loggedInUser._id
              ? `You: ${latestMessage.text}`
              : latestMessage && latestMessage.senderId !== loggedInUser._id
              ? latestMessage.text
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Chat;
