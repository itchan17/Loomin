import { create } from "zustand";
import axios from "axios";

const useCommentStore = create((set) => ({
  comments: null,

  comment: "",

  targetPost: null,

  updateCommentField: (e, postId) => {
    // Set the selected post
    set({ targetPost: postId });

    const { value } = e.target;

    set((state) => {
      return {
        comment: value, // Update the comment with the new value
      };
    });
  },

  // Fetch the comment based on teh selected post
  fetchComments: async (postId) => {
    const { comments } = useCommentStore.getState();

    const res = await axios.get(`/posts/${postId}/comments`);

    // If user open comment box for the first time
    if (comments === null) {
      set({ comments: { [postId]: res.data.comments } });
    }
    // If not, add the comments of new selected post, the previous comments
    set({ comments: { ...comments, [postId]: res.data.comments } });
  },

  createComment: async (postId) => {
    const { comment, comments } = useCommentStore.getState();
    try {
      // This will return the new comment with populated user data
      const res = await axios.post(`posts/${postId}/comments`, { comment });

      // Add the new comment to the post comments
      set({
        comments: {
          ...comments,
          [postId]: [...comments[postId], res.data.createdComment],
        },
        comment: "",
      });
    } catch (error) {
      throw new Error("Creating comment failed");
    }
  },
}));

export default useCommentStore;
