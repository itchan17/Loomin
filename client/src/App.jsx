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
import MessagePage from "./pages/MessagePage.jsx";
import CheckAuth from "./components/checkAuth.jsx";
import ComingSoon from "./pages/comingsoon.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import useSocketStore from "./stores/socketStore";
import useUserStore from "./stores/UserStore";

const App = () => {
  const initializeSocket = useSocketStore((state) => state.initializeSocket);
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  useEffect(() => {
    if (loggedInUser?._id) {
      initializeSocket();
      console.log("App Running");
    }
    return () => {
      useSocketStore.getState().disconnectSocket();
    };
  }, [loggedInUser]);

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
          path="/comingsoon"
          element={
            <CheckAuth>
              <ComingSoon></ComingSoon>
            </CheckAuth>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/inbox"
          element={
            <CheckAuth>
              <MessagePage></MessagePage>
            </CheckAuth>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <CheckAuth>
              <ProfilePage></ProfilePage>
            </CheckAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
