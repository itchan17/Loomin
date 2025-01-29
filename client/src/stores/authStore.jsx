import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  loginForm: {
    email: "",
    password: "",
    rememberMe: false,
  },

  signupForm: {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  },

  signupErrorMessage: {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    globalError: "",
  },

  loginErrorMessage: {
    email: "",
    password: "",
    globalError: "",
  },

  isLoggedIn: null,

  clearErrors: () => {
    set({
      loginErrorMessage: {
        email: "",
        password: "",
        globalError: "",
      },
      signupErrorMessage: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        globalError: "",
      },
    });
  },

  // Clear fields if user navigate to signup/login
  clearForm: () => {
    set({
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    });
  },

  updateSignupField: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      signupForm: {
        ...state.signupForm,
        [name]: value,
      },
      signupErrorMessage: { ...state.signupErrorMessage, [name]: "" },
    }));
    set({ signupErrorMessage: { globalError: "" } });
  },

  updateLoginField: (e) => {
    const { name, value, type, checked } = e.target;

    set({});

    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [name]: type === "checkbox" ? checked : value,
      },
      loginErrorMessage: { ...state.loginErrorMessage, [name]: "" },
    }));
    set({ loginErrorMessage: { globalError: "" } });
  },

  login: async () => {
    const { loginForm } = useAuthStore.getState();

    const updateErrorMessage = (field, message) => {
      set((state) => ({
        loginErrorMessage: {
          ...state.loginErrorMessage,
          [field]: message,
        },
      }));
    };

    // Validation
    if (!loginForm.email || !loginForm.password) {
      updateErrorMessage("globalError", "Please complete all required fields.");
      return false; // Exit early
    }

    // Validate email address
    if (
      !loginForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)
    ) {
      updateErrorMessage("email", "Please enter a valid email address.");
      return false; // Exit early
    }

    try {
      // Send the user credentials
      await axios.post("/login", loginForm);
      set({ isLoggedIn: true });
      set({
        loginForm: {
          email: "",
          password: "",
        },
        loginErrorMessage: {
          email: "",
          password: "",
          globalError: "",
        },
      });
      return true; // Login successful
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error);
        updateErrorMessage("globalError", error.response.data.error);
      } else if (
        error.response.data.notVerified &&
        error.response.status === 400
      ) {
        console.log(error);
        updateErrorMessage("email", error.response.data.notVerified);
      } else {
        console.error("Unexpected login error:", error.message);
        updateErrorMessage(
          "globalError",
          "Something went wrong. Please try again."
        );
      }
      set({ isLoggedIn: false });
      return false; // Login failed
    }
  },

  signup: async (setSignupSuccessful) => {
    const { signupForm, signupErrorMessage } = useAuthStore.getState();
    const nameRegex = /^[^\w\s]+$/;

    const updateErrorMessage = (field, message) => {
      set((state) => ({
        signupErrorMessage: {
          ...state.signupErrorMessage,
          [field]: message,
        },
      }));
    };

    // Validations
    if (
      !signupForm.firstName ||
      !signupForm.lastName ||
      !signupForm.email ||
      !signupForm.username ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      updateErrorMessage("globalError", "Please complete all required fields.");
      return;
    }

    // Validate first name field
    if (/[^a-zA-Z\s'-]/.test(signupForm.firstName)) {
      updateErrorMessage("firstName", "Please enter a valid name.");
      return;
    }
    if (!signupForm.firstName.trim()) {
      updateErrorMessage("firstName", "Please enter a valid name.");
      return;
    }

    // Validate last name field
    if (/[^a-zA-Z\s'-]/.test(signupForm.lastName)) {
      updateErrorMessage("lastName", "Please enter a valid name.");
      return;
    }
    if (!signupForm.lastName.trim()) {
      updateErrorMessage("lastName", "Please enter a valid name.");
      return;
    }

    // Validate email address
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email)) {
      updateErrorMessage("email", "Please enter a valid email address.");
      return;
    }
    if (!signupForm.email.trim()) {
      updateErrorMessage("email", "Please enter a valid email address.");
      return;
    }

    // Validate username
    if (!/^(?=.*[a-z])[a-z0-9_-]{3,20}$/.test(signupForm.username)) {
      updateErrorMessage(
        "username",
        "Username must be 3-20 characters long, lowercase, and may contain numbers, underscores, and hyphens."
      );
      return;
    }

    // Validate password
    if (signupForm.password.length < 8) {
      updateErrorMessage(
        "password",
        "Password must be at least 8 characters long."
      );
      return;
    }
    // Check for whitespace
    if (/\s/.test(signupForm.password)) {
      updateErrorMessage("password", "Password cannot contain spaces.");
      return;
    }
    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(signupForm.password)) {
      updateErrorMessage(
        "password",
        "Password must contain at least one special character."
      );
      return;
    }
    // Check for at least one number
    if (!/\d/.test(signupForm.password)) {
      updateErrorMessage(
        "password",
        "Password must contain at least one number."
      );
      return;
    }
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(signupForm.password)) {
      updateErrorMessage(
        "password",
        "Password must contain at least one lowercase letter."
      );
      return;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(signupForm.password)) {
      updateErrorMessage(
        "password",
        "Password must contain at least one uppercase letter."
      );
      return;
    }

    // Check confirm password
    if (signupForm.password !== signupForm.confirmPassword) {
      updateErrorMessage("confirmPassword", "Password does not match.");
      return;
    }

    // If all valid input create the user
    try {
      console.log(signupForm);
      const res = await axios.post("/signup", signupForm);
      console.log(res);
      setSignupSuccessful(true);
      // Reset form state after successful signup
      set({
        signupForm: {
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        },
        signupErrorMessage: {
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          globalError: "",
        },
      });
    } catch (error) {
      console.log(error);
      // Handle errors from the API
      if (error.response && error.response.request.status === 409) {
        if (error.response.data.email) {
          updateErrorMessage("email", error.response.data.email);
        }
        if (error.response.data.username) {
          updateErrorMessage("username", error.response.data.username);
        }
      } else {
        // Handle unexpected errors
        updateErrorMessage(
          "globalError",
          "Something went wrong. Please try again."
        );
      }
    }
  },

  logout: async () => {
    try {
      await axios.get("/logout");
    } catch (error) {
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      // Send the user credentials
      await axios.get("/check-auth");

      set({ isLoggedIn: true });
    } catch (error) {
      // Set to false
      set({ isLoggedIn: false });
      throw error;
    }
  },
}));

export default useAuthStore;
