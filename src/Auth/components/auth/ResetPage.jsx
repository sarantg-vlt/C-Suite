import React, { useState } from "react";
import axios from "axios";
import assets from "../assets/assets";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";
import './Reset-password.css'
function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const ResetPage = ({ toggleSlide }) => {
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
    const token = query.get("oobCode"); // Get the reset token from URL
    if (!token) {
      toast.error("Invalid reset link!");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    try {
      // Step 1: Verify reset link to get userId
      const verifyResponse = await axios.post(
        "https://c-suite-xpmf.onrender.com/api/user/verify-reset-link",
        { oobCode: token }
      );

      if (!verifyResponse.data.success) {
        toast.error(verifyResponse.data.message || "Invalid reset link");
        return;
      }

      const userId = verifyResponse.data.userId;
      console.log("Retrieved userId:", userId);

      // Step 2: Log the final API URL
      const apiUrl = `https://c-suite-xpmf.onrender.com/api/user/${userId}/resetpass`;
      console.log("Final API URL:", apiUrl);
      console.log("Payload:", { newPassword: form.newPassword });

      // Step 3: Call reset password API
      const resetResponse = await axios.put(apiUrl, {
        newPassword: form.newPassword,
      });

      if (resetResponse.data.success) {
        toast.success("Password updated successfully!");
      } else {
        toast.error(resetResponse.data.message || "Failed to update password");
      }
    } catch (err) {
      console.error("Error in password reset flow:", err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="screen-container">

      <div className="forgot-password-container" style={{width:400,padding:50,height:"90%",borderRadius:'1em'}}>
        <div className="logo-container">
          <img src='/image.png' alt="logo" className="logo-img" />
        </div>
        <div className="forgot-password-content">
          <img
            src={assets.Images.Lock}
            alt="forgot-password"
            className="forgot-password-img"
          />
          <h1 className="forgot-password-title">Change Password</h1>
          <p className="forgot-password-subtitle">
            Update your password with a new one.
          </p>
          <form className="forgot-password-form">
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                onChange={(e) =>
                  handleValueChange("newPassword", e.target.value)
                }
                className="input"
              />
              <img
                src={assets.Images.Lock_Vector}
                alt="mail-icon"
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) =>
                  handleValueChange("confirmPassword", e.target.value)
                }
                className="input"
              />
              <img
                src={assets.Images.Lock_Vector}
                alt="mail-icon"
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div
              onClick={handleChangePassword}
              className="update-password-button"
            >
              <p>Update Password</p>
            </div>
          </form>
        </div>
      </div>
     </div>
  );
};

export default ResetPage;
