// ProtectedRoute.js
import React, { useEffect } from "react";
import { Navigate, redirect } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import SignIn from "../../pages/signIn/SignIn";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
