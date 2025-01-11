import React, { useState, useEffect } from "react";
import userIcon from "../assets/user.png";
import "boxicons";
import Post from "./post";
import useProfileStore from "../stores/profileStore";
import usePostStore from "../stores/PostStore";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

const ProfilePosts = () => {
  // Get the username in the parameter
  const { username } = useParams();

  // Profile store
  const userProfileData = useProfileStore((state) => state.userProfileData);
  const profileInitialLoad = useProfileStore(
    (state) => state.profileInitialLoad
  );
  const setProfileInitialLoad = useProfileStore(
    (state) => state.setProfileInitialLoad
  );

  // Post store
  const posts = usePostStore((state) => state.posts);
  const fetchProfilePosts = usePostStore((state) => state.fetchProfilePosts);
  const clearPosts = usePostStore((state) => state.clearPosts);

  // Local states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch the posts of the user
  useEffect(() => {
    // Check first if the userProfileData has value
    // Check if its inital load
    // Check ig the current username of userProfileData is same in the params
    if (
      userProfileData &&
      profileInitialLoad &&
      userProfileData.username === username
    ) {
      console.log(userProfileData._id);
      console.log("This is running");
      clearPosts();
      fetchProfilePosts(1, setHasMore, userProfileData._id);
      setProfileInitialLoad(false);
      setPage(2);
    }
  }, [userProfileData, profileInitialLoad, username]);

  useEffect(() => {
    // This cleanup function remove the post and set initial load to true if the component unmount
    return () => {
      clearPosts();
      setProfileInitialLoad(true);
    };
  }, [clearPosts]);

  const loadMorePosts = async () => {
    try {
      await fetchProfilePosts(page, setHasMore, userProfileData._id);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const displayPosts = () => {
    return posts.map((post) => <Post post={post} key={post._id} />);
  };
  return (
    <div className="flex gap-8 bg-[#D9D9D9]">
      {/* Left side - Details */}
      <div className="w-1/3">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <i className="bx bx-map text-gray-500 text-xl"></i>
              <span className="text-gray-600">Amsterdam, Netherlands</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bx-book text-gray-500 text-xl"></i>
              <span className="text-gray-600">University of Amsterdam</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bx-briefcase text-gray-500 text-xl"></i>
              <span className="text-gray-600">Fishball Chef</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bx-calendar text-gray-500 text-xl"></i>
              <span className="text-gray-600">January 17, 1999</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Posts */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center gap-3">
            <img src={userIcon} alt="User" className="w-10 h-10 rounded-full" />
            <input
              type="text"
              placeholder="What's on your mind? Share your thoughts, moments, or creativity with the world!"
              className="w-full p-2 bg-gray-100 rounded-lg"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button className="flex items-center gap-2 text-gray-500">
              <i className="bx bx-image-alt text-xl"></i>
              Photo
            </button>
          </div>
        </div>

        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          scrollableTarget="posts-container"
          loader={
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          }
          endMessage={
            !posts.length ? (
              <div className="flex items-center justify-center">
                <div>
                  <p className="text-center text-gray-500">No posts yet!</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 border-black mb-4">
                You've seen all posts!
              </p>
            )
          }
        >
          {displayPosts()}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProfilePosts;
