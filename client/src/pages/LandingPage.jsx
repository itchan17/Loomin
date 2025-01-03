import React from "react";

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] text-center px-4 font-poppins">
      <div className="w-full max-w-2xl">
        {/* Logo and Welcome Section */}
        <div className="mb-8">
          <img
            src="./public/LOGO-LOOMIN.svg"
            alt="Loomin Logo"
            className="w-96 h-60 mx-auto"
          />
          <h1 className="text-4xl md:text-4xl font-bold text-black uppercase tracking-wide">
            <span className="text-black">W E L C O M E</span>
          </h1>
          <h2 className="text-3xl md:text-3xl font-semibold text-white mt-2">
            O N B O A R D
          </h2>
        </div>

        {/* Sign Up Section */}
        <div className="flex flex-col items-center space-y-6 mb-6">
          <p className="text-xl md:text-2xl lg:text-3xl text-white">
            Sign up to be part of a growing, <br />
            vibrant community.
          </p>
          <button className="bg-white text-black font-bold py-4 px-10 rounded-full shadow-md text-lg md:text-xl hover:bg-gray-100 transition-all">
            SIGN UP
          </button>
          <p className="text-lg md:text-xl lg:text-2xl text-white">
            Have an account?{" "}
            <a
              href="#"
              className="text-[#FFD23F] font-semibold hover:underline"
            >
              Log in there!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
