import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../components/auth/Auth";
import ResetPage from "../components/auth/ResetPage";
import LinkedInAuth from "../components/auth/LinkedInAuth";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/reset-password" element={<ResetPage />} />
      <Route path="/auth-linkedin-bridge" element={<LinkedInAuth />} />
    </Routes>
  );
};

export default AuthRoutes;
