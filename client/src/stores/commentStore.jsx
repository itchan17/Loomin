import { create } from "zustand";
import axios from "axios";

const useCommentStore = create((set) => ({
  comments: null,

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

  createComment: async (postId, comment) => {
    const { comments } = useCommentStore.getState();

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

  editComment: async (postId, commentId, comment) => {
    const { comments } = useCommentStore.getState();
    try {
      const res = await axios.put(`posts/${postId}/comments/${commentId}`, {
        comment,
      });

      // Update the comments state
      const newComments = [...comments[postId]];
      const commentIndex = comments[postId].findIndex(
        (comment) => comment._id === commentId
      );

      newComments[commentIndex] = res.data.comment;

      set({ comments: { ...comments, [postId]: newComments } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteComment: async (postId, commentId) => {
    const { comments } = useCommentStore.getState();

    try {
      const res = await axios.delete(`posts/${postId}/comments/${commentId}`);

      const newComments = comments[postId].filter(
        (comment) => comment._id !== commentId
      );
      set({ comments: { [postId]: newComments } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

export default useCommentStore;
