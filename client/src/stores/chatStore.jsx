import { create } from "zustand";
import axios from "axios";
import useSocketStore from "./socketStore";

const useChatStore = create((set) => ({
  chats: [],
  chatsLoading: false,
  error: null,
  activeChat: null,
  messages: [],
  currentRecipient: null,
  message: "",
  newMessageNotif: [],
  unreadMessagesCount: null,
  inboxSearchTerm: "",

  updateSearchField: (e) => {
    const searchTerm = e.target.value;
    set({ inboxSearchTerm: searchTerm });
  },

  clearInboxSearchTerm: () => {
    set({ inboxSearchTerm: "" });
  },

  updateMessageField: (e) => {
    const { value } = e.target;
    set((state) => ({
      ...state,
      message: value,
    }));
  },

  createChat: async (firstId, secondId) => {
    const { chats, sortChats } = useChatStore.getState();
    console.log(firstId, secondId);

    try {
      const response = await axios.post("/chats/create", { firstId, secondId });

      if (chats.some((chat) => chat._id === response.data._id)) {
        console.log("Chat is already created.");
        sortChats(response.data._id);
      } else {
        set({ chats: [response.data, ...chats] });
        console.log("new chat created.");
      }
    } catch (error) {
      console.log(error);
    }
  },

  // This wil get all the chats of the logged in user
  getUserChats: async (userId) => {
    set({ chatsLoading: true, error: null });

    try {
      const response = await axios.get(`/chats/user/${userId}`);
      if (response.status !== 200) throw new Error("Failed to fetch data");

      // Fetch latest message for each chat
      const chatsWithLatestMessages = await Promise.all(
        response.data.map(async (chat) => {
          try {
            const messagesResponse = await axios.get(`/messages/${chat._id}`);
            console.log(messagesResponse);
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
    const recipientUserId =
      chat.members[1] === userId ? chat.members[0] : chat.members[1];
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
        if (senderId === currentRecipient._id) {
          set({
            message: "",
          });
        } else {
          set({
            message: "",
            messages: [...messages, response.data],
          });
        }
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
    const { newMessageNotif, unreadMessagesCount } = useChatStore.getState();
    set({ newMessageNotif: [...newMessageNotif, message] });
    if (message.read === false) {
      set({ unreadMessagesCount: unreadMessagesCount + 1 });
    }
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
      console.log(response);
      // Up date the receive message if the chat is open
      if (messageId) {
        set({ newMessageNotif: [...newMessageNotif, response.data.message] });
        set({ messages: [...messages, response.data.message] });
      } else {
        set({
          messages: response.data.updatedMessages,
          unreadMessagesCount: response.data.unreadCount,
        }); // will Return updated messages if the user click the chat after there's new message
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
  sortChats: async (chatId) => {
    const { chats } = useChatStore.getState();

    const isInChats = chats.some((chat) => chat._id === chatId);

    if (isInChats) {
      // Find the index of the chat
      const chatIndex = chats.findIndex((chat) => chat._id === chatId);
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
    } else {
      try {
        const chat = await axios.get(`/chats/${chatId}`);

        set({ chats: [chat.data, ...chats] });
      } catch (error) {
        console.log(error);
      }
    }
  },

  // Clear the active chat if user go to different pages or logout
  clearActiveChat: () => {
    set({ activeChat: null });
  },

  // Get count of unread messages if the user login
  getCountUnreadMessages: async () => {
    try {
      const count = await axios.get("/messages");
      set({ unreadMessagesCount: count.data.unreadCount });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useChatStore;
