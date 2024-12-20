import React from "react";

const SignupPage = ({ onSwitch }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-center overflow-hidden">
        {/* Header with Half-Moon Gradient */}
        <div className="relative bg-gradient-to-b from-orange-500 to-orange-400 h-32 rounded-b-[50%] text-white flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-1">SIGN UP</h1>
          <p className="text-sm tracking-widest uppercase">TO CONTINUE</p>
        </div>

        {/* Form */}
        <form className="flex flex-col p-6">
          <input
            type="text"
            placeholder="First Name"
            className="p-2 mb-4 text-base border rounded-md focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 mb-4 text-base border rounded-md focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 mb-4 text-base border rounded-md focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 mb-4 text-base border rounded-md focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2 mb-4 text-base border rounded-md focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-2 rounded-full hover:bg-orange-500 transition"
          >
            SIGN UP
          </button>
        </form>

        {/* Switch to Login */}
        <p className="my-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-orange-500 cursor-pointer hover:underline"
            onClick={() => onSwitch("login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
