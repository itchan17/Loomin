import { create } from "zustand";
import axios from "axios";

const usersStore = create((set) => ({
  loginForm: {
    email: "",
    password: "",
  },

  signupForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },

  errorMessage: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },

  isLoggedIn: null,

  clearErrors: () => {
    set({
      errorMessage: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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
    }));
  },

  updateLoginField: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [name]: value,
      },
    }));
  },

  signup: async (req, res) => {
    const { signupForm, errorMessage } = usersStore.getState();

    const updateErrorMessage = (field, message) => {
      set((state) => ({
        errorMessage: {
          ...state.errorMessage,
          [field]: message,
        },
      }));
    };

    // Validations
    if (!signupForm.firstName) {
      updateErrorMessage("firstName", "This field is required");
    } else {
      updateErrorMessage("firstName", "");
    }
    if (!signupForm.lastName) {
      updateErrorMessage("lastName", "This field is required");
    } else {
      updateErrorMessage("lastName", "");
    }
    if (!signupForm.email) {
      updateErrorMessage("email", "This field is required");
    } else {
      updateErrorMessage("email", "");
    }
    if (!signupForm.password) {
      updateErrorMessage("password", "This field is required");
    } else {
      if (signupForm.password.length < 8) {
        updateErrorMessage("password", "Password must be atleast 8 characters");
      } else updateErrorMessage("password", "");
    }
    if (!signupForm.confirmPassword) {
      updateErrorMessage("confirmPassword", "This field is required");
    } else {
      if (signupForm.confirmPassword !== signupForm.password) {
        updateErrorMessage("confirmPassword", "Password did not match");
      } else updateErrorMessage("confirmPassword", "");
    }

    try {
      const res = await axios.post("/signup", {
        first_name: signupForm.firstName,
        last_name: signupForm.lastName,
        email: signupForm.email,
        password: signupForm.password,
      });
      set({
        signupForm: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });
    } catch (error) {
      if (error.response.request.status === 409) {
        updateErrorMessage("email", error.response.data.message);
      }
    }
  },

  login: async (req, res) => {
    const { loginForm, errorMessage } = usersStore.getState();

    const updateErrorMessage = (field, message) => {
      set((state) => ({
        errorMessage: {
          ...state.errorMessage,
          [field]: message,
        },
      }));
    };

    // Validation
    if (!loginForm.email) {
      updateErrorMessage("email", "Email is required");
    } else {
      updateErrorMessage("email", "");
    }

    if (!loginForm.password) {
      updateErrorMessage("password", "Password is required");
    } else {
      updateErrorMessage("password", "");
    }

    // Check if there's empty field then throw error
    if (!loginForm.email || !loginForm.password)
      throw new Error("Login failed");

    // Check if field is not empty
    if (loginForm.email && loginForm.password) {
      try {
        // Send the user credentials
        await axios.post("/login", loginForm);
        set({ isLoggedIn: true });
        set({
          loginForm: {
            email: "",
            password: "",
          },
        });
      } catch (error) {
        if (error) {
          set((state) => ({
            isLoggedIn: false,
            errorMessage: {
              ...state.errorMessage,
              email: "Invalid account credentials, please try again",
              password: "Invalid account credentials, please try again",
            },
          }));
        }
        throw new Error("Login failed");
      }
    }
  },

  checkAuth: async (req, res) => {
    try {
      // Send the user credentials
      await axios.get("/check-auth");

      set({ isLoggedIn: true });
    } catch (error) {
      // Set to false
      set({ isLoggedIn: false });
    }
  },
}));

export default usersStore;
