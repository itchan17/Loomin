import React, { useState } from "react";
import useUserStore from "../../stores/userStore";

const WorkEducation = ({}) => {
  //Profile store
  const updateProfileInfo = useUserStore((state) => state.updateProfileInfo);
  const deleteProfileInfo = useUserStore((state) => state.deleteProfileInfo);
  const setProfileInfo = useUserStore((state) => state.setProfileInfo);
  const profileInfo = useUserStore((state) => state.profileInfo);

  const [workForm, setWorkForm] = useState({ company: "", position: "" });
  const [schoolForm, setSchoolForm] = useState({ school: "" });
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [showSchoolForm, setShowSchoolForm] = useState(false);
  const [workToggleOption, setWorkToggleOption] = useState(false);
  const [schoolToggleOption, setSchoolToggleOption] = useState(false);

  const handleSaveWork = () => {
    if (workForm.company.trim() && workForm.position.trim()) {
      const profileInfo = {
        hometown: null,
        school: null,
        work: {
          company: workForm.company,
          position: workForm.position,
        },
      };
      setProfileInfo("work", {
        company: workForm.company,
        position: workForm.position,
      });
      setWorkForm({ company: "", position: "" });
      updateProfileInfo(profileInfo);
      setShowWorkForm(false);
    }
  };

  const handleSaveSchool = () => {
    if (schoolForm.school.trim()) {
      const profileInfo = {
        hometown: null,
        school: schoolForm.school,
        work: {
          company: null,
          position: null,
        },
      };
      setProfileInfo("school", schoolForm.school);
      setSchoolForm({ school: "" });
      updateProfileInfo(profileInfo);
      setShowSchoolForm(false);
    }
  };
  const handleEditWork = () => {
    setShowWorkForm(true);
    setWorkToggleOption((prev) => !prev);
  };
  const handleEditSchool = () => {
    setShowSchoolForm(true);
    setSchoolToggleOption((prev) => !prev);
  };
  const handleDeletetWork = () => {
    deleteProfileInfo("work");
    setProfileInfo("work", {
      company: null,
      position: null,
    });
  };
  const handleDeletetSchool = () => {
    deleteProfileInfo("school");
    setProfileInfo("school", null);
  };
  return (
    <div className="space-y-6">
      {/* Work Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Work</h3>
        {!showWorkForm &&
          !profileInfo?.work?.company &&
          !profileInfo?.work?.position && (
            <button
              onClick={() => setShowWorkForm(true)}
              className="flex items-center gap-2 text-loomin-orange font-medium"
            >
              <i className="bx bx-plus-circle text-xl"></i>
              Add a workplace
            </button>
          )}

        {showWorkForm && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <input
              type="text"
              placeholder={
                showWorkForm && (profileInfo?.work?.company || "Company")
              }
              value={workForm.company}
              onChange={(e) =>
                setWorkForm({ ...workForm, company: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder={
                showWorkForm && (profileInfo?.work?.position || "Position")
              }
              value={workForm.position}
              onChange={(e) =>
                setWorkForm({ ...workForm, position: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowWorkForm(false);
                  setWorkForm({ company: "", position: "" });
                }}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWork}
                className="px-4 py-2 text-white bg-loomin-orange rounded-lg hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* saved works */}
        <div className="mt-4 space-y-4">
          {profileInfo?.work?.company && profileInfo?.work?.position && (
            <div className="flex items-center justify-between group">
              <div className="flex gap-3">
                <i className="bx bxs-briefcase text-gray-500 text-2xl font-medium font-bold"></i>
                <div>
                  <p className="text-gray-800 font-medium">
                    {profileInfo?.work?.company}
                  </p>
                  <p className="text-gray-600">{profileInfo?.work?.position}</p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setWorkToggleOption((prev) => !prev)}
                  className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i className="bx bx-dots-horizontal-rounded text-xl text-gray-500"></i>
                </button>

                {workToggleOption && (
                  <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-32 z-10">
                    <button
                      onClick={handleEditWork}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <i className="bx bx-edit-alt"></i>
                      Edit
                    </button>
                    <button
                      onClick={handleDeletetWork}
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

      {/* School Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">College/High School</h3>
        {!showSchoolForm && !profileInfo.school && (
          <button
            onClick={() => setShowSchoolForm(true)}
            className="flex items-center gap-2 text-loomin-orange font-medium"
          >
            <i className="bx bx-plus-circle text-xl"></i>
            Add school
          </button>
        )}
        {showSchoolForm && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <input
              type="text"
              placeholder={
                showSchoolForm && profileInfo?.school
                  ? profileInfo.school
                  : "School"
              }
              value={schoolForm.school}
              onChange={(e) =>
                setSchoolForm({ ...schoolForm, school: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowSchoolForm(false);
                  setSchoolForm({ school: "" });
                }}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSchool}
                className="px-4 py-2 text-white bg-loomin-orange rounded-lg hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* School saved here */}
        <div className="mt-4 space-y-4">
          {profileInfo?.school && (
            <div className="flex justify-between group">
              <div className="flex items-center gap-3">
                <i className="bx bxs-book text-gray-500 text-2xl font-medium font-bold"></i>
                <div>
                  <p className="text-gray-800 font-medium">
                    {profileInfo?.school}
                  </p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setSchoolToggleOption((prev) => !prev)}
                  className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i className="bx bx-dots-horizontal-rounded text-xl text-gray-500"></i>
                </button>

                {schoolToggleOption && (
                  <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-32 z-10">
                    <button
                      onClick={handleEditSchool}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <i className="bx bx-edit-alt"></i>
                      Edit
                    </button>
                    <button
                      onClick={handleDeletetSchool}
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

export default WorkEducation;
