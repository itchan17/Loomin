import { create } from "zustand";
import axios from "axios";
import numeral from "numeral";

const userStore = create((set) => ({
  loggedInUser: {},
  loggedInUserName: null,
  followersCount: null,
  followingCount: null,
  postsCount: null,

  fetchLoggedInUser: async () => {
    const res = await axios.get("/users");
    // Format the numbers
    const followersCount =
      res.data.followers.length > 1000
        ? numeral(res.data.followers.length).format("0.0a")
        : numeral(res.data.followers.length).format("0a");
    const followingCount =
      res.data.following.length > 1000
        ? numeral(res.data.following.length).format("0.0a")
        : numeral(res.data.following.length).format("0a");
    const postsCount =
      res.data.posts.length > 1000
        ? numeral(res.data.posts.length).format("0.0a")
        : numeral(res.data.posts.length).format("0a");

    // Set the state
    set({
      loggedInUser: res.data,
      loggedInUserName: `${res.data.first_name} ${res.data.last_name}`,
      followersCount,
      followingCount,
      postsCount,
    });
  },
}));

export default userStore;
