import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.png";
import userIcon from "../assets/user.png";
import ProfilePosts from "./ProfilePosts";
import ProfileAbout from "./ProfileAbout";
import ProfileArchive from "./ProfileArchive";
import EditProfileModal from "./EditProfileModal";
import useProfileStore from "../stores/profileStore";
import useUserStore from "../stores/userStore";
import numeral from "numeral";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showArchiveMenu, setShowArchiveMenu] = useState(false);

  // User store
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const profile = useUserStore((state) => state.profile);

  // Profile store
  const userProfileData = useProfileStore((state) => state.userProfileData);
  const defaultProfileImages = useProfileStore(
    (state) => state.defaultProfileImages
  );

  // Format the number
  const formatNumber = (count) => {
    return count > 1000
      ? numeral(count).format("0.0a")
      : numeral(count).format("0a");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setShowArchiveMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="posts-container"
      className="flex flex-col w-full h-[calc(100vh-4rem)] bg-loomin-white overflow-y-auto"
    >
      <div className="flex flex-col items-center bg-loomin-white">
        <div className="relative w-full px-0 2xl:px-6">
          {/* Banner Image - Full width on mobile and tablet */}
          <img
            src={
              userProfileData?._id === loggedInUser?._id
                ? profile.background_picture
                  ? `http://localhost:3000/${profile.background_picture}`
                  : defaultProfileImages.background
                : userProfileData?.background_picture
                ? `http://localhost:3000/${userProfileData.background_picture}`
                : defaultProfileImages.background
            }
            alt="banner"
            className="h-48 2xl:h-64 w-full object-cover 2xl:rounded-b-lg"
          />

          {/* Profile Info Section */}
          <div className="px-4 2xl:px-6">
            {/* Profile Picture and Info */}
            <div className="flex flex-col 2xl:flex-row 2xl:items-start 2xl:ml-16 gap-4 -mt-10">
              <div className="flex flex-col items-center w-full 2xl:w-auto">
                <img
                  src={
                    userProfileData?._id === loggedInUser?._id
                      ? profile.profile_picture
                        ? `http://localhost:3000/${profile.profile_picture}`
                        : defaultProfileImages.profile
                      : userProfileData?.profile_picture
                      ? `http://localhost:3000/${userProfileData.profile_picture}`
                      : defaultProfileImages.profile
                  }
                  alt="User"
                  className="w-24 h-24 rounded-full shadow-lg mb-2 2xl:mb-0"
                />
                {userProfileData?._id === loggedInUser?._id && (
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="2xl:hidden border border-orange-300 text-sm px-6 py-0.5 h-8 hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange rounded-3xl"
                  >
                    <p className="text-transparent text-base font-semibold bg-clip-text bg-gradient-to-r from-loomin-yellow to-loomin-orange hover:text-white">
                      Edit profile
                    </p>
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2 text-center 2xl:text-left mt-2 2xl:mt-8 flex-1">
                <div className="flex flex-col 2xl:flex-row items-center gap-4 justify-center 2xl:justify-between">
                  <div className="text-center 2xl:text-left">
                    <h1 className="text-2xl font-bold text-black">
                      {userProfileData &&
                        `${userProfileData.first_name} ${userProfileData.last_name}`}
                    </h1>
                    <p className="text-gray-500 font-semibold text-base">
                      {userProfileData && `@${userProfileData.username}`}
                    </p>
                  </div>
                  {userProfileData?._id === loggedInUser?._id && (
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="hidden 2xl:block border border-orange-300 text-sm px-6 py-0.5 h-8 hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange rounded-3xl"
                    >
                      <p className="text-transparent text-base font-semibold bg-clip-text bg-gradient-to-r from-loomin-yellow to-loomin-orange hover:text-white">
                        Edit profile
                      </p>
                    </button>
                  )}
                </div>
                <div className="flex justify-center 2xl:justify-start gap-6 mt-2">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-bold text-lg md:text-xl">
                      {userProfileData &&
                        formatNumber(userProfileData.followers.length)}
                    </span>
                    <span className="text-gray-500 text-sm md:text-base">
                      Followers
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-bold text-lg md:text-xl">
                      {userProfileData &&
                        formatNumber(userProfileData.following.length)}
                    </span>
                    <span className="text-gray-500 text-sm md:text-base">
                      Following
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 px-4 2xl:px-6">
            <hr className="w-full border-t border-gray-400 mb-2" />
            <div className="flex gap-6 p-4 rounded-t-lg">
              <button
                className={`font-semibold text-base md:text-lg ${
                  activeTab === "posts"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("posts")}
              >
                Posts
              </button>
              {userProfileData?._id === loggedInUser?._id && (
                <button
                  className={`font-semibold text-base md:text-lg ${
                    activeTab === "about"
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
              )}
              {userProfileData?._id === loggedInUser?._id && (
                <button
                  className={`font-semibold text-base md:text-lg ${
                    activeTab === "archive"
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("archive")}
                >
                  Archive
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <div className="flex-1 px-4 2xl:px-6 py-4 bg-[#D9D9D9]">
        {activeTab === "posts" && <ProfilePosts />}
        {activeTab === "about" && <ProfileAbout />}

        {activeTab === "archive" && <ProfileArchive />}

      </div>
    </div>
  );
};

export default Profile;
