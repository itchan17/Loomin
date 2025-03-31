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

const ArchivedPost = ({ post }) => {
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

  //Local states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
      <div className="group">
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
  return (
    <div
      className="border-b md:border py-4 rounded-lg w-[98%] mx-auto md:max-w-2xl mb-4 md:mb-6 bg-white shadow-md md:shadow-sm"
      key={post._id}
    >
      <div className="bg-white rounded-xl md:rounded-2xl w-full">
        <div className="flex items-center p-3 md:p-4">
          <img
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
              <span className="font-semibold cursor-pointer">{`${post.creator.first_name} ${post.creator.last_name}`}</span>
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
            <span className="-mt-1 text-sm cursor-pointer">{`@${post.creator.username}`}</span>
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
        <div className="relative">
          {post.images.length > 0 ? (
            <div className="w-full">
              <SimpleSlider />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ArchivedPost;
