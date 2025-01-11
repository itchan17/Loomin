import React, { useState } from "react";
import useAuthStore from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onSwitch }) => {
  const navigate = useNavigate();

  // States
  const loginForm = useAuthStore((state) => state.loginForm);
  const errorMessage = useAuthStore((state) => state.errorMessage);

  // State functions
  const updateLoginField = useAuthStore((state) => state.updateLoginField);
  const login = useAuthStore((state) => state.login);
  const clearErrors = useAuthStore((state) => state.clearErrors);
  const clearForm = useAuthStore((state) => state.clearForm);

  // Local state
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visbility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login();

    navigate("/");
  };

  // Handles navigation to signup page
  const handleSignUpClick = () => {
    clearErrors();
    clearForm();
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-poppins">
      <div className="bg-white shadow-lg text-center overflow-hidden w-full h-full sm:rounded-lg sm:max-w-md sm:h-auto sm:w-full">
        <div className="relative bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-28 rounded-b-[50%] text-[#1A1A1A] flex flex-col justify-end pb-4">
          <h1 className="text-2xl font-bold mb-0">LOG IN</h1>
          <p className="text-sm tracking-widest uppercase text-white">
            TO CONTINUE
          </p>
        </div>

        <form
          className="flex flex-col px-14 pt-6 space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              className={`block w-full px-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={loginForm.email}
              onChange={updateLoginField}
            />
            <label
              htmlFor="email"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                loginForm.email
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
            >
              Email
            </label>
            {errorMessage.email && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-2">
                {errorMessage.email}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={`block w-full pr-12 pl-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={loginForm.password}
              onChange={updateLoginField}
            />
            <label
              htmlFor="password"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                loginForm.password
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <img
                src={showPassword ? "/eye-fill.svg" : "/Vector.svg"}
                alt="Toggle Password Visibility"
                className="w-5 h-5"
              />
            </button>
            {errorMessage.password && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-2">
                {errorMessage.password}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center w-10/12 mx-auto text-sm text-[#1A1A1A]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                onChange={updateLoginField}
                className="rounded border-gray-300"
              />
              Remember Me
            </label>
            <a href="/forgot-password" className="text-black hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full max-w-[50%] mx-auto bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg transition"
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
