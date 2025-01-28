import React, { useState, useEffect } from "react";
import userIcon from "../assets/user.png";
import "boxicons";
import ArchivedPost from "./ArchivedPost";
import useProfileStore from "../stores/profileStore";
import usePostStore from "../stores/PostStore";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

const ProfileArchive = () => {
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
  const archivedPosts = usePostStore((state) => state.archivedPosts);
  const fetchArchivedPosts = usePostStore((state) => state.fetchArchivedPosts);
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
      fetchArchivedPosts(1, setHasMore, userProfileData._id);
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
      await fetchArchivedPosts(page, setHasMore, userProfileData._id);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const displayPosts = () => {
    return archivedPosts.map((post) => (
      <ArchivedPost post={post} key={post._id} />
    ));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-[#D9D9D9]">
      {/* Left side - Details - Hidden on desktop */}

      {/* Right side - Posts */}
      <div className="flex-1">
        {/* Mobile Details Card */}

        {/* Posts */}
        <InfiniteScroll
          dataLength={archivedPosts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          scrollableTarget="posts-container"
          loader={
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          }
          endMessage={
            !archivedPosts.length ? (
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

export default ProfileArchive;
