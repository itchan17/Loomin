import { create } from "zustand";
import axios from "axios";

const useChatStore = create((set) => ({
  chats: null,
  chatsLoading: false,
  error: null,
  activeChat: null,
  messages: null,
  currentRecipient: null,
  message: "",

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
    const { message, messages } = useChatStore.getState();

    if (message) {
      try {
        const response = await axios.post("/messages", {
          chatId,
          senderId,
          text: message,
        });
        set({ message: "", messages: [...messages, response.data] });
      } catch (error) {
        console.log(error);
      }
    }
  },
}));

export default useChatStore;
