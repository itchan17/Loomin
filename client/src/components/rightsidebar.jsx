import React from "react";
import User from "../assets/charizard.png";
import User2 from "../assets/gengar.png";
import useUserStore from "../stores/UserStore";

const Rightsidebar = ({ isOpen }) => {

  //User state
  const followingToDisplay = useUserStore((state) => state.followingToDisplay);
  const suggestedUser = useUserStore((state) => state.suggestedUser);


  //User state functions
  const followUser = useUserStore((state) => state.followUser);

  const displaySuggestedUser = () => {
    if (!suggestedUser.length) {
      return <div>No users</div>;
    } else {
      return suggestedUser.map((user) => {
        return (
          <div class="flex items-center justify-between pb-3 pt-3 last:pb-0">
            <div class="flex items-center gap-x-3">
              <img
                src={user.profile_picture}
                class="relative inline-block h-8 w-8 rounded-full object-cover object-center"
              />
              <div>
                <h6 class="text-slate-800 font-semibold">{`${user.first_name} ${user.last_name}`}</h6>
              </div>
            </div>
            <button
              onClick={() => followUser(user)}
              className="bx bxs-user-plus text-loomin-orange text-3xl px-2 hover:bg-orange-100 rounded-full cursor-pointer"
            ></button>
          </div>
        );
      });
    }
  };
  const displayFollowing = () => {
    if (!followingToDisplay.length) {
      return <div>No following</div>;
    } else {
      return followingToDisplay.map((following) => (
        <div
          class="flex items-center justify-between pb-3 pt-3 last:pb-0"
          key={following.id} // Assuming `following.id` is unique
        >
          <div class="flex items-center gap-x-3">
            <img
              src={following.profile_picture}
              class="relative inline-block h-8 w-8 rounded-full object-cover object-center"
            />
            <div>
              <h6 class="text-slate-800 font-semibold">{`${following.first_name} ${following.last_name}`}</h6>
            </div>
          </div>
          <button
            onClick={() => followUser(following)}
            className=" border-1 border-orange-300 border text-sm px-4 py-2 hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange rounded-full cursor-pointer"
          >
            <p className=" text-transparent text-base font-semibold bg-clip-text bg-gradient-to-r from-loomin-yellow to-loomin-orange hover:text-white">
              Following
            </p>
          </button>
        </div>
      ));
    }
  };
  return (
    <aside
      id="rightsidebar"
      className={`w-3/12 p-2 bg-WHITE ml-auto from-black to-white border border-gray-200 h-screen transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <div class="relative flex flex-col my-2 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
        <div class="p-4">
          <div class="mb-2 flex items-center justify-between">
            <h5 class="text-slate-800 text-xl font-bold">
              Recommended for you
            </h5>
          </div>
          <div class="divide-y divide-slate-200">{displaySuggestedUser()}</div>
        </div>
      </div>
      <div className="relative flex flex-col my-2 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
        <div className="p-4">
          <div class="mb-2 flex items-center justify-between">
            <h5 class="text-slate-800 text-xl font-bold">Following</h5>
          </div>
          <div class="divide-y divide-slate-200">{displayFollowing()}</div>
        </div>
      </div>
    </aside>
  );
};

export default Rightsidebar;
