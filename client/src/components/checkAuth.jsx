import authStore from "../stores/authStore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = (props) => {
  const store = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.isLoggedIn === null) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoggedIn === null) {
    return navigate("/login");
  }
  if (!store.isLoggedIn) {
    return navigate("/login");
  }

  return <div>{props.children}</div>;
};

export default CheckAuth;
