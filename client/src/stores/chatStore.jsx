import { create } from "zustand";
import axios from "axios";
import useSocketStore from "./socketStore";

const useChatStore = create((set) => ({
  chats: null,
  chatsLoading: false,
  error: null,
  activeChat: null,
  messages: null,
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

  getUserChats: async (userId) => {
    set({ chatsLoading: true, error: null });

    try {
      const response = await axios.get(`/chats/${userId}`);
      if (response.status !== 200) throw new Error("Failed to fetch data");

      set({ chats: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

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
    set({ activeChat: chatId, currentRecipient: currentRecipient });

    try {
      const response = await axios.get(`/messages/${chatId}`);

      console.log(response.data);
      set({ messages: response.data });
    } catch (error) {
      console.log(error);
    }
  },

  sendMessage: async (chatId, senderId) => {
    const { message, messages, currentRecipient, newMessageNotif } =
      useChatStore.getState();
    const socket = useSocketStore.getState().socket;

    if (message) {
      try {
        const response = await axios.post("/messages", {
          chatId,
          senderId,
          text: message,
          receiverId: currentRecipient._id,
        });

        socket.emit("sendMessage", {
          ...response.data,
          recipientId: currentRecipient._id,
        });

        set({
          message: "",
          messages: [...messages, response.data],
          newMessageNotif: [...newMessageNotif, response.data],
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

  setNewMessageNotif: (message) => {
    const { newMessageNotif } = useChatStore.getState();
    set({ newMessageNotif: [...newMessageNotif, message] });
  },

  // Update read status
  updateMessageStatus: async (chatId, userId, messageId) => {
    const { newMessageNotif } = useChatStore.getState();
    try {
      const response = await axios.put("/messages/mark-as-read", {
        chatId,
        userId,
        messageId,
      });
      console.log(response);

      // Add the new receive chat it the new message notif, so that it can be displayed in the chat preview
      if (messageId) {
        set({ newMessageNotif: [...newMessageNotif, response.data.message] });
      }
      // set({ messages: response.data });
    } catch (error) {
      console.log(error);
    }
  },

  getLatestMessage: async (chatId, setLatestMessage) => {
    try {
      const response = await axios.get(`/messages/${chatId}`);

      setLatestMessage(response.data[response.data.length - 1]);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useChatStore;
