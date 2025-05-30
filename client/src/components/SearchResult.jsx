import React, { useState, useEffect } from "react";
import useChatStore from "../stores/chatStore";
import useUserStore from "../stores/UserStore";
import useProfileStore from "../stores/profileStore";

const SearchResult = ({ user }) => {
  const createChat = useChatStore((state) => state.createChat);
  const clearInboxSearchTerm = useChatStore(
    (state) => state.clearInboxSearchTerm
  );

  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  // Profile store
  const defaultProfileImages = useProfileStore(
    (state) => state.defaultProfileImages
  );

  const handleClickChat = (firstId, secondId) => {
    createChat(firstId, secondId);
    clearInboxSearchTerm();
  };
  return (
    <div
      onClick={() => handleClickChat(loggedInUser._id, user._id)}
      key={user._id}
      className={`flex px-2 py-3 gap-4 items-center rounded cursor-pointer hover:bg-[#f3f4f6]`}
    >
      <img
        src={
          user?.profile_picture
            ? `http://localhost:3000/${user.profile_picture}`
            : defaultProfileImages.profile
        }
        alt={"Profile"}
        className="w-16 rounded-full flex-shrink-0"
      />

      <div className="flex flex-col">
        <span className="font-semibold">{`${user.first_name} ${user.last_name}`}</span>
        <span className="">@{user.username}</span>
      </div>
    </div>
  );
};
export default SearchResult;
