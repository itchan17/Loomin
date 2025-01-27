import { create } from "zustand";
import axios from "axios";
import useUserStore from "./userStore";

const usePostStore = create((set) => ({
  posts: [],

  loading: false,

  createForm: {
    content: "",
    images: [],
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
  updatePost: async (postId, editPostForm) => {
    const { posts } = usePostStore.getState();

    const formData = new FormData();

    formData.append("content", editPostForm.content);
    editPostForm.newImages.forEach((image) => {
      formData.append("newImages", image);
    });
    editPostForm.removedImages.forEach((image) => {
      formData.append("removedImages", image);
    });
    try {
      const res = await axios.put(`/posts/${postId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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

  fetchPosts: async (page, setHasMore) => {
    try {
      const { posts } = usePostStore.getState();
      const fetchedPosts = await axios.get(`/posts?page=${page}&limit=10`);
      set({
        posts: [...posts, ...fetchedPosts.data.posts],
      });
      setHasMore(fetchedPosts.data.hasMore);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createPost: async (postForm) => {
    const { posts } = usePostStore.getState();
    const formData = new FormData();
    formData.append("content", postForm.content);
    postForm.images.forEach((image) => {
      formData.append("images", image);
    });
    console.log(formData);
    try {
      const res = await axios.post("/create-post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);

      set({
        posts: [res.data.post, ...posts],
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

  // Fetch all posts of the user
  fetchProfilePosts: async (page, setHasMore, userId) => {
    console.log(userId);
    try {
      const { posts } = usePostStore.getState();
      const fetchedPosts = await axios.get(
        `/posts/profile/${userId}?page=${page}&limit=10`
      );
      console.log(fetchedPosts);
      set({
        posts: [...posts, ...fetchedPosts.data.posts],
      });
      setHasMore(fetchedPosts.data.hasMore);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

export default usePostStore;
