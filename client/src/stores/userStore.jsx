import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  following: [], // List of following ID
  loggedInUser: {}, // Data of currently logged in user
  loggedInUserName: null,
  followersCount: null,
  followingCount: null,
  postsCount: null,
  followingToDisplay: [], // Data of following that is going to display
  suggestedUser: [], // Data of suugested users
  isLoading: true, // Add loading state
  error: null, // Add error state

  fetchLoggedInUser: async () => {
    try {
      const { loggedInUser } = useUserStore.getState();

      set({ isLoading: true, error: null });
      const res = await axios.get("/users");
      if (loggedInUser._id !== res.data.user._id) {
        console.log("RUNNING");
        set({
          loggedInUser: res.data.user,
          loggedInUserName: `${res.data.user.first_name} ${res.data.user.last_name}`,
          followersCount: res.data.user.followers.length,
          followingCount: res.data.user.following.length,
          postsCount: res.data.user.posts.length,
          following: res.data.user.following,
          followingToDisplay: res.data.followingToDisplay,
          suggestedUser: res.data.suggestedUser,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  clearUser: () => {
    set({
      loggedInUser: {},
      loggedInUserName: null,
      followersCount: null,
      followingCount: null,
      postsCount: null,
      followingToDisplay: [],
      suggestedUser: [],
      isLoading: true,
      error: null,
    });
  },

  followUser: async (followedUser) => {
    const { followingToDisplay, suggestedUser } = useUserStore.getState();
    try {
      // const {followedUsers}
      const res = await axios.post(`/users/${followedUser._id}/following`);
      console.log(res);

      // Update the displayed following in the right side bar
      if (
        res.data.updatedFollowing.includes(followedUser._id) &&
        suggestedUser.find((user) => user._id === followedUser._id)
      ) {
        const updated = suggestedUser.filter(
          (following) => following._id !== followedUser._id
        );
        set({ suggestedUser: updated });
      }
      if (
        res.data.updatedFollowing.includes(followedUser._id) &&
        followingToDisplay.length <= 10
      ) {
        set({ followingToDisplay: [followedUser, ...followingToDisplay] });
      } else if (!res.data.updatedFollowing.includes(followedUser._id)) {
        const updated = followingToDisplay.filter(
          (following) => following._id !== followedUser._id
        );
        set({ followingToDisplay: updated });
      }
      // Update the following count and following id list
      set({
        followingCount: res.data.updatedFollowing.length,
        following: res.data.updatedFollowing,
      });
    } catch (error) {
      throw error;
    }
  },
}));

export default useUserStore;
