import { create } from "zustand";
import axios from "axios";
import useSocketStore from "./socketStore";

const useChatStore = create((set) => ({
  chats: null,
  chatsLoading: false,
  error: null,
  activeChat: null,
  messages: [],
  currentRecipient: null,
  message: "",
  newMessageNotif: [],

  updateMessageField: (e) => {
    const { value } = e.target;
    set((state) => ({
      ...state,
      message: value,
    }));
  },

  // This wil get all the chats of the logged in user
  getUserChats: async (userId) => {
    set({ chatsLoading: true, error: null });

    try {
      const response = await axios.get(`/chats/${userId}`);
      if (response.status !== 200) throw new Error("Failed to fetch data");

      // Fetch latest message for each chat
      const chatsWithLatestMessages = await Promise.all(
        response.data.map(async (chat) => {
          try {
            const messagesResponse = await axios.get(`/messages/${chat._id}`);
            const messages = messagesResponse.data;
            return {
              ...chat,
              latestMessage:
                messages.length > 0 ? messages[messages.length - 1] : null,
            };
          } catch (error) {
            console.log(error);
            return {
              ...chat,
              latestMessage: null,
            };
          }
        })
      );

      // Sort chats by latest message timestamp
      const sortedChats = chatsWithLatestMessages.sort((a, b) => {
        if (!a.latestMessage) return 1;
        if (!b.latestMessage) return -1;
        return (
          new Date(b.latestMessage.createdAt) -
          new Date(a.latestMessage.createdAt)
        );
      });

      set({ chats: sortedChats, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // This will fetch the data of the recipient user that will be displayed the chat and chat box
  fetchRecipientUser: async (chat, setRecipientUser, userId) => {
    const recipientUserId = chat.members.find((id) => id !== userId);
    if (recipientUserId) {
      try {
        const response = await axios.get(`/users/${recipientUserId}`);
        if (response.status !== 200) throw new Error("Failed to fetch data");

        setRecipientUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  },

  selectChat: async (chatId, currentRecipient) => {
    const { newMessageNotif } = useChatStore.getState();

    set({ activeChat: chatId, currentRecipient: currentRecipient });
  },

  // Send the message to db and socket
  sendMessage: async (chatId, senderId) => {
    const { message, messages, currentRecipient, sortChats } =
      useChatStore.getState();

    const socket = useSocketStore.getState().socket;

    sortChats(chatId); // This will put the message at the start of chats array

    if (message) {
      try {
        const response = await axios.post("/messages", {
          chatId,
          senderId,
          text: message,
          receiverId: currentRecipient._id,
        });

        // Will send the message to the socket that will then send to the online user
        socket.emit("sendMessage", {
          ...response.data,
          recipientId: currentRecipient._id,
        });

        set({
          message: "",
          messages: [...messages, response.data],
        });
      } catch (error) {
        console.log(error);
      }
    }
  },

  setMessages: (message) => {
    const { messages } = useChatStore.getState();
    set({ messages: [...messages, message] });
  },

  // Will store the new messages receive
  setNewMessageNotif: (message) => {
    const { newMessageNotif } = useChatStore.getState();
    set({ newMessageNotif: [...newMessageNotif, message] });
  },

  // This will update the read status of message and return the updated message
  getAndUpdateMessageStatus: async (chatId, userId, messageId) => {
    const { newMessageNotif, messages } = useChatStore.getState();
    try {
      const response = await axios.put("/messages/mark-as-read", {
        chatId,
        userId,
        messageId,
      });

      // Up date the receive message if the chat is open
      if (messageId) {
        set({ newMessageNotif: [...newMessageNotif, response.data.message] });
        set({ messages: [...messages, response.data.message] });
      } else {
        set({ messages: response.data.updatedMessages }); // will Return updated messages if the user click the chat after there's new message
      }
    } catch (error) {
      console.log(error);
    }
  },

  // This function will get the latest message of the each chat and the latestMessage state
  getLatestMessage: async (chatId, setLatestMessage) => {
    try {
      const response = await axios.get(`/messages/${chatId}`);

      setLatestMessage(response.data[response.data.length - 1]);
    } catch (error) {
      console.log(error);
    }
  },

  // Sort chats if the inbox ins rendered and new messages came
  sortChats: (chatWithNewMessageId) => {
    const { chats } = useChatStore.getState();

    // Find the index of the chat
    const chatIndex = chats.findIndex(
      (chat) => chat._id === chatWithNewMessageId
    );

    if (chatIndex === -1) {
      console.error("Chat not found!");
      return;
    }

    // Create a new array to avoid mutating the original state
    const updatedChats = [...chats];

    // Remove the selected chat
    const [chatWithNewMessage] = updatedChats.splice(chatIndex, 1);

    // Add it to the beginning of the array
    updatedChats.unshift(chatWithNewMessage);

    // Update the state with the new chat arrangement
    set({ chats: updatedChats });
  },

  // Clear the active chat if user go to different pages or logout
  clearActiveChat: () => {
    set({ activeChat: null });
  },
}));

export default useChatStore;
