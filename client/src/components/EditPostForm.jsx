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
import Swal from "sweetalert2";

const EditPostForm = ({ onClose, post }) => {
  // Post states
  const editForm = usePostStore((state) => state.editForm);

  // User states
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  // State functions
  const updateEditFormField = usePostStore(
    (state) => state.updateEditFormField
  );
  const updatePost = usePostStore((state) => state.updatePost);

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
    
    // First show confirmation alert
    const result = await Swal.fire({
      title: 'Save Changes?',
      text: "Are you sure you want to edit this post?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FF6F61',
      cancelButtonColor: '#d1d5db',
      confirmButtonText: 'Yes, save it!',
      background: '#fff',
      customClass: {
        popup: 'rounded-2xl',
        title: 'font-bold text-gray-900',
        htmlContainer: 'text-gray-600',
        confirmButton: 'rounded-full',
        cancelButton: 'rounded-full'
      }
    });

    if (result.isConfirmed) {
      try {
        await updatePost(post._id);
        Swal.fire({
          title: 'Post Updated!',
          text: 'Your changes have been saved successfully.',
          icon: 'success',
          confirmButtonColor: '#FF6F61',
          background: '#fff',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl',
            title: 'font-bold text-gray-900',
            htmlContainer: 'text-gray-600'
          }
        });
        onClose();
      } catch (error) {
        console.error("Error editing post:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update the post. Please try again.',
          icon: 'error',
          confirmButtonColor: '#FF6F61',
          background: '#fff',
          customClass: {
            popup: 'rounded-2xl',
            title: 'font-bold text-gray-900',
            htmlContainer: 'text-gray-600',
            confirmButton: 'rounded-full'
          }
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" rounded-xl mx-auto bg-white md:w-3/4 lg:w-2/3">
        <div className="flex justify-between px-2 py-2 ml-auto">
          <button
            onClick={onClose}
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
              value={editForm.content}
              name="content"
              onChange={updateEditFormField}
              placeholder="It's Shrekin time"
              className="w-full text-xl resize-none outline-none h-32"
            ></textarea>
          </div>
        </div>

        <div class="flex items-center text-loomin-orange justify-between py-2 px-4 mr-auto border-t">
          <div class="flex text-2xl pl-0.5">
            <div class="flex items-center justify-center p-3 hover:bg-orange-100 rounded-full cursor-pointer">
              <button
                onClick={() => openFilePicker()}
                className="bx bxs-image"
              ></button>
            </div>
            <div class="flex items-center justify-center p-3 hover:bg-orange-100 rounded-full cursor-pointer">
              <button className="bx bxs-happy"></button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="inline px-4 py-2 rounded-full font-bold text-white bg-loomin-orange cursor-pointer hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange"
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
