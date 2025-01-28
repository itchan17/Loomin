import React, { useState, useEffect } from "react";
import Createpost from "./CreatePostForm";
import Post from "./post";
import usePostStore from "../stores/PostStore";
import InfiniteScroll from "react-infinite-scroll-component";

const Timeline = () => {
  // States
  const posts = usePostStore((state) => state.posts);

  // State functions
  const fetchPosts = usePostStore((state) => state.fetchPosts);
  const clearPosts = usePostStore((state) => state.clearPosts);

  // Local states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      clearPosts();
      fetchPosts(page, setHasMore);
      setIsInitialLoad(false);
      setPage(2);
    }
  }, []);

  const loadMorePosts = async () => {
    try {
      await fetchPosts(page, setHasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const displayPosts = () => {
    return posts.map((post) => <Post post={post} key={post._id} />);
  };

  return (
    <div className="flex-auto bg-loomin-white flex-auto items-center px-auto px-6 pl-11 overflow-y-auto">
      {/* Header of the timeline*/}
      <div className="w-full py-4 mb-2 flex items-center justify-between px-3 md:px-6">
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
          <div className="relative w-full max-w-2xl mx-3">
            <Createpost onClose={toggleModal} />
          </div>
        </div>
      )}

      <div className="px-1 md:px-4 w-full">
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
