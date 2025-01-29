import React, { useState } from "react";
import usePostStore from "../stores/PostStore";
import useUserStore from "../stores/UserStore";
import useProfileStore from "../stores/profileStore";

const Createpost = ({ onClose }) => {
  // Post states
  const createForm = usePostStore((state) => state.createForm);
  const clearForm = usePostStore((state) => state.clearForm);
  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  // State functions
  const createPost = usePostStore((state) => state.createPost);
  const updateCreateFormField = usePostStore(
    (state) => state.updateCreateFormField
  );

  // Profile store
  const defaultProfileImages = useProfileStore(
    (state) => state.defaultProfileImages
  );

  // Local state
  const [previewImage, setPreviewImage] = useState([]);
  const [postForm, setPostForm] = useState({ content: "", images: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(postForm);
    await createPost(postForm);
    console.log("Close");
    if (onClose) {
      onClose();
    }
  };

  const closeForm = () => {
    if (onClose) {
      onClose();
    }
  };

  const removePreview = (imageIndex) => {
    setPreviewImage(previewImage.filter((item, index) => index !== imageIndex));
    setPostForm((prev) => ({
      ...prev,
      images: prev.images.filter((item, index) => index !== imageIndex),
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" rounded-lg mx-auto bg-white md:w-3/4">
        <div className="flex justify-between px-2 py-2 ml-auto">
          <button
            type="button"
            onClick={closeForm}
            className="bx bx-x text-loomin-orange text-2xl ml-auto px-1 hover:bg-orange-100 rounded-full cursor-pointer"
          ></button>
        </div>
        <div className="flex p-4">
          <div className="w-16 h-14">
            <img
              className="rounded-full w-14 h-14 object-cover"
              src={
                loggedInUser.profile_picture
                  ? `http://localhost:3000/${loggedInUser.profile_picture}`
                  : defaultProfileImages.profile
              }
              alt="Profile"
            />
          </div>

          <div className="ml-3 pt-2 flex flex-col w-full">
            <textarea
              value={postForm.content}
              name="content"
              onChange={(e) => {
                setPostForm((prev) => ({
                  ...prev,
                  content: e.target.value,
                }));
              }}
              placeholder="What's on your mind? Share your thoughts, moments, or creativity with the world!"
              className="w-full text-md resize-none outline-none h-32"
            ></textarea>
          </div>
        </div>

        <div className="p-4">
          <div className="flex overflow-x-auto space-x-2 w-full">
            {previewImage.length > 0 &&
              previewImage.map((image, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => removePreview(index)}
                    className="absolute right-0 rounded-full top-0 bx bx-x px-1 text-black text-2xl ml-auto hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer"
                  ></button>
                  <img
                    className="rounded object-fill object-cover w-44 h-32 border-black border"
                    src={image}
                    alt={`Preview ${index}`}
                  />
                </div>
              ))}
          </div>
        </div>

        <div class="flex items-center text-loomin-orange justify-between py-2 px-4 mr-auto border-t">
          <div class="flex text-2xl pl-0.5">
            {/* File input here */}
            <div class="flex items-center justify-center p-3 hover:bg-orange-100 rounded-full cursor-pointer">
              <button
                type="button"
                onClick={() => document.getElementById("postImage").click()}
                className="bx bxs-image"
              ></button>
              <input
                name="images"
                type="file"
                id="postImage"
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  console.log(files);
                  if (files.length > 0) {
                    const imageArray = [];

                    setPostForm((prev) => ({
                      ...prev,
                      images: [...prev.images, ...files],
                    }));

                    for (let i = 0; i < files.length; i++) {
                      const reader = new FileReader();

                      reader.onloadend = () => {
                        imageArray.push(reader.result);
                        if (imageArray.length === files.length) {
                          setPreviewImage((prev) => [...prev, ...imageArray]);
                        }
                      };

                      reader.readAsDataURL(files[i]); // Read each file as Data URL
                    }
                  }
                }}
              />
            </div>
          </div>
          <div>
            <button
              disabled={!postForm.content.trim() ? true : false}
              type="submit"
              className={`inline px-4 py-2 rounded-full font-bold text-white bg-loomin-orange cursor-pointer hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange ${
                createForm.content ? "" : "cursor-not-allowed"
              }`}
            >
              Loom!
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Createpost;
