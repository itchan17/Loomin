import React, { useState } from "react";
import usePostStore from "../stores/PostStore";
import useUserStore from "../stores/UserStore";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from "use-file-picker/validators";

const Createpost = ({ onClose }) => {
  // Post states
  const createForm = usePostStore((state) => state.createForm);
  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  // State functions
  const createPost = usePostStore((state) => state.createPost);
  const updateCreateFormField = usePostStore(
    (state) => state.updateCreateFormField
  );
  const clearForm = usePostStore((state) => state.clearForm);

  // Local state
  const [previewImage, setPreviewImage] = useState([]);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpg", "png"]),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
      new ImageDimensionsValidator({
        maxHeight: 900,
        maxWidth: 1600,
        minHeight: 600,
        minWidth: 768,
      }),
    ],
  });

  if (loading) return <div>Loading...</div>;
  if (errors.length) return <div>Error...</div>;

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
      clearForm();
    }
  };

  const displayPreview = () => {
    console.log("Working");
    return previewImage.map((image, index) => (
      <img
        key={index}
        className="rounded object-fill object-cover w-44 h-32 border-black border"
        src={image}
        alt={`Preview ${index}`}
      />
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" rounded-lg mx-auto bg-white md:w-3/4">
        <div className="flex justify-between px-2 py-2 ml-auto">
          <button
            type="button"
            onClick={closeForm}
            className="bx bx-x text-loomin-orange text-2xl ml-auto px-2 hover:bg-orange-100 rounded-full cursor-pointer"
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
              value={createForm.content}
              name="content"
              onChange={updateCreateFormField}
              placeholder="It's Shrekin time"
              className="w-full text-md resize-none outline-none h-32"
            ></textarea>
          </div>
        </div>

        <div className="p-4">
          <div className="flex overflow-x-auto space-x-2">
            {previewImage.length > 0 && displayPreview()}
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

                    for (let i = 0; i < files.length; i++) {
                      const reader = new FileReader();

                      reader.onloadend = () => {
                        imageArray.push(reader.result);
                        if (imageArray.length === files.length) {
                          setPreviewImage(imageArray);
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
              disabled={createForm.content ? false : true}
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
