import { create } from "zustand";
import axios from "axios";

const useNotificationStore = create((set) => ({
  makeNotification: async (notifDetails) => {
    try {
      const res = await axios.post("/notifications", notifDetails);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useNotificationStore;
