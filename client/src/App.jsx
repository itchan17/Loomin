import React, { useState } from "react";

const SignupPage = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validatePasswords = () => {
    const newErrors = { password: "", confirmPassword: "" };
    if (password.length < 8) {
      newErrors.password = "Password should be at least 8 characters.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePasswords();
    if (!errors.password && !errors.confirmPassword) {
      // Handle form submission logic
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-center overflow-hidden mx-4">
        {/* Top half-circle gradient */}
        <div className="relative bg-gradient-to-t from-[#FF6F61] to-[#FFD23F] h-32 rounded-b-[50%] text-[#1A1A1A] flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-0">SIGN UP</h1>
          <p className="text-sm tracking-widest uppercase text-white mt-2">
            TO CONTINUE
          </p>
        </div>

        <form
          className="flex flex-col px-6 pt-6 space-y-4"
          onSubmit={handleSubmit}
        >
          {["First Name", "Last Name", "Email"].map((field) => (
            <div className="relative" key={field}>
              <input
                type={field === "Email" ? "email" : "text"}
                required
                className="peer block w-10/12 mx-auto px-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder=" "
              />
              <label className="absolute left-14 text-sm text-black transition-all duration-200 transform scale-100 top-2.5 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:translate-y-[-0.6rem] peer-focus:scale-90 peer-focus:text-gray-500 peer-valid:translate-y-[-0.6rem] peer-valid:scale-90 peer-valid:text-gray-500">
                {field}
              </label>
            </div>
          ))}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="peer block w-10/12 mx-auto pr-12 pl-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute left-14 text-sm text-black transition-all duration-200 transform scale-100 top-2.5 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:translate-y-[-0.6rem] peer-focus:scale-90 peer-focus:text-gray-500 peer-valid:translate-y-[-0.6rem] peer-valid:scale-90 peer-valid:text-gray-500">
              Password
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-10 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <img
                src="/Vector.svg"
                alt="Toggle Password Visibility"
                className="w-5 h-5"
              />
            </button>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              className="peer block w-10/12 mx-auto pr-12 pl-2.5 pt-4 pb-2 text-sm text-[#1A1A1A] bg-gray-200 border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="absolute left-14 text-sm text-black transition-all duration-200 transform scale-100 top-2.5 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:translate-y-[-0.6rem] peer-focus:scale-90 peer-focus:text-gray-500 peer-valid:translate-y-[-0.6rem] peer-valid:scale-90 peer-valid:text-gray-500">
              Confirm Password
            </label>
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-10 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <img
                src="/Vector.svg"
                alt="Toggle Confirm Password Visibility"
                className="w-5 h-5"
              />
            </button>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Rectangle button */}
          <button
            type="submit"
            className="w-6/12 mx-auto bg-white text-[#1A1A1A] font-bold py-2 rounded-md border border-gray-300 shadow-md hover:shadow-lg transition"
          >
            SIGN UP
          </button>
        </form>

        {/* Link text */}
        <p className="mt-4 mb-6 text-sm text-[#1A1A1A]">
          Already have an account?{" "}
          <span
            className="text-orange-500 cursor-pointer hover:underline"
            onClick={() => onSwitch("login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
