import React from "react";
import { Navigate } from "react-router-dom"; // استيراد Navigate بدلاً من Redirect

const ProtectedRoute = ({ children }) => {
  // هذه هي طريقة التحقق من حالة تسجيل الدخول، يمكن تغييرها لتتناسب مع طريقتك
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // مثال على التحقق

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
