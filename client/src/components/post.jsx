import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dropdown from "./PostDropdown";
import useCommentStore from "../stores/CommentStore";
import useUserStore from "../stores/userStore";
import usePostStore from "../stores/PostStore";
import useNotificationStore from "../stores/notificationStore";
import numeral from "numeral";
import testImage from "../assets/placeholder.png";
import CreateCommentForm from "./CreateCommentForm";
import EditCommentForm from "./EditCommentForm";
import InfiniteScroll from "react-infinite-scroll-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slick-custom.css";
import useProfileStore from "../stores/profileStore";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();
  //Notification state
  const makeNotification = useNotificationStore(
    (state) => state.makeNotification
  );

  // Profile store
  const defaultProfileImages = useProfileStore(
    (state) => state.defaultProfileImages
  );

  //User state
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const following = useUserStore((state) => state.following);
  const isLoading = useUserStore((state) => state.isLoading);

  //User state functions
  const followUser = useUserStore((state) => state.followUser);
  const setFollowingToDisplay = useUserStore(
    (state) => state.setFollowingToDisplay
  );
  const profile = useUserStore((state) => state.profile);

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

  useEffect(() => {
    setLikesCount(post.likes.length);
    setCommentsCount(post.comments.length);
    checkIfLiked();
  }, [loggedInUser]);

  // Format the number
  const formatNumber = (count) => {
    return count > 1000
      ? numeral(count).format("0.0a")
      : numeral(count).format("0a");
  };
  const toggleFollow = () => {
    followUser(post.creator);

    if (!following.includes(post.creator._id)) {
      makeNotification(
        loggedInUser._id,
        post.creator._id,
        null,
        "follow",
        `just followed you!`
      );
    }
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
      console.log("Like");

      //Like post
      setIsLiked(!isLiked);
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
      }, 1000);

      // Function for liking and unliking
      likeUnlikePost(post._id);

      // Add 1 to the likesCount state
      setLikesCount(likesCount + 1);

      // Make notification
      if (loggedInUser._id !== post.creator._id) {
        makeNotification(
          loggedInUser._id,
          post.creator._id,
          post._id,
          "like",
          `liked your post.`
        );
      }
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
      // Like post
      setIsLiked(!isLiked);
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
      }, 1000);

      // Function for liking and unliking
      likeUnlikePost(post._id);

      // Add 1 to the likesCount state
      setLikesCount(likesCount + 1);

      if (loggedInUser._id !== post.creator._id) {
        makeNotification(
          loggedInUser._id,
          post.creator._id,
          post._id,
          "like",
          `liked your post.`
        );
      }
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

    // If we have comments, map and display them
    return comments.map((comment) => (
      <div key={comment._id} className="flex items-start space-x-3 mb-2">
        <img
          src={
            comment.user_id.profile_picture
              ? `http://localhost:3000/${comment.user_id.profile_picture}`
              : null // Add default image here
          }
          alt={`${comment.user_id.first_name} ${comment.user_id.last_name}`}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 flex flex-col">
          <span className="font-semibold mr-2">
            {`${comment.user_id.first_name} ${comment.user_id.last_name}`}
          </span>
          <span className="text-gray-500">{comment.comment}</span>
          <div className="flex gap-3 items-end">
            <p className="font-thin text-sm text-gray-400">
              {timeAgo(comment.createdAt)}
            </p>
            {loggedInUser._id === comment.user_id._id ? (
              <div className="space-x-3">
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
              </div>
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

  const SimpleSlider = () => {
    const settings = {
      arrows: post.images.length > 1,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
    };
    return (
      <div className="slider-container group">
        <Slider {...settings}>
          {post.images.map((image) => (
            <div className="aspect-video w-full">
              <img
                src={`http://localhost:3000/${image}`}
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  return (
    <div
      className="border-b md:border rounded-xl md:rounded-2xl mx-auto md:max-w-2xl mb-4 md:mb-6 bg-white shadow-md md:shadow-sm"
      key={post._id}
    >
      <div className="bg-white md:shadow-lg rounded-xl md:rounded-2xl w-full">
        <div className="flex items-center p-3 md:p-4">
          <img
            onClick={() => {
              navigate(`/profile/${post.creator.username}`);
            }}
            src={
              loggedInUser._id === post.creator._id
                ? profile?.profile_picture
                  ? `http://localhost:3000/${profile.profile_picture}`
                  : post.creator.profile_picture
                  ? `http://localhost:3000/${post.creator.profile_picture}`
                  : defaultProfileImages.profile
                : post.creator.profile_picture
                ? `http://localhost:3000/${post.creator.profile_picture}`
                : defaultProfileImages.profile
            }
            alt={`${post.creator.first_name} ${post.creator.last_name}`}
            className="w-10 h-10 rounded-full cursor-pointer object-cover"
          />
          <div className="ml-2 flex flex-col">
            <div className="flex gap-1 items-center">
              <span
                onClick={() => {
                  navigate(`/profile/${post.creator.username}`);
                }}
                className="font-semibold cursor-pointer hover:underline"
              >{`${post.creator.first_name} ${post.creator.last_name}`}</span>
              {loggedInUser._id !== post.creator._id && (
                <>
                  <span>·</span>
                  <span
                    onClick={toggleFollow}
                    className="text-sm text-loomin-orange font-semibold cursor-pointer"
                  >
                    {following.includes(post.creator._id)
                      ? "Following"
                      : "Follow"}
                  </span>
                </>
              )}
            </div>
            <span
              onClick={() => {
                navigate(`/profile/${post.creator.username}`);
              }}
              className="-mt-1 text-sm cursor-pointer hover:underline"
            >{`@${post.creator.username}`}</span>
          </div>
          {post.creator._id === loggedInUser._id ? (
            <Dropdown post={post}></Dropdown>
          ) : (
            ""
          )}
        </div>
        <p className="mt-1 px-4 md:px-6 mb-2 text-semibold antialiased break-words whitespace-pre-wrap">
          {post.content}
        </p>
        <div onDoubleClick={handleDoubleTap}>
          {post.images.length > 0 ? (
            <div className="w-full">
              <SimpleSlider />
            </div>
          ) : null}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute  inset-0 flex items-center justify-center"
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

        <div className="px-4 md:px-6 py-3">
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
        {/* Comments section */}
        {showComments && (
          <div className="px-4 md:px-6 pb-4">
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
                post={post}
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
