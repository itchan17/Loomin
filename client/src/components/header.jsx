import { useState, useRef, useEffect } from "react";
import React from "react";
import "../global.css";
import logo from "../assets/loomin.png";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useSocketStore from "../stores/socketStore";
import useChatStore from "../stores/chatStore";
import LogoutModal from "./LogoutModal";
import axios from "axios";
import debounce from "lodash.debounce";
import useProfileStore from "../stores/profileStore";

const Header = ({ toggleSidebar }) => {
  const logout = useAuthStore((state) => state.logout);
  const clearUser = useUserStore((state) => state.clearUser);
  const clearActiveChat = useChatStore((state) => state.clearActiveChat);
  const socket = useSocketStore((state) => state.socket);

  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  // Profile store
  const defaultProfileImages = useProfileStore(
    (state) => state.defaultProfileImages
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setOpenSearchBar(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      clearActiveChat();
      socket.disconnect();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsLogoutModalOpen(false);
  };

  // Search functionality with debounce
  const debouncedSearch = debounce(async (term) => {
    if (searchTerm.trim()) {
      setIsSearchLoading(true);
      try {
        const response = await axios.get(`/users/search?keyword=${term}`);
        console.log(response);
        setSearchResults(response.data);
        setIsSearchLoading(false);
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  }, 300);

  useEffect(() => {
    setSearchResults(null);
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const rederResults = () => {
    // This will return the results
    return (
      <div className="absolute rounded-lg bg-white top-full max-h-72 left-0 w-full overflow-y-auto z-[1000]">
        {isSearchLoading ? (
          <div className="py-2 w-full text-center">
            <div
              class="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-loomin-orange"
              role="status"
            >
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          (() => {
            if (searchResults && !isSearchLoading && searchResults.length > 0) {
              return searchResults.map((result) => (
                <div
                  key={result.username} // Always provide a unique key
                  onClick={() => {
                    navigate(`/profile/${result.username}`);
                    setSearchTerm("");
                    setOpenSearchBar(false);
                  }}
                  className="h-16 w-full cursor-pointer flex items-center px-4 gap-3 hover:bg-gray-200 border-t"
                >
                  <img
                    src={
                      result.profile_picture
                        ? `http://localhost:3000/${result.profile_picture}`
                        : defaultProfileImages.profile
                    }
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 cursor-pointer"
                  />
                  <div>
                    <h1 className="font-semibold">{`${result.first_name} ${result.last_name}`}</h1>
                    <p className="mt-[-2px] text-gray-600">
                      {`@${result.username}`}
                    </p>
                  </div>
                </div>
              ));
            } else if (
              !isSearchLoading &&
              searchResults &&
              searchResults.length == 0
            ) {
              return (
                <div className="px-4 text-sm w-full py-2 font-medium text-gray-400">
                  {" "}
                  No matching users found.
                </div>
              );
            }
          })()
        )}
      </div>
    );
  };

  return (
    <div>
      <header className="relative z-50 flex justify-between items-center h-16 text-black py-4 pl-2 pr-2 md:pl-6 md:pr-8 bg-gradient-to-r from-loomin-yellow to-loomin-orange drop-shadow-md sticky top-0">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <div className="flex items-center  gap-2">
            <Link to="/" className="flex items-center w-24">
              <img
                src={logo}
                alt="Loomin Logo"
                className="w-full h-full object-contain"
              />
            </Link>
            <svg
              onClick={() => setOpenSearchBar(true)}
              className={`${
                openSearchBar ? "hidden" : ""
              } w-6 h-6 font-bold text-white sm:hidden`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Search Bar */}
          <div className="relative hidden sm:flex items-center border-black sm:w-auto">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search user..."
              className="pl-10 pr-4 py-2 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-96"
            />
            <svg
              className="absolute left-3 w-5 h-5 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {/* Search results */}
            {searchTerm.trim() && rederResults()}
          </div>
        </div>
        <div
          ref={searchBarRef}
          className={`${
            openSearchBar ? "" : "hidden"
          } absolute left-0 top-full w-full z-50 sm:hidden`}
        >
          <div className="relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search user..."
              className="pl-10 pr-4 py-2 bg-white w-full sm:w-96 "
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {/* Render the results */}
            {searchTerm.trim() && rederResults()}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex items-center ml-auto">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="bx bx-log-out text-2xl text-white rotate-180 hover:bg-orange-700 px-5 py-2 rounded-full cursor-pointer"
          ></button>
        </div>
      </header>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Header;
