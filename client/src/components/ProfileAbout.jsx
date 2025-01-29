import React, { useState } from "react";
import AboutSidebar from "./about/AboutSidebar";
import Overview from "./about/Overview";
import WorkEducation from "./about/WorkEducation";
import Places from "./about/Places";
import Birthday from "./about/Birthday";

const ProfileAbout = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "work-education":
        return <WorkEducation />;
      case "places":
        return <Places />;
      case "birthday":
        return <Birthday />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">About</h2>
        <div className="space-y-2">
          <button
            onClick={() => setActiveSection("overview")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "overview"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection("work-education")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "work-education"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Work and education
          </button>
          <button
            onClick={() => setActiveSection("places")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "places"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Places lived
          </button>
          <button
            onClick={() => setActiveSection("birthday")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "birthday"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Birthday
          </button>
        </div>
      </div>

      {/* Mobile Section Selector */}
      <div className="flex overflow-x-auto gap-4 p-4 md:hidden sticky top-0 bg-[#D9D9D9] z-10">
        <button
          onClick={() => setActiveSection("overview")}
          className={`whitespace-nowrap px-4 py-2 rounded-full ${
            activeSection === "overview"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-500"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveSection("work-education")}
          className={`whitespace-nowrap px-4 py-2 rounded-full ${
            activeSection === "work-education"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-500"
          }`}
        >
          Work & Education
        </button>
        <button
          onClick={() => setActiveSection("places")}
          className={`whitespace-nowrap px-4 py-2 rounded-full ${
            activeSection === "places"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-500"
          }`}
        >
          Places
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProfileAbout;
