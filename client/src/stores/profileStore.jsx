import { create } from "zustand";
import axios from "axios";
import useUserStore from "./userStore";

const useProfileStore = create((set) => ({
  profilePosts: [],
  userProfileData: null,
  profileInitialLoad: true,

  // Store default images for profile picture and background
  defaultProfileImages: {
    background: "/default-background.jpg",
    profile: "/default-avatar-icon.jpg",
  },

  // Add clear posts function
  clearProfilePosts: () => set({ profilePosts: [], hasMore: true }),

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

  clearUserProfileData: () => {
    set({ userProfileData: null });
  },
}));

export default useProfileStore;
