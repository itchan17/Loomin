import React, { useState } from "react";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onSwitch }) => {
  const navigate = useNavigate();
  const store = authStore();

  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visbility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await store.login();

    navigate("/");
  };

  const handleSignUpClick = () => {
    store.clearErrors();
    store.clearForm();
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-center overflow-hidden mx-4">
        {/* Header with Half-Moon Gradient */}
        <div className="relative bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-28 rounded-b-[50%] text-[#1A1A1A] flex flex-col justify-end pb-4">
          <h1 className="text-2xl font-bold mb-0">LOG IN</h1>
          <p className="text-sm tracking-widest uppercase text-white">
            TO CONTINUE
          </p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col px-6 pt-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input
              type="email"
              name="email"
              className="peer block w-10/12 mx-auto px-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
              value={store.loginForm.email}
              onChange={store.updateLoginField}
            />
            <label className="absolute left-14 text-sm text-black transition-all duration-200 transform scale-100 top-2.5 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:translate-y-[-0.6rem] peer-focus:scale-90 peer-focus:text-gray-500 peer-valid:translate-y-[-0.6rem] peer-valid:scale-90 peer-valid:text-gray-500">
              Email
            </label>
            {store.errorMessage.email && (
              <p className="text-sm text-red-500 mt-1">
                {store.errorMessage.email}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="peer block w-10/12 mx-auto pr-12 pl-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
              value={store.loginForm.password}
              onChange={store.updateLoginField}
            />
            <label className="absolute left-14 text-sm text-black transition-all duration-200 transform scale-100 top-2.5 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:translate-y-[-0.6rem] peer-focus:scale-90 peer-focus:text-gray-500 peer-valid:translate-y-[-0.6rem] peer-valid:scale-90 peer-valid:text-gray-500">
              Password
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-10 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <img
                src="/Vector.svg"
                alt="Toggle Password Visibility"
                className="w-5 h-5"
              />
            </button>
            {store.errorMessage.password && (
              <p className="text-sm text-red-500 mt-1">
                {store.errorMessage.password}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center w-10/12 mx-auto text-sm text-[#1A1A1A]">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember Me
            </label>
            <a href="/forgot-password" className="text-black hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-6/12 mx-auto bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg transition"
          >
            LOG IN
          </button>
        </form>

        <p className="mt-4 mb-6 text-sm text-[#1A1A1A]">
          Don't have an account?{" "}
          <span
            className="text-orange-500 cursor-pointer hover:underline"
            onClick={handleSignUpClick}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
