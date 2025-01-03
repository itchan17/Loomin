import React, { useState } from "react";

const CreateNewPassword = () => {
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updatePasswordField = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setErrorMessage((prev) => ({ ...prev, [name]: "" }));
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!passwordForm.password) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password is required",
      }));
      hasError = true;
    }

    if (passwordForm.password !== passwordForm.confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      hasError = true;
    }

    if (!passwordForm.confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password",
      }));
      hasError = true;
    }

    if (!hasError) {
      alert("Password reset successfully!");
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

        <div className="flex flex-col items-center px-14 pt-2">
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
          className="flex flex-col px-16 space-y-8 pb-8"
          onSubmit={validateAndSubmit}
        >
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={`block w-full pr-12 pl-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={passwordForm.password}
              onChange={updatePasswordField}
            />
            <label
              htmlFor="password"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                passwordForm.password
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
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
            {errorMessage.password && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-1">
                {errorMessage.password}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className={`block w-full pr-12 pl-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder=""
              value={passwordForm.confirmPassword}
              onChange={updatePasswordField}
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                passwordForm.confirmPassword
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

          <button
            type="submit"
            className="w-full max-w-[50%] mx-auto bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg transition mb-6"
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;
