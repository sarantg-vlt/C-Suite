import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LinkedInAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    const params = new URLSearchParams(location.search);
    const Code = params.get("code");
    console.log(Code);
    if (Code) {
      const res = await axios.post("https://csuite-ui0f.onrender.com/api/user", {
        methord: "linkedin",
        Code,
      });
      if (res) {
        toast.success("Authentication Successfull ✅");
        navigate("/");
      }
    }
  };
  fetchData();
  return (
    <div
      className="screen-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h3>Verifiaction completed 👍</h3>
      <h1>Creating Account 🚀</h1>
    </div>
  );
};

export default LinkedInAuth;
