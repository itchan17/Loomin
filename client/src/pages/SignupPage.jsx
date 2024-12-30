import React, { useState } from "react";
import useAuthStore from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";

const SignupPage = ({ onSwitch }) => {
  const navigate = useNavigate();

  // States
  const signupForm = useAuthStore((state) => state.signupForm);
  const errorMessage = useAuthStore((state) => state.errorMessage);

  // State functions
  const signup = useAuthStore((state) => state.signup);
  const updateSignupField = useAuthStore((state) => state.updateSignupField);
  const clearErrors = useAuthStore((state) => state.clearErrors);
  const clearForm = useAuthStore((state) => state.clearForm);

  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup();
  };

  // Navigate to login page
  const handleLoginClick = () => {
    clearErrors();
    clearForm();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg w-full sm:max-w-md text-center sm:mx-4 h-screen sm:h-full">
        {/* Top half-circle gradient */}
        <div className="relative bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-32 w-full rounded-b-[50%] text-[#1A1A1A] flex flex-col justify-center pt-6">
          <h1 className="text-2xl font-bold mb-0">SIGN UP</h1>
          <p className="text-sm tracking-widest uppercase text-white mt-1">
            TO CONTINUE
          </p>
        </div>

        <form
          className="flex flex-col px-6 pt-6 space-y-8 w-full"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input
              type="text"
              name="firstName"
              value={signupForm.firstName}
              onChange={updateSignupField}
              className="peer block w-10/12 mx-auto px-2 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
            />
            <label
              htmlFor="firstName"
              className={`absolute left-10 text-sm text-black transition-all duration-200 transform origin-[0] top-3 
                ${
                  signupForm.firstName
                    ? "scale-90 translate-y-[-0.6rem] text-gray-500"
                    : "scale-100 translate-y-0 text-black"
                }
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-black
                peer-focus:scale-90 peer-focus:translate-y-[-0.6rem] peer-focus:text-gray-500`}
            >
              First Name
            </label>
            {errorMessage.firstName && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-10">
                {errorMessage.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="relative">
            <input
              type="text"
              name="lastName"
              value={signupForm.lastName}
              onChange={updateSignupField}
              className="peer block w-10/12 mx-auto px-2 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
            />
            <label
              htmlFor="lastName"
              className={`absolute left-10 text-sm text-black transition-all duration-200 transform origin-[0] top-3
                ${
                  signupForm.lastName
                    ? "scale-90 translate-y-[-0.6rem] text-gray-500"
                    : "scale-100 translate-y-0 text-black"
                }
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-black
                peer-focus:scale-90 peer-focus:translate-y-[-0.6rem] peer-focus:text-gray-500`}
            >
              Last Name
            </label>
            {errorMessage.lastName && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-10">
                {errorMessage.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={signupForm.email}
              onChange={updateSignupField}
              className="peer block w-10/12 mx-auto px-2 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className={`absolute left-10 text-sm text-black transition-all duration-200 transform origin-[0] top-3
                ${
                  signupForm.email
                    ? "scale-90 translate-y-[-0.6rem] text-gray-500"
                    : "scale-100 translate-y-0 text-black"
                }
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-black
                peer-focus:scale-90 peer-focus:translate-y-[-0.6rem] peer-focus:text-gray-500`}
            >
              Email
            </label>
            {errorMessage.email && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-10">
                {errorMessage.email}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="relative">
            <input
              type="text"
              name="username"
              value={signupForm.username}
              onChange={updateSignupField}
              className="peer block w-10/12 mx-auto px-2 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
            />
            <label
              htmlFor="username"
              className={`absolute left-10 text-sm text-black transition-all duration-200 transform origin-[0] top-3 
                ${
                  signupForm.username
                    ? "scale-90 translate-y-[-0.6rem] text-gray-500"
                    : "scale-100 translate-y-0 text-black"
                }
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-black
                peer-focus:scale-90 peer-focus:translate-y-[-0.6rem] peer-focus:text-gray-500`}
            >
              Username
            </label>
            {errorMessage.username && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-10">
                {errorMessage.username}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={signupForm.password}
              onChange={updateSignupField}
              className="peer block w-10/12 mx-auto pr-12 pl-2 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={`absolute left-11 text-sm text-black transition-all duration-200 transform origin-[0] top-3 
                ${
                  signupForm.password
                    ? "scale-90 translate-y-[-0.6rem] text-gray-500"
                    : "scale-100 translate-y-0 text-black"
                }
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-black
                peer-focus:scale-90 peer-focus:translate-y-[-0.6rem] peer-focus:text-gray-500`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-10 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <img
                src={
                  showPassword ? "./public/eye-fill.svg" : "./public/Vector.svg"
                }
                alt="Toggle Password Visibility"
                className="w-5 h-5"
              />
            </button>
            {errorMessage.password && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-10">
                {errorMessage.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={signupForm.confirmPassword}
              onChange={updateSignupField}
              className="peer block w-10/12 mx-auto pr-12 pl-2 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute left-10 text-sm text-black transition-all duration-200 transform origin-[0] top-3 
                ${
                  signupForm.confirmPassword
                    ? "scale-90 translate-y-[-0.6rem] text-gray-500"
                    : "scale-100 translate-y-0 text-black"
                }
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-black
                peer-focus:scale-90 peer-focus:translate-y-[-0.6rem] peer-focus:text-gray-500`}
            >
              Confirm Password
            </label>
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-10 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <img
                src={
                  showConfirmPassword
                    ? "./public/eye-fill.svg"
                    : "./public/Vector.svg"
                }
                alt="Toggle Confirm Password Visibility"
                className="w-5 h-5"
              />
            </button>
            {errorMessage.confirmPassword && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-10">
                {errorMessage.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="relative w-6/12 mx-auto text-[#1A1A1A] font-bold rounded-full shadow-md hover:shadow-lg transition overflow-hidden bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] p-[2px]"
          >
            <div className="flex items-center justify-center w-full h-[40px] bg-white rounded-full">
              SIGN UP
            </div>
          </button>
        </form>

        {/* Link text */}
        <p className="mt-4 mb-6 text-sm text-[#1A1A1A]">
          Already have an account?{" "}
          <span
            className="text-[#FF6F61] cursor-pointer hover:underline"
            onClick={handleLoginClick}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
