import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import placeholder from "../assets/placeholder.png";
import userImage from "../assets/shrek.jpg";

const Post = ({ username, userImage, postImage, caption }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, username: "user12345", text: "Testing lang" },
    { id: 2, username: "user54321", text: "oks!" },
  ]);
  const [newComment, setNewComment] = useState("");

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

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, username: "currentUser", text: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md mb-6 w-full">
      <div className="flex items-center p-4">
        <img
          src={userImage}
          alt={username}
          className="w-10 h-10 rounded-full"
        />
        <span className="ml-3 font-semibold">{username}</span>
      </div>
      <p className="mt-2 pl-8 mb-2 text-semibold antialiased">{caption}</p>

      <div className="relative " onDoubleClick={handleDoubleTap}>
        <img
          src={placeholder}
          alt="Post content"
          className="w-11/12 mx-7 rounded-2xl justify-center"
        />

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
          <button onClick={() => setShowComments(!showComments)}>
            <i className="bx bx-comment text-2xl"></i>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="px-4 pb-4">
          <div className="max-h-40 overflow-y-auto mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-2">
                <span className="font-semibold mr-2">{comment.username}</span>
                {comment.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
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
