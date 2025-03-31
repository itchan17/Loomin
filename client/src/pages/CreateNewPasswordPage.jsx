import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNewPassword = () => {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrorMessage, setFormErrorMessage] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updatePasswordField = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setFormErrorMessage((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (passwordForm.password.length < 8) {
      setFormErrorMessage({
        password: "Password must be at least 8 characters long.",
      });
      return;
    }
    // Check for whitespace
    if (/\s/.test(passwordForm.password)) {
      setFormErrorMessage({ password: "Password cannot contain spaces." });
      return;
    }
    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.password)) {
      setFormErrorMessage({
        password: "Password must contain at least one special character.",
      });
      return;
    }
    // Check for at least one number
    if (!/\d/.test(passwordForm.password)) {
      setFormErrorMessage({
        password: "Password must contain at least one number.",
      });
      return;
    }
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(passwordForm.password)) {
      setFormErrorMessage({
        password: "Password must contain at least one lowercase letter.",
      });
      return;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(passwordForm.password)) {
      setFormErrorMessage({
        password: "Password must contain at least one uppercase letter.",
      });
      return;
    }

    // Check confirm password
    if (passwordForm.password !== passwordForm.confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Password does not match." });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`/reset-password/${token}`, {
        password: passwordForm.password,
      });
      console.log(response);

      // Reset states
      setPasswordForm({ password: "", confirmPassword: "" });
      setFormErrorMessage({ password: "", confirmPassword: "" });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-poppins">
      <div className="bg-white shadow-lg text-center overflow-hidden w-full h-full sm:rounded-lg sm:max-w-md sm:h-auto sm:w-full">
        <div className="relative bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-28 rounded-b-[50%] text-[#1A1A1A] flex flex-col justify-end pb-4">
          <h1 className="text-2xl font-bold mb-0">CREATE NEW PASSWORD</h1>
          <p className="text-sm tracking-widest uppercase text-white">
            TO CONTINUE
          </p>
        </div>

        <div className="flex flex-col items-center px-6 pt-2">
          <img
            src="/create-new-pass.svg"
            alt="Create New Password"
            className="w-72 h-28 mb-4"
          />
          <p className="text-md font-bold text-gray-700 text-center mb-6">
            Your New Password Must Be Different from Previously Used Password
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-6 space-y-4 pb-8"
        >
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={`[&::-ms-reveal]:hidden [&::-webkit-contacts-auto-fill-button]:hidden [&::-webkit-credentials-auto-fill-button]:hidden block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                  formErrorMessage.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder=""
                value={passwordForm.password}
                onChange={updatePasswordField}
              />
              <label
                htmlFor="password"
                className={`absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
              >
                New Password
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
            {formErrorMessage.password && (
              <p className="left-0 w-full text-sm text-red-500 top-full text-left ml-1">
                {formErrorMessage.password}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className={`[&::-ms-reveal]:hidden [&::-webkit-contacts-auto-fill-button]:hidden [&::-webkit-credentials-auto-fill-button]:hidden block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                  formErrorMessage.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder=""
                value={passwordForm.confirmPassword}
                onChange={updatePasswordField}
              />
              <label
                htmlFor="password"
                className={`absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
              >
                Confirm New Password
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
            {formErrorMessage.confirmPassword && (
              <p className="left-0 w-full text-sm text-red-500 top-full text-left ml-1">
                {formErrorMessage.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full max-w-[50%] mx-auto bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg transition mb-6"
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
              "SUBMIT"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;
