import React, { useState } from "react";

const LoginPage = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-center overflow-hidden">
        {/* Header with Half-Moon Gradient */}
        <div className="relative bg-gradient-to-b from-orange-500 to-orange-400 h-32 rounded-b-[50%] text-white flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-1">LOG IN</h1>
          <p className="text-sm tracking-widest uppercase">TO CONTINUE</p>
        </div>

        {/* Form */}
        <form className="flex flex-col p-6">
          <input
            type="email"
            placeholder="Email"
            className="p-2 mb-4 text-base border rounded-md focus:ring-2 focus:ring-orange-400"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-2 text-base border rounded-md w-full focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9a9 9 0 00-9 9c0 2.5 4 7 9 7s9-4.5 9-7a9 9 0 00-9-9z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4.5-9-7a9.96 9.96 0 013.922-4.18M8.99 8.354A2.992 2.992 0 0112 7c.96 0 1.823.381 2.493 1M15.104 15.06a2.99 2.99 0 01-3.112.186M9.716 16.558A9.961 9.961 0 0112 17c5 0 9-4.5 9-7a9.961 9.961 0 00-2.928-4.144"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember Me
            </label>
            <a
              href="/forgot-password"
              className="text-orange-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-2 rounded-full hover:bg-orange-500 transition"
          >
            LOG IN
          </button>
        </form>

        {/* Switch to Signup */}
        <p className="my-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-orange-500 cursor-pointer hover:underline"
            onClick={() => onSwitch("signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
