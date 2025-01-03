import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import commentStore from "../stores/commentStore";
import Dropdown from "./dropdown";
import Testimg from "../assets/placeholder.png";
import Testimg2 from "../assets/shrek.jpg";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, username: "user12345", text: "Testing lang" },
    { id: 2, username: "user54321", text: "oks!" },
  ]);
  const comment_store = commentStore();

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
      comment_store.fetchComments(post._id);
    }
  };

  const displayComments = (comments, postId) => {
    // First check if comments and postId exist
    if (!comments || !comments[postId]) {
      return <div>Loading...</div>;
    }

    // Then check the length
    if (comments[postId].length === 0) {
      return <div>No comments.</div>;
    }

    // If we have comments, map and display them
    return comments[post._id]?.map((comment) => (
      <div key={comment._id} className="flex items-start space-x-3 mb-2">
        <img
          src={post.creator.profile_picture}
          alt={`${post.creator.first_name} ${post.creator.last_name}`}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 flex flex-col">
          <span className="font-semibold mr-2">
            {`${comment.user_id.first_name} ${comment.user_id.last_name}`}
          </span>
          <span className='text-gray-500'>{comment.comment}</span>
          <div className="flex gap-6">
            <p className="font-thin text-sm text-gray-400">11m</p>
            <a href className="font-thin text-sm text-gray-400 underline cursor-pointer">Edit</a>
            <a href className="font-thin text-sm text-gray-400 underline cursor-pointer">Delete</a>
          </div>
        </div>
      </div>
    ));

  };
  return (
    <div className="bg-loomin-white rounded-3xl shadow-lg  border border-gray-200 mb-6 w-full" key={post._id}>
      <div className="flex items-center py-4 pb-2 px-7 ">
        <img
          src={post.creator.profile_picture || Testimg2}
          alt={`${post.creator.first_name} ${post.creator.last_name}`}
          className="w-12 h-12 rounded-full"
        />
        <span className="ml-3 font-semibold">{`${post.creator.first_name} ${post.creator.last_name}`}</span>
        <Dropdown></Dropdown>
      </div>
      <p className="mt-2 pl-8 mb-2 text-semibold antialiased">{post.content}</p>

      <div className="relative " onDoubleClick={handleDoubleTap}>
       {/*} {post.images[0] ? (
          <img
            src={Testimg}
            alt="Post content"
            className="w-11/12 mx-7 rounded-2xl justify-center"
          />
        ) : null}*/}

        <img
          src={Testimg}
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
              className={`bx ${isLiked ? "bxs-heart text-red-500" : "bx-heart"
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
          <div className="col-span-1 max-h-40 overflow-y-auto mb-4">
            {displayComments(comment_store.comments, post._id)}
          </div>
          <form
            onSubmit={(e) => comment_store.createComment(e, post._id)}
            className="flex gap-2"
          >
            <input
              key={post._id}
              type="text"
              value={
                comment_store.targetPost === post._id
                  ? comment_store.comment
                  : ""
              } // Check if the input field is the target if not leave it empty
              onChange={(e) => comment_store.updateCommentField(e, post._id)}
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
