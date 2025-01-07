import React, { useState, useEffect } from "react";
import Createpost from "./CreatePostForm";
import Post from "./post";
import usePostStore from "../stores/PostStore";
import InfiniteScroll from "react-infinite-scroll-component";

const Timeline = () => {
  // States
  const posts = usePostStore((state) => state.posts);
  const hasMore = usePostStore((state) => state.hasMore);

  // State functions
  const fetchPosts = usePostStore((state) => state.fetchPosts);

  // Local states
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const loadMorePosts = () => {
    setTimeout(async () => {
      await fetchPosts();
    }, 500);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const displayPosts = () => {
    return posts.map((post) => <Post post={post} key={post._id} />);
  };

  return (
    // Infinite crolling for timeline
    <div
      id="posts-container"
      className="flex-auto flex flex-col items-center px-4 overflow-y-auto"
    >
      {/* Header of the timeline*/}
      <div className="w-full max-w-2xl py-4 mb-2 flex items-center justify-between">
        <h5 className="text-slate-800 text-4xl font-bold antialiased">Home</h5>
        <button
          onClick={toggleModal}
          className="bg-gradient-to-r from-loomin-yellow to-loomin-orange
          text-white font-bold py-1 px-4 rounded-2xl hover:scale-105 transform transition-transform"
        >
          <i className="bx bx-plus font-sans"></i>
          Post
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-2xl">
            <Createpost onClose={toggleModal} />
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
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

export default Timeline;
