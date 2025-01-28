import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import EditPostForm from "./EditPostForm";
import React, { useState } from "react";
import usePostStore from "../stores/PostStore";
import Swal from "sweetalert2";

export default function Dropdown({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Post store state functions
  const getPost = usePostStore((state) => state.getPost);
  const deletePost = usePostStore((state) => state.deletePost);
  const archivePost = usePostStore((state) => state.archivePost);

  const handleArchivePost = async () => {
    const result = await Swal.fire({
      title: post.isArchived ? "Unarchived" : "Archived",
      text: post.isArchived
        ? "This post will be visible in your feed."
        : "You can find this post in your archive later",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: post.isArchived
        ? "Yes, unarchive it!"
        : "Yes, archive it!",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl",
        title: "font-bold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton: "rounded-full",
        cancelButton: "rounded-full",
      },
    });

    if (result.isConfirmed) {
      await archivePost(post._id);
      Swal.fire({
        title: post.isArchived ? "Unarchived" : "Archived",
        text: post.isArchived
          ? "Your post has been unarchived."
          : "Your post has been archived.",
        icon: "success",
        confirmButtonColor: "#FF6F61",
        background: "#fff",
        customClass: {
          popup: "rounded-2xl",
          title: "font-bold text-gray-900",
          htmlContainer: "text-gray-600",
          confirmButton: "rounded-full",
        },
      });
    }
  };

  const handleDeletePost = async () => {
    const result = await Swal.fire({
      title: "Delete Post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl",
        title: "font-bold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton: "rounded-full",
        cancelButton: "rounded-full",
      },
    });

    if (result.isConfirmed) {
      await deletePost(post._id);
      Swal.fire({
        title: "Deleted!",
        text: "Your post has been deleted.",
        icon: "success",
        confirmButtonColor: "#FF6F61",
        background: "#fff",
        customClass: {
          popup: "rounded-2xl",
          title: "font-bold text-gray-900",
          htmlContainer: "text-gray-600",
          confirmButton: "rounded-full",
        },
      });
    }
  };

  const handleEditPost = async () => {
    setIsModalOpen(!isModalOpen);
    await getPost(post);
  };

  return (
    <>
      <Menu>
        <MenuButton className="inline-flex items-center gap-1 rounded-md ml-auto py-1 px-0.5 text-sm/6 font-semibold shadow-white/10 focus:outline-none data-[hover]:bg-gray-700/15 data-[open]:bg-gray-700/5 data-[focus]:outline-1 data-[focus]:outline-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-32 origin-top-right rounded-xl border border-black/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {!post.isArchived && (
            <MenuItem>
              <button
                onClick={handleEditPost}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
              >
                <PencilIcon className="size-4 fill-black/30" />
                Edit
              </button>
            </MenuItem>
          )}

          <MenuItem>
            <button
              onClick={handleArchivePost}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
            >
              <ArchiveBoxXMarkIcon className="size-4 fill-black/30" />
              {post.isArchived ? "Unarchived" : "Archived"}
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleDeletePost}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
            >
              <TrashIcon className="size-4 fill-black/30" />
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-2xl">
            <EditPostForm onClose={handleEditPost} post={post} />
          </div>
        </div>
      )}
    </>
  );
}
