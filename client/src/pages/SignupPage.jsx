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
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-poppins">
      <div className="bg-white shadow-lg text-center overflow-hidden w-full h-full sm:rounded-lg sm:max-w-md sm:h-auto sm:w-full">
        <div className="relative bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-28 rounded-b-[50%] text-[#1A1A1A] flex flex-col justify-end pb-4">
          <h1 className="text-2xl font-bold mb-0">SIGN UP</h1>
          <p className="text-sm tracking-widest uppercase text-white">
            TO CONTINUE
          </p>
        </div>

        <form
          className="flex flex-col px-6 pt-6 space-y-8"
          onSubmit={handleSubmit}
        >
          {/* First Name Field */}
          <div className="relative">
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`block w-full px-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={signupForm.firstName}
              onChange={updateSignupField}
            />
            <label
              htmlFor="firstName"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                signupForm.firstName
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
            >
              First Name
            </label>
            {errorMessage.firstName && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-1">
                {errorMessage.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="relative">
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={`block w-full px-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={signupForm.lastName}
              onChange={updateSignupField}
            />
            <label
              htmlFor="lastName"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                signupForm.lastName
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
            >
              Last Name
            </label>
            {errorMessage.lastName && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-1">
                {errorMessage.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="text"
              id="email"
              name="email"
              className={`block w-full px-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={signupForm.email}
              onChange={updateSignupField}
            />
            <label
              htmlFor="email"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                signupForm.email
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
            >
              Email
            </label>
            {errorMessage.email && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-1">
                {errorMessage.email}
              </p>
            )}
          </div>
          
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              className={`block w-full px-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={signupForm.username}
              onChange={updateSignupField}
            />
            <label
              htmlFor="username"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                signupForm.username
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
            >
              Username
            </label>
            {errorMessage.username && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-1">
                {errorMessage.username}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={`block w-full pr-12 pl-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={signupForm.password}
              onChange={updateSignupField}
            />
            <label
              htmlFor="password"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                signupForm.password
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <img
                src={showPassword ? "/eye-fill.svg" : "/Vector.svg"}
                alt="Toggle Password Visibility"
                className="w-5 h-5"
              />
            </button>
            {errorMessage.password && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-1">
                {errorMessage.password}
              </p>
            )}
          </div>
          
          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className={`block w-full pr-12 pl-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={signupForm.confirmPassword}
              onChange={updateSignupField}
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                signupForm.confirmPassword
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
            >
              Confirm Password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <img
                src={showConfirmPassword ? "/eye-fill.svg" : "/Vector.svg"}
                alt="Toggle Confirm Password Visibility"
                className="w-5 h-5"
              />
            </button>
            {errorMessage.confirmPassword && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-1">
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
