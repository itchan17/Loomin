import { create } from "zustand";
import axios from "axios";
import useUserStore from "./UserStore";

const usePostStore = create((set) => ({
  posts: [],

  hasMore: true,
  loading: false,

  createForm: {
    content: "",
  },

  editForm: {
    content: "",
  },

  clearForm: () => set({ createForm: { content: "" } }),

  // Get the content of selected post
  getPost: (post) => {
    set({
      editForm: {
        content: post.content,
      },
    });
  },

  // Update post input fields
  updateEditFormField: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      editForm: {
        ...state.editForm,
        [name]: value,
      },
    }));
  },

  // Update the post
  updatePost: async (postId) => {
    const { editForm, posts } = usePostStore.getState();

    try {
      const res = await axios.put(`/posts/${postId}`, editForm);

      // Update posts state
      const newPosts = [...posts];
      const postIndex = posts.findIndex((post) => {
        return post._id === postId;
      });

      newPosts[postIndex] = res.data.newPost;

      set({
        posts: newPosts,
        editForm: {
          content: "",
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deletePost: async (postId) => {
    const { posts } = usePostStore.getState();
    try {
      const res = await axios.delete(`/posts/${postId}`);

      const newPosts = posts.filter(
        (post) => post._id !== res.data.deletedPost._id
      );
      set({ posts: newPosts });

      // Update the postsCount state
      const currentPostsCount = Number(useUserStore.getState().postsCount);

      // Set the new state value
      useUserStore.setState({
        postsCount: currentPostsCount - 1,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // Update create post input fields
  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      createForm: {
        ...state.createForm,
        [name]: value,
      },
    }));
  },
  // Add clear posts function
  clearPosts: () => set({ posts: [], hasMore: true }),

  fetchPosts: async (page) => {
    try {
      const { posts } = usePostStore.getState();
      const fetchedPosts = await axios.get(`/posts?page=${page}&limit=10`);
      set({
        posts: [...posts, ...fetchedPosts.data.posts],
        hasMore: fetchedPosts.data.hasMore,
      });
    } catch (error) {
      console.log(error);
      throw error;
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
      throw error;
    }
  },

  archivePost: async (postId) => {
    const { posts } = usePostStore.getState();
    try {
      const res = await axios.put(`posts/${postId}/archive`);
      console.log(res);
      const newPosts = posts.filter((post) => post._id !== res.data.post._id);
      set({ posts: newPosts });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  likeUnlikePost: async (postId) => {
    try {
      await axios.post(`posts/${postId}/like`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

export default usePostStore;
