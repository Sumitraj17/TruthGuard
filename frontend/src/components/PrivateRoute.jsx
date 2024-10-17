import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/context.jsx";
import { toast } from "react-toastify";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useContext(Context);

  if (!isLoggedIn) {
    toast.error("Please log in or register to access this page!");
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
