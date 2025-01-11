import React, { useState } from "react";
import useAuthStore from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onSwitch }) => {
  const navigate = useNavigate();

  // States
  const loginForm = useAuthStore((state) => state.loginForm);
  const loginErrorMessage = useAuthStore((state) => state.loginErrorMessage);

  // State functions
  const updateLoginField = useAuthStore((state) => state.updateLoginField);
  const login = useAuthStore((state) => state.login);
  const clearErrors = useAuthStore((state) => state.clearErrors);
  const clearForm = useAuthStore((state) => state.clearForm);

  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle password visbility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const loginSuccessful = await login();
    if (loginSuccessful) {
      navigate("/");
    }
    setIsLoading(false);
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

        <form className="" onSubmit={handleSubmit}>
          <div className="flex flex-col px-6 pt-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                name="email"
                id="email"
                className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                  loginErrorMessage.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder=""
                value={loginForm.email}
                onChange={updateLoginField}
              />
              <label
                for="email"
                className="absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Email
              </label>
              {loginErrorMessage.email && (
                <p className="w-full text-sm text-red-500 top-full text-left break-words">
                  {loginErrorMessage.email}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className={`[&::-ms-reveal]:hidden [&::-webkit-contacts-auto-fill-button]:hidden [&::-webkit-credentials-auto-fill-button]:hidden block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                    loginErrorMessage.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder=""
                  value={loginForm.password}
                  onChange={updateLoginField}
                />
                <label
                  htmlFor="password"
                  className={`absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${
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
              </div>
              {loginErrorMessage.globalError && (
                <p className="w-full text-sm text-red-500 top-full text-left break-words">
                  {loginErrorMessage.globalError}
                </p>
              )}
            </div>

            <div className="flex w-full justify-between items-center w-10/12 mx-auto text-sm text-[#1A1A1A] my-4">
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
              disabled={isLoading}
              className="w-full max-w-[50%] mx-auto bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg transition flex justify-center items-center space-x-2"
            >
              {isLoading ? (
                <div
                  class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "LOG IN"
              )}
            </button>
          </div>
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
