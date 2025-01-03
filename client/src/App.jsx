import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Messages from "./pages/Messages.jsx";
import CheckAuth from "./components/checkAuth.jsx";
import ComingSoon from "./pages/comingsoon.jsx";

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
        <Route
        path="/messages"
        element={
          <CheckAuth>
            <Messages></Messages>
          </CheckAuth>
        }
        />
        <Route
        path="/comingsoon"
        element={
          <CheckAuth>
            <ComingSoon></ComingSoon>
          </CheckAuth>
        }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
