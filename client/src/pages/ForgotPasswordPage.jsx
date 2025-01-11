import React, { useState } from "react";

const useNavigate = () => {
  return (path) => {
    alert(`Navigate to: ${path}`);
  };
};

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handleSendClick = () => {
    if (!email) {
      setErrorMessage("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    alert("Verification email sent!");
    navigate("/reset-password");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-poppins">
      <div className="bg-white shadow-lg text-center overflow-hidden w-full h-full sm:rounded-lg sm:max-w-md sm:h-auto sm:w-full relative">
        <button
          onClick={() => navigate("/login")}
          className="absolute top-2 left-2"
        >
          <img src="/back-button.svg" alt="Back" className="w-6 h-6" />
        </button>

        <div className="relative bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-28 rounded-b-[50%] text-[#1A1A1A] flex flex-col justify-end pb-4">
          <button
            onClick={() => navigate("/login")}
            className="absolute top-4 left-4"
          >
            <img src="/back-button.svg" alt="Back" className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold mb-0">FORGET YOUR PASSWORD?</h1>
          <p className="text-sm tracking-widest uppercase text-white">
            RECOVER ACCOUNT
          </p>
        </div>

        <div className="flex flex-col px-6 pt-4 pb-8 space-y-4">
          <img
            src="/forgot-pass-image.svg"
            alt="Forgot Password"
            className="w-90 h-28 mx-auto"
          />

          <p className="text-center text-lg text-[#1A1A1A]">
            Please Enter Your Email Address to Receive a Verification
          </p>

          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              className={`block w-full px-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errorMessage ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={email}
              onChange={handleInputChange}
            />
            <label
              htmlFor="email"
              className={`absolute left-2 text-sm text-black transition-all duration-200 transform scale-100 top-1 origin-[0] ${
                email
                  ? "translate-y-[-0.2rem] scale-90 text-gray-500"
                  : "translate-y-2 scale-100"
              }`}
            >
              Email
            </label>
            {errorMessage && (
              <p className="absolute left-0 w-full text-sm text-red-500 top-full text-left ml-1">
                {errorMessage}
              </p>
            )}
          </div>

          <p className="text-center text-sm text-[#1A1A1A] pb-4">
            <span
              className="text-orange-500 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Try another way
            </span>
          </p>

          <button
            onClick={handleSendClick}
            className="w-full max-w-[50%] mx-auto bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg transition mb-4"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
