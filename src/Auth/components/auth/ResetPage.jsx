import React, { useState } from "react";
import assets from "../assets/assets";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { confirmPasswordReset } from "@firebase/auth";

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const ResetPage = () => {
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const query = useQuery();

  const handleValueChange = (type, value) => {
    setForm({ ...form, [type]: value });
  };

  const handleChangePassword = async () => {
    const { newPassword, confirmPassword } = form;
    const oobCode = query.get("oobCode");

    if (!oobCode) {
      toast.error("Invalid or expired reset link. Please try again.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-top">
        <div className="logo-container">
          <img src={assets.Images.CSuiteLogo} alt="logo" className="logo-img" />
        </div>
        <div className="forgot-password-content">
          <img
            src={assets.Images.Lock}
            alt="forgot-password"
            className="forgot-password-img"
          />
          <h1 className="forgot-password-title">Change Password</h1>
          <p className="forgot-password-subtitle">
            Update your password with a new one
          </p>
          <form className="forgot-password-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={form.newPassword}
                onChange={(e) => handleValueChange("newPassword", e.target.value)}
                className="input"
              />
              <img
                src={assets.Images.Lock_Vector}
                alt="toggle visibility"
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => handleValueChange("confirmPassword", e.target.value)}
                className="input"
              />
              <img
                src={assets.Images.Lock_Vector}
                alt="toggle visibility"
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <button
              type="button"
              onClick={handleChangePassword}
              className="update-password-button"
            >
              <p>Update Password</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;

