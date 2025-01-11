import { create } from "zustand";
import { io } from "socket.io-client";

const useSocketStore = create((set) => ({
  socket: null,

  initializeSocket: () => {
    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });
    set({ socket: socketInstance });
  },
  disconnectSocket: () => {
    const socket = useSocketStore.getState().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useSocketStore;
