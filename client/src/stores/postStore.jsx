import { create } from "zustand";
import axios from "axios";
import useUserStore from "./UserStore";

const usePostStore = create((set) => ({
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
    console.log(posts.data.post);
    set({ posts: posts.data.post });
  },

  createPost: async () => {
    const { createForm, posts } = usePostStore.getState();
    const res = await axios.post("/create-post", createForm);
    console.log(res);
    set({
      posts: [res.data.post, ...posts],
      createForm: {
        content: "",
      },
    });

    // Update the postsCount state
    const currentPostsCount = Number(useUserStore.getState().postsCount);

    // Set the new state value
    useUserStore.setState({
      postsCount: currentPostsCount + 1,
    });
  },
}));

export default usePostStore;
