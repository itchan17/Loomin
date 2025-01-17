import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token, id } = useParams();
  const [validEmail, setValidEmail] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [effectExecuted, setEffectExecuted] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    console.log(validEmail);

    console.log(verifying);
    if (!effectExecuted) {
      const verifyEmail = async () => {
        try {
          const response = await axios.get(`/users/${id}/verify/${token}`);
          console.log(response);

          setVerifying(false);
          setValidEmail(true);
        } catch (error) {
          setVerifying(false);
          console.log(error);
        }
        setEffectExecuted(true); // This should be after the request completes
      };
      verifyEmail();
    }
  }, [token, effectExecuted]); // Both token and effectExecuted are now dependencies

  const handleResendEmail = async () => {
    try {
      const response = await axios.post(`/users/${id}/resend-verification`);
      console.log(response);
      setMessage(response.data.message);
      setStatus(response.status);
    } catch (error) {
      setMessage(error.response.data.message);
      setStatus(error.response.status);
      console.error("Error resending email", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-poppins">
      {!verifying &&
        (validEmail ? (
          <div className="bg-white shadow-lg text-center overflow-hidden w-full h-screen sm:rounded-lg sm:max-w-md sm:h-auto sm:w-full">
            <div className="border bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-28 text-[#1A1A1A] flex flex-col justify-end pb-6 rounded-b-[50%]">
              <h1 className="text-2xl font-bold mb-0 text-white">
                EMAIL IS VERIFIED!
              </h1>
            </div>
            <div className="p-6 text-lg space-y-6">
              <p className="text-gray-700">
                Congratulations! Your email address has been successfully
                verified. You can now access all the features of our
                application.
              </p>
              <button
                type="submit"
                onClick={() => navigate("/login")}
                className="w-full max-w-[50%] mx-auto bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg transition flex justify-center items-center space-x-2"
              >
                Go to Login
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg text-center overflow-hidden w-full h-screen sm:rounded-lg sm:max-w-md sm:h-auto sm:w-full">
            <div className="border bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-28 text-[#1A1A1A] flex flex-col justify-end pb-6 rounded-b-[50%]">
              <h1 className="text-2xl font-bold mb-0 text-white">
                EMAIL IS NOT VERIFIED!
              </h1>
            </div>
            <div className="p-6 text-lg space-y-6">
              <p className="text-gray-700">
                The verification token is either expired or invalid.
              </p>
              {message}
              <p
                className="underline cursor-pointer"
                onClick={handleResendEmail}
              >
                Resend email verification
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default VerifyEmail;
