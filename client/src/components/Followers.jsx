import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useProfileStore from "../stores/profileStore";

const Followers = () => {
  const [users, setUsers] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const navigate = useNavigate();

  // User store
  const followUser = useUserStore((state) => state.followUser);
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  // Profile store
  const defaultProfileImages = useProfileStore(
    (state) => state.defaultProfileImages
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await axios.get(`/users/followers`);
        console.log(userList);
        setUsers(userList.data.followers);
        setFollowingList(userList.data.userFollowing);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  // Unfollow user
  const handleFollowUnfollow = async (follower) => {
    if (followingList?.includes(follower._id)) {
      const result = await Swal.fire({
        title: "Unfollow User?",
        text: "Are you sure you want to unfollow this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF6F61",
        cancelButtonColor: "#d1d5db",
        confirmButtonText: "Confirm",
        background: "#fff",
        customClass: {
          popup: "rounded-2xl",
          title: "font-bold text-gray-900",
          htmlContainer: "text-gray-600",
          confirmButton: "rounded-full",
          cancelButton: "rounded-full",
        },
      });

      if (result.isConfirmed) {
        followUser(follower);
        setFollowingList(
          followingList.filter((followingId) => followingId !== follower._id)
        );
      }
    } else {
      followUser(follower);
      setFollowingList((prev) => [...prev, follower._id]);
    }
  };

  return (
    <div className="h-[calc(100vh-192px)] overflow-y-auto px-4 py-2">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-min">
        {users &&
          users?.map((user) => (
            <div
              key={user?._id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow flex flex-col justify-between h-[280px]"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={
                    user?.profile_picture
                      ? `http://localhost:3000/${user.profile_picture}`
                      : defaultProfileImages.profile
                  }
                  alt={`${user?.first_name}'s profile`}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
                <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                  {`${user.first_name} ${user.last_name}`}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                  @{user.username}
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/profile/${user.username}`)}
                  className="w-full px-4 py-2 rounded-full bg-[#fff0ed] text-[#FF6F61] text-sm font-medium hover:bg-[#ffe5e1] transition-colors border border-[#ffd4cc]"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleFollowUnfollow(user)}
                  className={`w-full px-4 py-2 rounded-full font-medium ${
                    followingList?.includes(user._id)
                      ? "border border-gray-200 text-gray-700 text-sm hover:bg-gray-100 transition-colors"
                      : "bg-[#FF6F61] text-white text-sm hover:bg-[#ff5c4d] transition-colors"
                  } `}
                >
                  {followingList?.includes(user._id) ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Followers;
