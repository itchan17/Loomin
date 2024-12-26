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
    try {
      const posts = await axios.get("/posts");

      set({ posts: posts.data.post, likesCount: posts.data.post.length });
    } catch (error) {
      console.log(error);
    }
  },

  createPost: async () => {
    const { createForm, posts } = usePostStore.getState();
    try {
      const res = await axios.post("/create-post", createForm);
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
    } catch (error) {
      console.log(error);
    }
  },

  likeUnlikePost: async (postId) => {
    try {
      await axios.post(`posts/${postId}/like`);
    } catch (error) {}
  },
}));

export default usePostStore;
