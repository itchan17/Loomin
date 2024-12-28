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
import InfiniteScroll from "react-infinite-scroll-component";

const Post = ({ post }) => {
  //User state
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  //User state functions
  const followUser = useUserStore((state) => state.followUser);

  // Comment state functions
  const fetchComments = useCommentStore((state) => state.fetchComments);
  const deleteComment = useCommentStore((state) => state.deleteComment);

  // Post state functions
  const likeUnlikePost = usePostStore((state) => state.likeUnlikePost);

  //Local states
  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [editComment, setEditComment] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    setLikesCount(post.likes.length);
    setCommentsCount(post.comments.length);
    checkIfLiked();

    if (loggedInUser.following.includes(post.creator._id)) {
      setFollow(!follow);
    }
  }, []);

  // Format the number
  const formatNumber = (count) => {
    return count > 1000
      ? numeral(count).format("0.0a")
      : numeral(count).format("0a");
  };
  const toggleFollow = () => {
    setFollow(!follow);
    followUser(post.creator._id);
  };
  // Liking post functions
  // Check if the user liked the post then set isLiked to true the component renders
  const checkIfLiked = () => {
    if (post.likes.includes(loggedInUser._id)) {
      setIsLiked(true);
    }
  };

  // Handle the like button
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

  // Comments functions
  // Handle toggle comment button
  const toggleCommentBtn = async () => {
    setShowComments(!showComments);
    if (!showComments) {
      // console.log(`Fetch Comment`);
      await fetchComments(post._id, setComments, page, setHasMore);
      setPage(page + 1);
    }
  };

  const loadMoreComments = () => {
    setTimeout(async () => {
      await fetchComments(post._id, setComments, page, setHasMore);
      setPage(page + 1);
    }, 500);
  };

  const displayComments = () => {
    // First check if comments and postId exist
    if (!comments) {
      return <div>Loading...</div>;
    }

    // Then check the length
    if (comments.length === 0) {
      return <div>No comments.</div>;
    }
    console.log(comments);
    // If we have comments, map and display them
    return comments.map((comment) => (
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
    await deleteComment(postId, commentId, setComments);
    setCommentsCount((state) => state - 1);
  };

  // Toggle edit comment
  const toggleEditComment = (comment) => {
    setEditComment(true);
    setCommentToEdit(comment.comment);
    setCommentId(comment._id);
  };
  return (
    <div className="border rounded-2xl max-w-2xl mb-6" key={post._id}>
      <div className="bg-white shadow-md rounded-2xl  w-full">
        <div className="flex items-center p-4">
          <img
            src={post.creator.profile_picture}
            alt={`${post.creator.first_name} ${post.creator.last_name}`}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <div className="ml-2 flex flex-col">
            <div className="flex gap-1 items-center">
              <span className="font-semibold cursor-pointer">{`${post.creator.first_name} ${post.creator.last_name}`}</span>
              {loggedInUser._id !== post.creator._id && (
                <>
                  <span>·</span>
                  <span
                    onClick={toggleFollow}
                    className="text-sm text-loomin-orange font-semibold cursor-pointer"
                  >
                    {follow ? "Following" : "Follow"}
                  </span>
                </>
              )}
            </div>
            <span className="-mt-1 text-sm cursor-pointer">{`@${post.creator.username}`}</span>
          </div>
          {post.creator._id === loggedInUser._id ? (
            <Dropdown post={post}></Dropdown>
          ) : (
            ""
          )}
        </div>
        <p className="mt-2 pl-8 mb-2 text-semibold antialiased">
          {post.content}
        </p>

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
            <div
              id="comments-container"
              className="max-h-40 overflow-y-auto mb-4"
            >
              <InfiniteScroll
                dataLength={comments.length}
                next={loadMoreComments}
                hasMore={hasMore}
                scrollableTarget="comments-container"
                loader={
                  <div className="flex justify-center mb-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                }
              >
                {displayComments()}
              </InfiniteScroll>
            </div>

            {!editComment ? (
              <CreateCommentForm
                postId={post._id}
                setCommentsCount={setCommentsCount}
                setComments={setComments}
              ></CreateCommentForm>
            ) : (
              <EditCommentForm
                postId={post._id}
                commentId={commentId}
                commentToEdit={commentToEdit}
                setEditComment={setEditComment}
                setComments={setComments}
              ></EditCommentForm>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
