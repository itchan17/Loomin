import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  loggedInUser: {},
  loggedInUserName: null,
  followersCount: null,
  followingCount: null,
  postsCount: null,

  fetchLoggedInUser: async () => {
    try {
      const res = await axios.get("/users");

      // Set the state
      set({
        loggedInUser: res.data,
        loggedInUserName: `${res.data.first_name} ${res.data.last_name}`,
        followersCount: res.data.followers.length,
        followingCount: res.data.following.length,
        postsCount: res.data.posts.length,
      });
    } catch (error) {
      throw error;
    }
  },

  followUser: async (followedUserId) => {
    try {
      const res = await axios.post(`/users/${followedUserId}/following`);
      set({ followingCount: res.data.followingCount });
    } catch (error) {
      throw error;
    }
  },
}));

export default useUserStore;
