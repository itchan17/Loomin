import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] text-center px-4 pt-6 font-poppins">
      {/* Logo and Welcome Section */}
      <div className="mb-4 -mt-4">
        <img
          src="public/LOGO-LOOMIN.svg"
          alt="Loomin Logo"
          className="w-96 h-80 -mb-16 -mt-4"
        />
        <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
          <span className="text-black">W E L C O M E</span>
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-2">
          O N B O A R D
        </h2>
      </div>

      {/* Sign Up Section */}
      <div className="flex flex-col items-center space-y-3">
        <p className="text-2xl text-white mb-12">
          Sign up to be part of a growing, <br />
          vibrant community.
        </p>
        <button className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition-all">
          SIGN UP
        </button>
        <p className="text-lg text-white mb-2">
          Have an account?{" "}
          <a href="#" className="text-[#FFD23F] font-semibold hover:underline">
            Log in there!
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
