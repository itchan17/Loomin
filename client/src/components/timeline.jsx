import React, { useState, useEffect } from "react";
import User from "../assets/shrek.jpg";
import Createpost from "./CreatePostForm";
import Post from "./post";
import placeholder from "../assets/placeholder.png";
import user3 from "../assets/gengar.png";
import usePostStore from "../stores/PostStore";

const Timeline = () => {
  // States
  const posts = usePostStore((state) => state.posts);

  // State functions
  const fetchPosts = usePostStore((state) => state.fetchPosts);

  // Local states
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const displayPosts = () => {
    // Check if posts has value
    if (!posts) {
      return <div>Loading...</div>;
    }

    // Check if array is empty
    if (posts.length === 0) {
      return <div>No posts yet</div>;
    }

    // Display the posts
    return posts.map((post) => (
      <div className="max-w-2xl mx-auto " key={post._id}>
        <Post post={post} />
      </div>
    ));
  };

  return (
    <div className="bg-white-500">
      <div className="mb-2 flex items-center justify-center pr-12">
        <h5 className="text-slate-800 text-4xl pl-12 font-bold mr-auto py-4  antialiased">
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
    </div>
  );
};

export default Timeline;
