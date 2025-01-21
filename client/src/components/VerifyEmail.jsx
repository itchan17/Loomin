import { useState, useEffect } from "react";
import useAuthStore from "../stores/AuthStore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [status, setStatus] = useState();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/api/verify/${token}`);
        setStatus(response.response.status);
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-poppins">
      <div className="bg-white shadow-lg text-center overflow-hidden w-full h-screen sm:rounded-lg sm:max-w-md sm:h-auto sm:w-full">
        <div className="border bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-28 text-[#1A1A1A] flex flex-col justify-end pb-6 rounded-b-[50%]">
          <h1 className="text-2xl font-bold mb-0 text-white">
            EMAIL IS VERIFIED!
          </h1>
        </div>
        <div className="p-6 text-lg space-y-6">
          <p className="text-gray-700">
            Congratulations! Your email address has been successfully verified.
            You can now access all the features of our application.
          </p>

          <button
            type="subbuttonmit"
            onClick={() => {
              navigate("/login");
            }}
            className="w-full max-w-[50%] mx-auto bg-gradient-to-r from-[#FF6F61] to-[#FFD23F] text-white font-bold py-2 rounded-full shadow-md hover:shadow-lg transition flex justify-center items-center space-x-2"
          >
            {" "}
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
