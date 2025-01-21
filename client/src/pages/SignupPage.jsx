import React, { useState } from "react";
import useAuthStore from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignupPage = ({ onSwitch }) => {
  const navigate = useNavigate();

  // States
  const signupForm = useAuthStore((state) => state.signupForm);
  const signupErrorMessage = useAuthStore((state) => state.signupErrorMessage);

  // State functions
  const signup = useAuthStore((state) => state.signup);
  const updateSignupField = useAuthStore((state) => state.updateSignupField);
  const clearErrors = useAuthStore((state) => state.clearErrors);
  const clearForm = useAuthStore((state) => state.clearForm);

  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signup();
    setIsLoading(false);
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

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col px-6 pt-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                  signupErrorMessage.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder=""
                value={signupForm.firstName}
                onChange={updateSignupField}
              />
              <label
                htmlFor="firstName"
                className="absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                First Name<span className="text-red-500">*</span>
              </label>
              {signupErrorMessage.firstName && (
                <p className=" w-full text-sm text-red-500 top-full text-left break-words">
                  {signupErrorMessage.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                  signupErrorMessage.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder=""
                value={signupForm.lastName}
                onChange={updateSignupField}
              />
              <label
                htmlFor="lastName"
                className="absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Last Name<span className="text-red-500">*</span>
              </label>
              {signupErrorMessage.lastName && (
                <p className=" w-full text-sm text-red-500 top-full text-left break-words">
                  {signupErrorMessage.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                  signupErrorMessage.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder=""
                value={signupForm.email}
                onChange={updateSignupField}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Email<span className="text-red-500">*</span>
              </label>
              {signupErrorMessage.email && (
                <p className=" w-full text-sm text-red-500 top-full text-left break-words">
                  {signupErrorMessage.email}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                  signupErrorMessage.username
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder=""
                value={signupForm.username}
                onChange={updateSignupField}
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Username<span className="text-red-500">*</span>
              </label>
              {signupErrorMessage.username && (
                <p className=" w-full text-sm text-red-500 top-full text-left break-words">
                  {signupErrorMessage.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`relative block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                    signupErrorMessage.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder=""
                  value={signupForm.password}
                  onChange={updateSignupField}
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Password<span className="text-red-500">*</span>
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
              </div>
              {signupErrorMessage.password && (
                <p className=" w-full text-sm text-red-500 top-full text-left break-words">
                  {signupErrorMessage.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer  ${
                    signupErrorMessage.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder=""
                  value={signupForm.confirmPassword}
                  onChange={updateSignupField}
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Confirm Password<span className="text-red-500">*</span>
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
              </div>
              {signupErrorMessage.globalError ? (
                <p className="w-full text-sm text-red-500 top-full text-left break-words">
                  {signupErrorMessage.globalError}
                </p>
              ) : signupErrorMessage.confirmPassword ? (
                <p className="w-full text-sm text-red-500 top-full text-left break-words">
                  {signupErrorMessage.confirmPassword}
                </p>
              ) : null}
            </div>
          </div>
          {/* First Name Field */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-8  relative w-6/12 mx-auto text-[#1A1A1A] font-bold rounded-full shadow-md hover:shadow-lg transition overflow-hidden bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] p-[2px]"
          >
            <div className="flex items-center justify-center w-full h-[40px] bg-white rounded-full">
              {isLoading ? (
                <div
                  class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-loomin-orange"
                  role="status"
                >
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "SIGN UP"
              )}
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
