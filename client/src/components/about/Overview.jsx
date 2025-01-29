import React from "react";
import useUserStore from "../../stores/userStore";

const Overview = () => {
  const profileInfo = useUserStore((state) => state.profileInfo);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Overview</h2>
      <div className="space-y-4">
        {profileInfo?.hometown && (
          <div className="flex gap-2">
            <i className="bx bxs-map text-gray-500 text-2xl font-medium font-bold"></i>
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium font-semibold">
                {profileInfo?.hometown}
              </span>
              <span className="text-sm text-gray-400 font-semibold">
                Hometown
              </span>
            </div>
          </div>
        )}

        {profileInfo?.school && (
          <div className="flex gap-2 ">
            <i className="bx bxs-book text-gray-500 text-2xl font-medium font-bold"></i>
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium font-semibold">
                {profileInfo?.school}
              </span>
              <span className="text-sm text-gray-400 font-semibold">
                Education
              </span>
            </div>
          </div>
        )}
        {profileInfo?.work?.position && (
          <div className="flex gap-2 ">
            <i className="bx bxs-briefcase text-gray-500 text-2xl font-medium font-bold"></i>
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium font-semibold">
                {profileInfo?.work?.position}
              </span>
              <span className="text-sm text-gray-400 font-semibold">Work</span>
            </div>
          </div>
        )}
        {profileInfo?.birthday && (
          <div className="flex gap-2 ">
            <i className="bx bxs-cake text-gray-500 text-2xl font-medium font-bold"></i>
            <div className="flex flex-col">
              <p className="text-gray-800 font-medium">
                {new Date(profileInfo.birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <span className="text-sm text-gray-400 font-semibold">
                Birthday
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
