import React, { useState, useEffect } from "react";
import User from "../assets/shrek.jpg";
import Createpost from "./CreatePostForm";
import Post from "./post";
import placeholder from "../assets/placeholder.png";
import user3 from "../assets/gengar.png";
import usePostStore from "../stores/PostStore";
import InfiniteScroll from "react-infinite-scroll-component";

const Timeline = () => {
  // States
  const posts = usePostStore((state) => state.posts);
  const hasMore = usePostStore((state) => state.hasMore);
  const page = usePostStore((state) => state.page);

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
    // Check if posts has value

    // Display the posts
    return posts.map((post) => <Post post={post} key={post._id} />);
  };

  return (
    // Infinite crolling for timeline
    <div
      id="posts-container"
      className="flex flex-col items-center px-5 overflow-y-auto"
    >
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
          <p className="text-center text-gray-500 border-black mb-4">
            You've seen all posts!
          </p>
        }
      >
        {/* Header of the timeline */}
        <div className="py-4 w-full bg-white-500 mb-2 flex items-center justify-between">
          <h5 className="text-slate-800 text-4xl font-bold antialiased">
            Home
          </h5>
          <button
            onClick={toggleModal}
            className="bg-gradient-to-r from-loomin-yellow to-loomin-orange
            text-white font-bold py-1 px-4 rounded-2xl hover:scale-110 transform transition-transform
      "
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

        {displayPosts()}
      </InfiniteScroll>
    </div>
  );
};

export default Timeline;
