import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    toast.info("Session expired — please login again");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
