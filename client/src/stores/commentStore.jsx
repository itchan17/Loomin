import { create } from "zustand";
import axios from "axios";

const useCommentStore = create((set) => ({
  // Fetch the comment based on teh selected post
  fetchComments: async (postId, setComments, page, setHasMore) => {
    // Make the request to fetch comments
    const res = await axios.get(
      `/posts/${postId}/comments?page=${page}&limit=5`
    );

    // If the comment box is being opened for the first time
    setComments((prevComments) => {
      const updatedComments = [...prevComments, ...res.data.comments];
      return updatedComments;
    });

    setHasMore(res.data.hasMore);
  },

  createComment: async (postId, comment, setComments) => {
    try {
      // This will return the new comment with populated user data
      const res = await axios.post(`posts/${postId}/comments`, { comment });

      // Add the new comment to the post comments
      set({
        comment: "",
      });

      setComments((prevComments) => {
        const updatedComments = [...prevComments, res.data.createdComment];
        return updatedComments;
      });
    } catch (error) {
      throw new Error("Creating comment failed");
    }
  },

  editComment: async (postId, commentId, comment, setComments) => {
    try {
      const res = await axios.put(`posts/${postId}/comments/${commentId}`, {
        comment,
      });

      // Update the comments state of the selected post
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        const commentIndex = prevComments.findIndex(
          (comment) => comment._id === commentId
        );

        updatedComments[commentIndex] = res.data.comment;
        return updatedComments;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteComment: async (postId, commentId, setComments) => {
    try {
      const res = await axios.delete(`posts/${postId}/comments/${commentId}`);

      // Update the comments state of the selected post
      setComments((prevComments) => {
        const updatedComments = prevComments.filter(
          (comment) => comment._id !== commentId
        );

        return updatedComments;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

export default useCommentStore;
