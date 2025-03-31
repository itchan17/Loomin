import useAuthStore from "../stores/AuthStore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = (props) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === null) {
      checkAuth();
    }
  }, []);

  if (isLoggedIn === null) {
    return navigate("/login");
  }
  if (!isLoggedIn) {
    return navigate("/login");
  }

  return isLoggedIn ? <div>{props.children}</div> : null;
};

export default CheckAuth;
