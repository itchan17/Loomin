import { create } from "zustand";
import axios from "axios";
import useSocketStore from "./socketStore";

const useNotificationStore = create((set) => ({
  notifications: null,
  notificationsCount: 0,

  setNotifications: (notification) => {
    const { notifications, notificationsCount } =
      useNotificationStore.getState();

    set({
      notifications: [notification, ...(notifications || [])],
      notificationsCount: notificationsCount + 1,
    });
  },

  // Will reduce the notifications counts if the user read the notif
  setNotificationsCount: () => {
    const { notificationsCount } = useNotificationStore.getState();

    set({
      notificationsCount: notificationsCount - 1,
    });
  },

  makeNotification: async (senderId, recipientId, postId, type, content) => {
    const notifDetails = {
      senderId,
      recipientId,
      postId,
      type,
      content,
    };

    const socket = useSocketStore.getState().socket;
    try {
      const res = await axios.post("/notifications", notifDetails);

      // Will send the message to the socket that will then send to the online user
      socket.emit("sendNotif", {
        ...res.data,
        recipientId: notifDetails.recipientId,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  fetchNotifications: async () => {
    try {
      const res = await axios.get("/notifications");
      set({ notifications: res.data, notificationsCount: res.data.length });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  markAsRead: async (notifId) => {
    try {
      const res = await axios.post(`/notifications/${notifId}/read`);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  clearNotification: async (notifId) => {
    const { notifications } = useNotificationStore.getState();
    console.log(notifId);
    try {
      const res = await axios.delete(`/notifications/${notifId}`);

      set({
        notifications: notifications.filter(
          (notification) => notification._id !== notifId
        ),
      });
    } catch (error) {
      console.log(error);
    }
  },

  clearAllNotifications: async (notifId) => {
    try {
      const res = await axios.delete(`/notifications`);

      set({
        notifications: [],
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useNotificationStore;
