import React, { useState } from "react";
import useUserStore from "../../stores/userStore";

const Birthday = () => {
  //Profile store
  const updateProfileInfo = useUserStore((state) => state.updateProfileInfo);
  const deleteProfileInfo = useUserStore((state) => state.deleteProfileInfo);
  const setProfileInfo = useUserStore((state) => state.setProfileInfo);
  const profileInfo = useUserStore((state) => state.profileInfo);

  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [toggleOption, setToggleOption] = useState(false);
  const [birthdayForm, setBirthdayForm] = useState(null);

  const handleSaveBirthday = () => {
    if (birthdayForm.trim()) {
      const profileInfo = {
        hometown: null,
        school: null,
        work: {
          company: null,
          position: null,
        },
        birthday: birthdayForm,
      };
      setProfileInfo("birthday", birthdayForm);
      updateProfileInfo(profileInfo);
      setShowBirthdayForm(false);
    }
  };

  const handleBirthdayEdit = () => {
    setShowBirthdayForm(true);
  };

  const handleBirthdayDelete = () => {
    deleteProfileInfo("date_of_birth");
    setProfileInfo("birthday", null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Birthday</h3>

        {/* Location here */}
        {!profileInfo?.birthday && !showBirthdayForm && (
          <button
            onClick={() => setShowBirthdayForm(true)}
            className="flex items-center gap-2 text-loomin-orange font-medium mb-4"
          >
            <i className="bx bx-plus-circle text-xl"></i>
            Add your birthday
          </button>
        )}

        {/* Location form */}
        {showBirthdayForm && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4 mb-4">
            <input
              type="date"
              placeholder={
                showBirthdayForm && profileInfo?.birthday
                  ? profileInfo?.birthday
                  : "Birthday"
              }
              value={birthdayForm}
              onChange={(e) => setBirthdayForm(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowBirthdayForm(false);
                  setBirthdayForm(null);
                }}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBirthday}
                className="px-4 py-2 text-white bg-loomin-orange rounded-lg hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Places saved here */}
        <div className="mt-6 space-y-4">
          {profileInfo?.birthday && (
            <div className="flex items-center justify-between group">
              <div className="flex gap-3">
                <i className="bx bxs-cake text-gray-500 text-2xl font-medium font-bold"></i>
                <div>
                  <p className="text-gray-800 font-medium">
                    {new Date(profileInfo.birthday).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </p>
                  <span className="text-gray-500 text-sm">Birthday</span>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setToggleOption((prev) => !prev)}
                  className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i className="bx bx-dots-horizontal-rounded text-xl text-gray-500"></i>
                </button>

                {/* Edit/Delete menu */}
                {toggleOption && (
                  <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-32 z-10">
                    <button
                      onClick={() => {
                        handleBirthdayEdit();
                        setToggleOption((prev) => !prev);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <i className="bx bx-edit-alt"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleBirthdayDelete();
                        setToggleOption((prev) => !prev);
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <i className="bx bx-trash"></i>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Birthday;
