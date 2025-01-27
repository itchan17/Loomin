import React, { useState } from "react";
import userIcon from "../assets/user.png";
import banner from "../assets/banner.png";
import useUserStore from "../stores/userStore";

const EditProfileModal = ({ isOpen, onClose }) => {
  const existingProfile = useUserStore((state) => state.profile);

  const [profileImage, setProfileImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [coverImage, setCoverImage] = useState(
    "https://img.freepik.com/free-photo/gray-wall-textures-background_74190-4389.jpg"
  );

  const editProfile = useUserStore((state) => state.editProfile);

  const [profile, setProfile] = useState({
    profileImage: null,
    coverImage: null,
    removedImages: [],
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profile);

    await editProfile(profile);
    console.log("Close");
    onClose();
    setProfile({
      profileImage: null,
      coverImage: null,
      removedImages: [],
    });
    setProfileImage(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
    setCoverImage(
      "https://img.freepik.com/free-photo/gray-wall-textures-background_74190-4389.jpg"
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg w-[500px] relative">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              <i class="bx bx-x"></i>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Profile picture</h3>
              <button
                type="button"
                className="text-loomin-orange font-medium hover:text-orange-600"
                onClick={() =>
                  document.getElementById("profilePicture").click()
                }
              >
                Edit
              </button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <input
                  type="file"
                  name="profileImage"
                  id="profilePicture"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setProfile((prev) => ({
                        ...prev,
                        removedImages: prev.removedImages.includes(
                          existingProfile.profile_picture
                        )
                          ? prev.removedImages
                          : [
                              ...prev.removedImages,
                              existingProfile.profile_picture,
                            ],
                        profileImage: file,
                      }));
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProfileImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Cover photo</h3>
              <button
                type="button"
                className="text-loomin-orange font-medium hover:text-orange-600"
                onClick={() => document.getElementById("coverPhoto").click()}
              >
                Edit
              </button>
            </div>
            <div className="relative">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-40 rounded-lg object-cover"
              />
              <input
                type="file"
                name="coverImage"
                id="coverPhoto"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfile((prev) => ({
                      ...prev,
                      removedImages: prev.removedImages.includes(
                        existingProfile.background_picture
                      )
                        ? prev.removedImages
                        : [
                            ...prev.removedImages,
                            existingProfile.background_picture,
                          ],
                      coverImage: file,
                    }));
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setCoverImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex justify-center">
          <button
            disabled={
              !profile.profileImage && !profile.coverImage ? true : false
            }
            type="submit"
            className="w-full bg-gradient-to-r from-loomin-yellow to-loomin-orange text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileModal;
