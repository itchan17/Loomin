import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  followedUsers:[],
  loggedInUser: {},
  loggedInUserName: null,
  followersCount: null,
  followingCount: null,
  postsCount: null,

  fetchLoggedInUser: async () => {
    try {
      const res = await axios.get("/users");
      console.log(res)
      // Set the state
      set({
        loggedInUser: res.data,
        loggedInUserName: `${res.data.first_name} ${res.data.last_name}`,
        followersCount: res.data.followers.length,
        followingCount: res.data.following.length,
        postsCount: res.data.posts.length,
        followedUsers:res.data.following,
      });
    } catch (error) {
      throw error;
    }
  },

  followUser: async (followedUserId) => {
    try {
      // const {followedUsers}
      const res = await axios.post(`/users/${followedUserId}/following`);
      console.log(res)
      set({ followingCount: res.data.following.length });
    } catch (error) {
      throw error;
    }
  },

  setFollowedUsers: (followedUserId) => {

    const {followedUsers} = useUserStore.getState()

    // Remove the user to the following
    if(followedUsers.includes(followedUserId)) {
      const updatedFollowedUsers = followedUsers.filter((user) => user !== followedUserId)
      set({followedUsers: updatedFollowedUsers})
    }
    // Add the user to the following
    else {
      set({followedUsers: [...followedUsers, followedUserId]})
    }

  }
}));

export default useUserStore;
