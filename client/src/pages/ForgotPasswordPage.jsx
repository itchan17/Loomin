import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate email
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return; // Exit early
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/forgot-password", { email });
      console.log(response);

      // Reset states
      setMessage(response.data.message);
      setErrorMessage("");
      setEmail("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setIsLoading(false);
    }
  };

  const updateEmailField = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-poppins">
      <div className="bg-white shadow-lg text-center overflow-hidden w-full h-full sm:rounded-lg sm:max-w-md sm:h-auto sm:w-full relative">
        <div className="relative bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-28 rounded-b-[50%] text-[#1A1A1A] flex flex-col justify-end pb-4">
          <button
            onClick={() => navigate("/login")}
            className="absolute top-4 left-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold mb-0">FORGOT YOUR PASSWORD?</h1>
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
              type="text"
              name="email"
              id="email"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full  shadow-md text-sm text-[#1A1A1A] bg-gray-200 border appearance-none border focus:outline-none focus:ring-2 focus:ring-orange-400 peer ${
                errorMessage ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=""
              value={email}
              onChange={updateEmailField}
            />
            <label
              for="email"
              className="absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Email
            </label>
            {errorMessage && (
              <p className="w-full text-sm text-red-500 top-full text-left break-words">
                {errorMessage}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full max-w-[50%] mx-auto bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg transition"
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
