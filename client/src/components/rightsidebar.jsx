import React from "react";
import useUserStore from "../stores/UserStore";

const RightSideBar = () => {
  const suggestedUser = useUserStore((state) => state.suggestedUser);
  const followingToDisplay = useUserStore((state) => state.followingToDisplay);
  const followUser = useUserStore((state) => state.followUser);

  const displaySuggestedUser = () => {
    if (!suggestedUser.length) {
      return <div>No users</div>;
    }
    return suggestedUser.map((user) => (
      <div key={user._id} className="flex items-center justify-between pb-3 pt-3 last:pb-0">
        <div className="flex items-center gap-x-3">
          <img
            src={user.profile_picture}
            className="relative inline-block h-8 w-8 rounded-full object-cover object-center"
            alt={`${user.first_name} ${user.last_name}`}
          />
          <div>
            <h6 className="text-slate-800 font-semibold">
              {`${user.first_name} ${user.last_name}`}
            </h6>
          </div>
        </div>
        <button
          onClick={() => followUser(user)}
          className="bx bxs-user-plus text-loomin-orange text-3xl px-2 hover:bg-orange-100 rounded-full cursor-pointer"
        ></button>
      </div>
    ));
  };

  const displayFollowing = () => {
    if (!followingToDisplay.length) {
      return <div>No following</div>;
    }
    return followingToDisplay.map((following) => (
      <div
        className="flex items-center justify-between pb-3 pt-3 last:pb-0"
        key={following._id}
      >
        <div className="flex items-center gap-x-3">
          <img
            src={following.profile_picture}
            className="relative inline-block h-8 w-8 rounded-full object-cover object-center"
            alt={`${following.first_name} ${following.last_name}`}
          />
          <div>
            <h6 className="text-slate-800 font-semibold">
              {`${following.first_name} ${following.last_name}`}
            </h6>
          </div>
        </div>
        <button
          onClick={() => followUser(following)}
          className="border border-orange-300 text-sm px-4 py-2 hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange rounded-full cursor-pointer group"
        >
          <p className="text-transparent text-base font-semibold bg-clip-text bg-gradient-to-r from-loomin-yellow to-loomin-orange group-hover:text-white">
            Following
          </p>
        </button>
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Recommended Users Section */}
      <div className="relative flex flex-col mb-4 bg-white shadow-sm border border-slate-200 rounded-lg">
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h5 className="text-slate-800 text-xl font-bold">
              Recommended for you
            </h5>
          </div>
          <div className="divide-y divide-slate-200">
            {displaySuggestedUser()}
          </div>
        </div>
      </div>

      {/* Following Section */}
      <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h5 className="text-slate-800 text-xl font-bold">Following</h5>
          </div>
          <div className="divide-y divide-slate-200">
            {displayFollowing()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
