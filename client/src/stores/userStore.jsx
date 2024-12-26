import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  loggedInUser: {},
  loggedInUserName: null,
  followersCount: null,
  followingCount: null,
  postsCount: null,

  fetchLoggedInUser: async () => {
    const res = await axios.get("/users");

    // Set the state
    set({
      loggedInUser: res.data,
      loggedInUserName: `${res.data.first_name} ${res.data.last_name}`,
      followersCount: res.data.followers.length,
      followingCount: res.data.following.length,
      postsCount: res.data.posts.length,
    });
  },
}));

export default useUserStore;
