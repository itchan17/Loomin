import useCommentStore from "../stores/CommentStore";
import React, { useState, useEffect } from "react";

const EditCommentForm = ({
  postId,
  commentId,
  commentToEdit,
  setEditComment,
}) => {
  const [comment, setComment] = useState("");
  const editComment = useCommentStore((state) => state.editComment);

  useEffect(() => {
    setComment(commentToEdit);
  }, []);

  const handleEditComment = async (e) => {
    e.preventDefault();

    await editComment(postId, commentId, comment);
    setEditComment((prevState) => false);
    setComment("");
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
    <form onSubmit={handleEditComment} className="flex gap-2">
      <input
        type="text"
        value={comment} // Check if the input field is the target if not leave it empty
        onChange={updateCommentField}
        placeholder="Add comment"
        className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:border-loomin-yellow"
      />
      <button
        onClick={handleCancel}
        type="button"
        className="px-4 py-1 bg-loomin-yellow text-white rounded-3xl hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange"
      >
        {"Cancel"}
      </button>
      <button
        type="submit"
        className="px-4 py-1 bg-loomin-yellow text-white rounded-3xl hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange"
      >
        {"Save"}
      </button>
    </form>
  );
};

export default EditCommentForm;
