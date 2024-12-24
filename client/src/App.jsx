import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CheckAuth from "./components/checkAuth.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth>
              <HomePage></HomePage>
            </CheckAuth>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/login"
          element={
            <CheckAuth>
              <LoginPage />
            </CheckAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
