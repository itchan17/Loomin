import { create } from "zustand";
import axios from "axios";
import userStore from "./userStore";

const postStore = create((set) => ({
  posts: null,

  createForm: {
    content: "",
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      createForm: {
        ...state.createForm,
        [name]: value,
      },
    }));
  },

  fetchPosts: async () => {
    const posts = await axios.get("/posts");
    set({ posts: posts.data.post });
  },

  createPost: async () => {
    const { createForm, posts } = postStore.getState();
    const res = await axios.post("/create-post", createForm);
    console.log(res);
    set({
      posts: [res.data.post, ...posts],
      createForm: {
        content: "",
      },
    });

    const user = userStore.getState();
    user.fetchLoggedInUser();
  },
}));

export default postStore;
