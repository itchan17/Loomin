import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dropdown from "./PostDropdown";
import useCommentStore from "../stores/CommentStore";
import useUserStore from "../stores/UserStore";
import usePostStore from "../stores/PostStore";
import numeral from "numeral";
import testImage from "../assets/placeholder.png";
import CreateCommentForm from "./CreateCommentForm";
import EditCommentForm from "./EditCommentForm";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [editComment, setEditComment] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState("");
  const [commentId, setCommentId] = useState(null);

  //User state
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  // Comment states
  const comments = useCommentStore((state) => state.comments);

  // Comment state functions
  const fetchComments = useCommentStore((state) => state.fetchComments);
  const deleteComment = useCommentStore((state) => state.deleteComment);

  // Post state functions
  const likeUnlikePost = usePostStore((state) => state.likeUnlikePost);

  useEffect(() => {
    setLikesCount(post.likes.length);
    setCommentsCount(post.comments.length);
    checkIfLiked();
  }, []);

  // Check if the user liked the post then set isLiked to true the component renders
  const checkIfLiked = () => {
    if (post.likes.includes(loggedInUser._id)) {
      setIsLiked(true);
    }
  };
  // Format the number
  const formatNumber = (count) => {
    return count > 1000
      ? numeral(count).format("0.0a")
      : numeral(count).format("0a");
  };

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(!isLiked);
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
      }, 1000);

      // Function for liking and unliking
      likeUnlikePost(post._id);

      // Add 1 to the likesCount state
      setLikesCount(likesCount + 1);
    } else {
      setIsLiked(!isLiked);

      // Function for liking and unliking
      likeUnlikePost(post._id);

      // Reduce 1 to the likesCount state
      setLikesCount(likesCount - 1);
    }
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(!isLiked);
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
      }, 1000);

      // Function for liking and unliking
      likeUnlikePost(post._id);

      // Add 1 to the likesCount state
      setLikesCount(likesCount + 1);
    } else {
      setIsLiked(!isLiked);

      // Function for liking and unliking
      likeUnlikePost(post._id);

      // Reduce 1 to the likesCount state
      setLikesCount(likesCount - 1);
    }
  };

  const toggleCommentBtn = () => {
    setShowComments(!showComments);
    if (!showComments) {
      // console.log(`Fetch Comment`);
      fetchComments(post._id);
    }
  };

  const displayComments = () => {
    // First check if comments and postId exist
    if (!comments || !comments[post._id]) {
      return <div>Loading...</div>;
    }

    // Then check the length
    if (comments[post._id].length === 0) {
      return <div>No comments.</div>;
    }

    // If we have comments, map and display them
    return comments[post._id]?.map((comment) => (
      <div key={comment._id} className="flex items-start space-x-3 mb-2">
        <img
          src={comment.user_id.profile_picture}
          alt={`${comment.user_id.first_name} ${comment.user_id.last_name}`}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 flex flex-col">
          <span className="font-semibold mr-2">
            {`${comment.user_id.first_name} ${comment.user_id.last_name}`}
          </span>
          <span className="text-gray-500">{comment.comment}</span>
          <div className="flex gap-6">
            <p className="font-thin text-sm text-gray-400">11m</p>
            {loggedInUser._id === comment.user_id._id ? (
              <>
                <a
                  onClick={() => toggleEditComment(comment)}
                  className="font-thin text-sm text-gray-400 underline cursor-pointer"
                >
                  Edit
                </a>
                <a
                  className="font-thin text-sm text-gray-400 underline cursor-pointer"
                  onClick={() => handleDeleteComment(post._id, comment._id)}
                >
                  Delete
                </a>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    ));
  };

  const handleDeleteComment = async (postId, commentId) => {
    await deleteComment(postId, commentId);
    setCommentsCount((state) => state - 1);
  };

  // Toggle edit comment
  const toggleEditComment = (comment) => {
    setEditComment(true);
    setCommentToEdit(comment.comment);
    setCommentId(comment._id);
  };
  return (
    <div className="bg-white rounded-2xl shadow-md mb-6 w-full" key={post._id}>
      <div className="flex items-center p-4">
        <img
          src={post.creator.profile_picture}
          alt={`${post.creator.first_name} ${post.creator.last_name}`}
          className="w-10 h-10 rounded-full"
        />
        <span className="ml-3 font-semibold">{`${post.creator.first_name} ${post.creator.last_name}`}</span>
        {post.creator._id === loggedInUser._id ? (
          <Dropdown post={post}></Dropdown>
        ) : (
          ""
        )}
      </div>
      <p className="mt-2 pl-8 mb-2 text-semibold antialiased">{post.content}</p>

      <div className="relative " onDoubleClick={handleDoubleTap}>
        {testImage ? (
          <img
            src={testImage}
            alt="Post content"
            className="w-11/12 mx-7 rounded-2xl justify-center"
          />
        ) : null}

        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                <i className="bx bxs-heart text-6xl text-red-500 opacity-80"></i>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 pl-8">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <button onClick={handleLike}>
              <i
                className={`bx ${
                  isLiked ? "bxs-heart text-red-500" : "bx-heart"
                } text-2xl`}
              ></i>
            </button>
            {likesCount > 0 ? <span>{formatNumber(likesCount)}</span> : ""}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={toggleCommentBtn}>
              <i className="bx bx-comment text-2xl"></i>
            </button>
            {commentsCount > 0 ? (
              <span>{formatNumber(commentsCount)}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* Check if showComments is true, then display the comments the comment text field */}
      {showComments && (
        <div className="px-4 pb-4">
          <div className="max-h-40 overflow-y-auto mb-4">
            {displayComments()}
          </div>
          {!editComment ? (
            <CreateCommentForm
              postId={post._id}
              setCommentsCount={setCommentsCount}
            ></CreateCommentForm>
          ) : (
            <EditCommentForm
              postId={post._id}
              commentId={commentId}
              commentToEdit={commentToEdit}
              setEditComment={setEditComment}
            ></EditCommentForm>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
