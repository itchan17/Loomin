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
import NotificationPage from "./pages/NotificationPage.jsx";
import CreateNewPasswordPage from "./pages/CreateNewPasswordPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import useSocketStore from "./stores/socketStore";
import useUserStore from "./stores/UserStore";
import VerifyEmail from "./components/VerifyEmail.jsx";
import FollowingPage from './pages/FollowingPage.jsx';

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
          path="/notifications"
          element={
            <CheckAuth>
              <NotificationPage />
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
        <Route path="/users/:id/verify/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:token"
          element={<CreateNewPasswordPage />}
        />
        <Route
          path="/following"
          element={
            <CheckAuth>
              <FollowingPage />
            </CheckAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
