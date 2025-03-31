import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  following: [], // List of following ID
  loggedInUser: {}, // Data of currently logged in user
  loggedInUserName: null,
  followersCount: null,
  followingCount: null,
  postsCount: null,
  followingToDisplay: [], // Data of following that is going to display
  suggestedUser: [], // Data of suugested users
  isLoading: true, // Add loading state
  error: null, // Add error state
  onlineUsers: [],
  profile: {
    // For storing profile files
    profile_picture: null,
    background_picture: null,
  },

  profileInfo: {
    hometown: null,
    school: null,
    work: {
      company: null,
      position: null,
    },
    birthday: null,
  },

  // Function to update profileInfo dynamically
  setProfileInfo: (field, value) =>
    set((state) => ({
      profileInfo: {
        ...state.profileInfo, // Preserve existing data
        [field]:
          field === "work"
            ? { ...state.profileInfo.work, ...value } // Merge work object
            : value,
      },
    })),

  fetchLoggedInUser: async () => {
    try {
      const { loggedInUser } = useUserStore.getState();

      set({ isLoading: true, error: null });
      const res = await axios.get("/users");

      if (loggedInUser._id !== res.data.user._id) {
        console.log("RUNNING");
        set({
          loggedInUser: res.data.user,
          loggedInUserName: `${res.data.user.first_name} ${res.data.user.last_name}`,
          followersCount: res.data.user.followers.length,
          followingCount: res.data.user.following.length,
          postsCount: res.data.user.posts.length,
          following: res.data.user.following,
          followingToDisplay: res.data.followingToDisplay,
          suggestedUser: res.data.suggestedUser,
          isLoading: false,
          profile: {
            profile_picture: res.data.user.profile_picture,
            background_picture: res.data.user.background_picture,
          },
          profileInfo: {
            hometown: res.data?.user?.hometown ?? null,
            school: res.data?.user?.school ?? null,
            work: {
              company: res.data?.user?.work?.company ?? null,
              position: res.data?.user?.work?.position ?? null,
            },
            birthday: res.data?.user?.date_of_birth ?? null,
          },
        });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  clearUser: () => {
    set({
      loggedInUser: {},
      loggedInUserName: null,
      followersCount: null,
      followingCount: null,
      postsCount: null,
      followingToDisplay: [],
      suggestedUser: [],
      isLoading: true,
      error: null,
    });
  },

  followUser: async (followedUser) => {
    const { followingToDisplay, suggestedUser } = useUserStore.getState();
    try {
      // const {followedUsers}
      const res = await axios.post(`/users/${followedUser._id}/following`);
      console.log(res);

      // Update the displayed following in the right side bar
      if (
        res.data.updatedFollowing.includes(followedUser._id) &&
        suggestedUser.find((user) => user._id === followedUser._id)
      ) {
        const updated = suggestedUser.filter(
          (following) => following._id !== followedUser._id
        );
        set({ suggestedUser: updated });
      }
      if (
        res.data.updatedFollowing.includes(followedUser._id) &&
        followingToDisplay.length <= 10
      ) {
        set({ followingToDisplay: [followedUser, ...followingToDisplay] });
      } else if (!res.data.updatedFollowing.includes(followedUser._id)) {
        const updated = followingToDisplay.filter(
          (following) => following._id !== followedUser._id
        );
        set({ followingToDisplay: updated });
      }
      // Update the following count and following id list
      set({
        followingCount: res.data.updatedFollowing.length,
        following: res.data.updatedFollowing,
      });
    } catch (error) {
      throw error;
    }
  },

  setOnlineUsers: (onlineUsers) => {
    set({ onlineUsers });
  },

  editProfile: async (profile) => {
    const formData = new FormData();
    console.log(profile);
    formData.append("profileImage", profile.profileImage);
    formData.append("coverImage", profile.coverImage);
    profile.removedImages.forEach((image) => {
      formData.append("removedImages", image);
    });

    try {
      const res = await axios.post(`/users/edit-profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({
        profile: {
          profile_picture: res.data.profile_picture,
          background_picture: res.data.background_picture,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  updateProfileInfo: async (profileInfo) => {
    try {
      const res = await axios.put("/users/update-info", profileInfo);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  deleteProfileInfo: async (field) => {
    try {
      const res = await axios.delete("/users/delete-info", {
        data: { field },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useUserStore;
