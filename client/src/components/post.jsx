import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCommentStore from "../stores/CommentStore";
const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Comment states
  const comments = useCommentStore((state) => state.comments);
  const comment = useCommentStore((state) => state.comment);
  const targetPost = useCommentStore((state) => state.targetPost);

  // State functions
  const createComment = useCommentStore((state) => state.createComment);
  const fetchComments = useCommentStore((state) => state.fetchComments);
  const updateCommentField = useCommentStore(
    (state) => state.updateCommentField
  );

  const handleLike = () => {
    setIsLiked(!isLiked);
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 1000);
  };

  const handleDoubleTap = () => {
    setIsLiked(true);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
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
    return comments[post._id].map((comment) => (
      <div key={comment._id} className="mb-2">
        <span className="font-semibold mr-2">
          {`${comment.user_id.first_name} ${comment.user_id.last_name}`}:
        </span>
        {comment.comment}
      </div>
    ));
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
      </div>
      <p className="mt-2 pl-8 mb-2 text-semibold antialiased">{post.content}</p>

      <div className="relative " onDoubleClick={handleDoubleTap}>
        {post.images[0] ? (
          <img
            src={post.images[0]}
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
          <button onClick={handleLike}>
            <i
              className={`bx ${
                isLiked ? "bxs-heart text-red-500" : "bx-heart"
              } text-2xl`}
            ></i>
          </button>
          <button onClick={toggleCommentBtn}>
            <i className="bx bx-comment text-2xl"></i>
          </button>
        </div>
      </div>
      {/* Check if showComments is true, then display the comments the comment text field */}
      {showComments && (
        <div className="px-4 pb-4">
          <div className="max-h-40 overflow-y-auto mb-4">
            {displayComments()}
          </div>
          <form
            onSubmit={(e) => createComment(e, post._id)}
            className="flex gap-2"
          >
            <input
              key={post._id}
              type="text"
              value={targetPost === post._id ? comment : ""} // Check if the input field is the target if not leave it empty
              onChange={(e) => updateCommentField(e, post._id)}
              placeholder="Add comment"
              className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:border-loomin-yellow"
            />
            <button
              type="submit"
              className="px-4 py-1 bg-loomin-yellow text-white rounded-3xl hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
