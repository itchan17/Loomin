import useUserStore from "../stores/UserStore";
import React, { useState, useEffect } from "react";
import useChatStore from "../stores/chatStore";
import moment from "moment";

const Chat = ({ chat, setActiveMessage, activeMessage }) => {
  // Chat store states
  const fetchRecipientUser = useChatStore((state) => state.fetchRecipientUser);
  const activeChat = useChatStore((state) => state.activeChat);
  const messages = useChatStore((state) => state.messages);
  const selectChat = useChatStore((state) => state.selectChat);
  const getAndUpdateMessageStatus = useChatStore(
    (state) => state.getAndUpdateMessageStatus
  );
  const getLatestMessage = useChatStore((state) => state.getLatestMessage);
  const newMessageNotif = useChatStore((state) => state.newMessageNotif);

  // User store states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  const [recipientUser, setRecipientUser] = useState({});
  const [latestMessage, setLatestMessage] = useState([]);

  const handleClick = (chatId, recipientUser) => {
    selectChat(chatId, recipientUser);
    getAndUpdateMessageStatus(chatId, loggedInUser._id);
  };

  useEffect(() => {
    // This will fetch the data of the recipient of this chat
    fetchRecipientUser(chat, setRecipientUser, loggedInUser._id);

    // Will fetch the latest message of the chat and update the state
    getLatestMessage(chat._id, setLatestMessage);
  }, []);

  // Set the latest message whenever send a message
  useEffect(() => {
    if (messages && activeChat === chat._id) {
      setLatestMessage(messages[messages.length - 1]);
    }
  }, [messages]);

  // If the newMessageNotif gets updated, it will update the latesMessage to display
  useEffect(() => {
    // Check if the chat has a new message in the newMessageNotif
    if (
      newMessageNotif &&
      newMessageNotif?.some(
        (message) => message.chatId === chat._id && activeChat !== chat._id
      )
    ) {
      // Will filter all the messages
      const latestMessage = newMessageNotif.filter(
        (message) => message.chatId === chat._id
      );
      // Get the last message
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

          {latestMessage && latestMessage.senderId === loggedInUser._id ? (
            <span className="ml-2">
              {latestMessage ? moment(latestMessage.createdAt).fromNow() : ""}
            </span>
          ) : latestMessage &&
            latestMessage.senderId !== loggedInUser._id &&
            latestMessage.read === false ? (
            <span className="font-semibold ml-2">
              {latestMessage ? moment(latestMessage.createdAt).fromNow() : ""}
            </span>
          ) : latestMessage &&
            latestMessage.senderId !== loggedInUser._id &&
            latestMessage.read === true ? (
            <span className="ml-2">
              {latestMessage ? moment(latestMessage.createdAt).fromNow() : ""}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="pr-16">
          {latestMessage && latestMessage.senderId === loggedInUser._id ? (
            <p className="truncate">You: {latestMessage.text}</p>
          ) : latestMessage &&
            latestMessage.senderId !== loggedInUser._id &&
            latestMessage.read === false ? (
            <p className="truncate font-semibold">{latestMessage.text}</p>
          ) : latestMessage &&
            latestMessage.senderId !== loggedInUser._id &&
            latestMessage.read === true ? (
            <p className="truncate">{latestMessage.text}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Chat;
