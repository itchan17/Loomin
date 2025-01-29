import useCommentStore from "../stores/CommentStore";
import React, { useState } from "react";
import useNotificationStore from "../stores/notificationStore";
import useUserStore from "../stores/userStore";

const CreateCommentForm = ({ post, setCommentsCount, setComments }) => {
  //Notification state
  const makeNotification = useNotificationStore(
    (state) => state.makeNotification
  );

  //User state
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  const [comment, setComment] = useState("");
  const createComment = useCommentStore((state) => state.createComment);

  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (comment.trim()) {
      await createComment(post._id, comment, setComments);
      setCommentsCount((prevCount) => prevCount + 1);
      setComment("");

      // Make notification

      if (loggedInUser._id !== post.creator._id) {
        makeNotification(
          loggedInUser._id,
          post.creator._id,
          post._id,
          "comment",
          `commented on your post.`
        );
      }
    }
  };

  const updateCommentField = (e) => {
    const { value } = e.target;
    setComment(value);
  };
  return (
    <form onSubmit={handleCreateComment} className="flex gap-2">
      <input
        type="text"
        value={comment} // Check if the input field is the target if not leave it empty
        onChange={updateCommentField}
        placeholder="Add comment"
        className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:border-loomin-yellow"
      />

      <button
        type="submit"
        className="px-4 py-1 bg-loomin-yellow text-white rounded-3xl hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange"
      >
        {"Comment"}
      </button>
    </form>
  );
};

export default CreateCommentForm;
