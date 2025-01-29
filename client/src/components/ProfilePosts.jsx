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

  const DetailsCard = () => (
    <div className="bg-white rounded-lg shadow p-4 sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Details</h2>
      <div className="space-y-4">
        {userProfileData?.hometown && (
          <div className="flex gap-2">
            <i className="bx bxs-map text-gray-500 text-2xl font-medium font-bold"></i>
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium font-semibold">
                {userProfileData?.hometown}
              </span>
              <span className="text-sm text-gray-400 font-semibold">
                Hometown
              </span>
            </div>
          </div>
        )}

        {userProfileData?.school && (
          <div className="flex gap-2 ">
            <i className="bx bxs-book text-gray-500 text-2xl font-medium font-bold"></i>
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium font-semibold">
                {userProfileData?.school}
              </span>
              <span className="text-sm text-gray-400 font-semibold">
                Education
              </span>
            </div>
          </div>
        )}
        {userProfileData?.work?.position && (
          <div className="flex gap-2 ">
            <i className="bx bxs-briefcase text-gray-500 text-2xl font-medium font-bold"></i>
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium font-semibold">
                {userProfileData?.work?.position}
              </span>
              <span className="text-sm text-gray-400 font-semibold">Work</span>
            </div>
          </div>
        )}
        {userProfileData?.date_of_birth && (
          <div className="flex gap-2 ">
            <i className="bx bxs-cake text-gray-500 text-2xl font-medium font-bold"></i>
            <div className="flex flex-col">
              <p className="text-gray-800 font-medium">
                {new Date(userProfileData.date_of_birth).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <span className="text-sm text-gray-400 font-semibold">
                Birthday
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-[#D9D9D9] px-4 md:px-8 max-w-7xl mx-auto">
      {/* Left side - Details - Hidden on desktop */}
      <div className="hidden md:block md:w-1/3 lg:w-1/4">
        <DetailsCard />
      </div>

      {/* Right side - Posts */}
      <div className="flex-1 w-full max-w-3xl mx-auto">
        {/* Mobile Details Card */}
        <div className="block md:hidden mb-4">
          <DetailsCard />
        </div>

        {/* Posts */}
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          scrollableTarget="posts-container"
          className="w-full"
          loader={
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          }
          endMessage={
            !posts.length ? (
              <div className="flex items-center justify-center p-4">
                <div>
                  <p className="text-center text-gray-500">No posts yet!</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 border-black mb-4 p-4">
                You've seen all posts!
              </p>
            )
          }
        >
          <div className="space-y-4">{displayPosts()}</div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProfilePosts;
