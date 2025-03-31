import useCommentStore from "../stores/CommentStore";
import React, { useState, useEffect } from "react";

const EditCommentForm = ({
  postId,
  commentId,
  commentToEdit,
  setEditComment,
  setComments,
}) => {
  const [comment, setComment] = useState("");
  const editComment = useCommentStore((state) => state.editComment);

  useEffect(() => {
    setComment(commentToEdit);
  }, []);

  const handleEditComment = async (e) => {
    e.preventDefault();

    if (comment.trim()) {
      await editComment(postId, commentId, comment, setComments);
      setEditComment((prevState) => false);
      setComment("");
    }
  };

  const updateCommentField = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleCancel = () => {
    setComment("");
    setEditComment((prevState) => false);
  };
  return (
    <form
      onSubmit={handleEditComment}
      className="flex flex-col sm:flex-row gap-2"
    >
      <input
        type="text"
        value={comment}
        onChange={updateCommentField}
        placeholder="Add comment"
        className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:border-loomin-yellow"
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={handleCancel}
          type="button"
          className="px-3 sm:px-4 py-1 bg-loomin-yellow text-white rounded-3xl hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 sm:px-4 py-1 bg-loomin-yellow text-white rounded-3xl hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange text-sm sm:text-base"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditCommentForm;
