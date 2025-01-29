import React, { useState, useEffect } from "react";
import useUserStore from "../../stores/userStore";

const Places = () => {
  //Profile store
  const updateProfileInfo = useUserStore((state) => state.updateProfileInfo);
  const deleteProfileInfo = useUserStore((state) => state.deleteProfileInfo);
  const setProfileInfo = useUserStore((state) => state.setProfileInfo);
  const profileInfo = useUserStore((state) => state.profileInfo);

  const [locationForm, setLocationForm] = useState({ city: "" });
  const [showFromLocationForm, setShowFromLocationForm] = useState(false);
  const [toggleOption, setToggleOption] = useState(false);
  const [homeTown, setHomeTown] = useState(profileInfo?.hometown || null);

  const onSaveLocation = () => {
    const profileInfo = {
      hometown: locationForm.city,
      education: null,
      work: {
        company: null,
        position: null,
      },
    };
    setProfileInfo("hometown", locationForm.city);
    setLocationForm({ city: "" });
    setHomeTown(locationForm.city);
    updateProfileInfo(profileInfo);
    setShowFromLocationForm(false);
  };

  const onEditLocation = () => {
    setShowFromLocationForm(true);
  };

  const onDeleteLocation = () => {
    deleteProfileInfo("hometown");
    setProfileInfo("hometown", null);
    setHomeTown("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Place Lived</h3>

        {/* Location here */}
        {!homeTown && !showFromLocationForm && (
          <button
            onClick={() => setShowFromLocationForm(true)}
            className="flex items-center gap-2 text-loomin-orange font-medium mb-4"
          >
            <i className="bx bx-plus-circle text-xl"></i>
            Add from location
          </button>
        )}

        {/* Location form */}
        {showFromLocationForm && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4 mb-4">
            <input
              type="text"
              placeholder={
                setShowFromLocationForm && homeTown ? homeTown : "Hometown"
              }
              value={locationForm.city}
              onChange={(e) =>
                setLocationForm({ ...locationForm, city: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowFromLocationForm(false);
                  setLocationForm({ city: "" });
                }}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onSaveLocation}
                className="px-4 py-2 text-white bg-loomin-orange rounded-lg hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Places saved here */}
        <div className="mt-6 space-y-4">
          {homeTown && (
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <i className="bx bx-location-plus text-gray-500 text-2xl"></i>
                <div>
                  <span className="text-gray-500 text-sm">Hometown</span>
                  <p className="text-gray-800 font-medium">{homeTown}</p>
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
                <div
                  className={`${
                    toggleOption ? "absolute" : "hidden"
                  } right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-32 z-10`}
                >
                  <button
                    onClick={() => {
                      onEditLocation();
                      setToggleOption((prev) => !prev);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <i className="bx bx-edit-alt"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDeleteLocation();
                      setToggleOption((prev) => !prev);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <i className="bx bx-trash"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Places;
