import React, { useState, useEffect } from "react";

const SearchResult = ({ user }) => {
  return (
    <div
      key={user._id}
      className={`flex px-2 py-3 gap-4 items-center rounded cursor-pointer hover:bg-[#f3f4f6]`}
    >
      <img
        src={
          user.profile_picture ||
          "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
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
