import { create } from "zustand";
import axios from "axios";

const useProfileStore = create((set) => ({
  profilePosts: [],
  userProfileData: null,
  activeProfile: null,
  profileInitialLoad: true,

  // Add clear posts function
  clearProfilePosts: () => set({ profilePosts: [], hasMore: true }),

  // Fetch all posts of the user
  fetchProfilePosts: async (page, setHasMore, userId) => {
    console.log(userId);
    try {
      const { profilePosts } = useProfileStore.getState();
      const fetchedPosts = await axios.get(
        `/posts/profile/${userId}?page=${page}&limit=10`
      );
      console.log(fetchedPosts);
      set({
        profilePosts: [...profilePosts, ...fetchedPosts.data.posts],
      });
      setHasMore(fetchedPosts.data.hasMore);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  fetchUserProfileData: async (username) => {
    console.log(username);
    try {
      const userData = await axios.get(`/users/${username}`);
      set({ userProfileData: userData.data });
      console.log(userData);
    } catch (error) {}
  },

  setActiveProfile: (userId) => {
    set({ activeProfile: userId });
  },

  clearActiveProfile: () => {
    set({ activeProfile: null });
  },

  setProfileInitialLoad: (value) => {
    set({ profileInitialLoad: value });
  },
}));

export default useProfileStore;
