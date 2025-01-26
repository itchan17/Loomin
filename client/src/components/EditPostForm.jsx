import React, { useState } from "react";
import usePostStore from "../stores/PostStore";
import useUserStore from "../stores/UserStore";

const EditPostForm = ({ onClose, post }) => {
  // Post states

  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  // State functions
  const updateEditFormField = usePostStore(
    (state) => state.updateEditFormField
  );
  const updatePost = usePostStore((state) => state.updatePost);

  const [editPostForm, setEditPostForm] = useState({
    content: post.content,
    newImages: [],
    removedImages: [],
  });
  const [existingImagePreview, setExistingImagePreview] = useState([
    ...post.images,
  ]);
  const [newImagePreview, setNewImagePreview] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(editPostForm);
    await updatePost(post._id, editPostForm);

    if (onClose()) {
      onClose();
    }
  };

  const removeExistingImage = (imageIndex) => {
    const filteredImages = existingImagePreview.filter(
      (item, index) => index !== imageIndex
    );

    const removedImage = existingImagePreview[imageIndex];

    setExistingImagePreview(filteredImages);

    setEditPostForm((prev) => ({
      ...prev,
      removedImages: [...prev.removedImages, removedImage],
    }));
  };

  const removeNewImage = (imageIndex) => {
    setNewImagePreview(
      newImagePreview.filter((item, index) => index !== imageIndex)
    );

    setEditPostForm((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((item, index) => index !== imageIndex),
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" rounded-lg mx-auto bg-white md:w-3/4">
        <div className="flex justify-between px-2 py-2 ml-auto">
          <button
            type="button"
            onClick={onClose}
            className="bx bx-x text-loomin-orange text-2xl ml-auto px-1 hover:bg-orange-100 rounded-full cursor-pointer"
          ></button>
        </div>
        <div className="flex p-4">
          <div className="w-16 h-14">
            <img
              className="rounded-full w-14 h-14 object-cover"
              src={loggedInUser.profile_picture}
              alt="Profile"
            />
          </div>

          <div className="ml-3 pt-2 flex flex-col w-full">
            <textarea
              value={editPostForm.content}
              name="content"
              onChange={(e) => {
                setEditPostForm((prev) => ({
                  ...prev,
                  content: e.target.value,
                }));
              }}
              placeholder="It's Shrekin time"
              className="w-full text-md resize-none outline-none h-32"
            ></textarea>
          </div>
        </div>

        <div className="p-4">
          <div className="flex overflow-x-auto space-x-2 w-full">
            {existingImagePreview.length > 0 &&
              existingImagePreview.map((image, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute right-0 rounded-full top-0 bx bx-x px-1 text-black text-2xl ml-auto hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer"
                  ></button>
                  {console.log(image)}
                  <img
                    className="rounded object-fill object-cover w-44 h-32 border-black border"
                    src={`http://localhost:3000/${image}`}
                    alt={`Preview ${index + 1}`}
                  />
                </div>
              ))}
            {newImagePreview.length > 0 &&
              newImagePreview.map((image, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute right-0 rounded-full top-0 bx bx-x px-1 text-black text-2xl ml-auto hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer"
                  ></button>
                  {console.log(image)}
                  <img
                    className="rounded object-fill object-cover w-44 h-32 border-black border"
                    src={image}
                    alt={`Preview ${existingImagePreview.length + 1}`}
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
                name="newImages"
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

                    setEditPostForm((prev) => ({
                      ...prev,
                      newImages: [...prev.newImages, ...files],
                    }));

                    for (let i = 0; i < files.length; i++) {
                      const reader = new FileReader();

                      reader.onloadend = () => {
                        imageArray.push(reader.result);
                        if (imageArray.length === files.length) {
                          setNewImagePreview((prev) => [
                            ...prev,
                            ...imageArray,
                          ]);
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
              disabled={!editPostForm.content.trim() ? true : false}
              type="submit"
              className={`inline px-4 py-2 rounded-full font-bold text-white bg-loomin-orange cursor-pointer hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange ${
                editPostForm.content.trim() ? "" : "cursor-not-allowed"
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

export default EditPostForm;
