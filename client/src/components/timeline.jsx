import React, { useState, useEffect } from "react";
import User from "../assets/shrek.jpg";
import Createpost from "./createpost";
import Post from "./post";
import placeholder from "../assets/placeholder.png";
import user3 from "../assets/gengar.png";
import postStore from "../stores/postStore";

const Timeline = () => {
  const store = postStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    store.fetchPosts();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const displayPosts = () => {};

  return (
    <div className="bg-white-500">
      <div class="mb-2 flex items-center justify-center pr-12">
        <h5 class="text-slate-800 text-4xl pl-12 font-bold mr-auto py-4  antialiased">
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
      {store.posts
        ? store.posts.map((post) => {
            return (
              <div className="max-w-2xl mx-auto">
                <Post post={post} key={post._id} />
              </div>
            );
          })
        : "No post yet"}
    </div>
  );
};

export default Timeline;
