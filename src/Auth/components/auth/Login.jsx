import React, { useEffect, useState } from "react";
import assets from "../assets/assets";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { toast } from "react-toastify";
import { isStrongPassword, isValidEmail } from "../../utils/validityCheck";
import { googlePopup } from "../../firebase/auth_google_popup";
import { signinMicrosoft } from "../../firebase/auth_microsoft_execute";
import { handleLinkedIn } from "../../firebase/auth_linkedIn_execute";
// import { signinLinkedIn, handleLinkedInCallback } from "../../firebase/auth_linkedIn_execute";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { check, loginCheck } from "../../../api/baseapi";

const Login = ({ toggleSlide }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: null, password: null });
  const [error, setError] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const Courseid = params.get("courseid");

  const handleValueChange = (type, value, valid) => {
    setForm({ ...form, [type]: value });
    if (valid && error[type] === true) setError({ ...error, [type]: false });
    if (!valid && error[type] === false) setError({ ...error, [type]: true });
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("isloggedin") === "true") {
      if (localStorage.getItem("elacomplete") == "false") {
        navigate("../quick-assessment");
      } else {
        if (Courseid) {
          navigate("../home/courseDetails/" + Courseid);
        } else {
          navigate("../home");
        }
      }
    }
  }, []);

  const handleLogin = async () => {
    const newError = {};
    if (!isValidEmail(form.email)) {
      newError.email = true;
    }
    if (!isStrongPassword(form.password)) {
      newError.password = true;
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }
    try {
      const res = await check({
        email: form?.email,
      });
      if (res.status === 200) {
        try {
          const res = await loginCheck({
            email: form?.email,
            password: form?.password,
          });
          toast.success("Login Successful");
          console.log(res.data);
          localStorage.setItem(
            "userDataUpdated",
            JSON.stringify(res.data.user)
          );
          if (res.data.user.type == "user") {
            localStorage.setItem("isloggedin", true);
            localStorage.setItem("userid", res.data.user._id);
            localStorage.setItem("name", res.data.user.name);
            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("linkedin", res.data.user.linkedin);
            localStorage.setItem("elacomplete", res.data.user.elaComplete);
            if (res.data.user.elaComplete == false) {
              setTimeout(() => {
                navigate("../quick-assessment");
              }, 5000);
            } else {
              setTimeout(() => {
                if (Courseid) {
                  navigate("../home/courseDetails/" + Courseid);
                } else {
                  navigate("../home");
                }
              }, 5000);
            }
          } else {
            toast.success("not a user?");
          }
          console.log("User data stored in localStorage");
        } catch (error) {
          console.log("Invalid Password", error);
          toast.error("Invalid Password");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User not found:", error.response.data.message);
        toast.error("User not found");
      } else {
        console.log("Unexpected Error", error);
        toast.error("Unexpected Error");
      }
    }
  };

  const handleSocialLogin = async (type) => {
    let res;
    if (type === "google") {
      res = await googlePopup(navigate, Courseid);
      if (res == "home") {
        setTimeout(() => {
          if (Courseid) {
            navigate("../home/courseDetails/" + Courseid);
          } else {
            navigate("../home");
          }
        }, 5000);
      }
      if (res == "quick-assessment") {
        setTimeout(() => {
          navigate("../quick-assessment");
        }, 5000);
      }
    }
    if (type === "github") {
     handleLinkedIn();
     
    }
     if (type === "microsoft") {
    res = await signinMicrosoft();

    if (res === "home") {
      navigate("../home/courseDetails/" + Courseid);
    } else if (res === "quick-assessment") {
      navigate("../quick-assessment");
    } else {
      console.error("Error signing in with Microsoft.");
    }
  }
};

  return (
    <div className="login-container">
      <div className="logo-container" style={{ margin: "0px" }}>
        <img src={assets.Images.CSuiteLogo} alt="logo" className="logo-img" />
      </div>
      <div className="login-details">
        <h2 className="login-title">Hello Again!</h2>
        <p className="login-subtitle">
          Empower Your Journey: Where Professionalism <br /> Meets Progress
        </p>
        <form className="login-form">
          <div className="input-container">
            <input
              type="text"
              placeholder="Email or username"
              style={{ borderColor: error.email ? "red" : "#C7C7C7" }}
              onChange={(e) =>
                handleValueChange(
                  "email",
                  e.target.value,
                  isValidEmail(e.target.value)
                )
              }
              className="input"
            />
            {error.email && <p className="input-error">Enter valid Email</p>}
            <img
              src={assets.Images.mail_icon}
              alt="mail-icon"
              className="icon"
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ borderColor: error.password ? "red" : "#C7C7C7" }}
              onChange={(e) =>
                handleValueChange(
                  "password",
                  e.target.value,
                  isStrongPassword(e.target.value)
                )
              }
              className="input"
            />
            {error.password && (
              <p className="input-error">Enter valid password</p>
            )}
            <img
              src={assets.Images.Lock_Vector}
              alt="mail-icon"
              className="icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="options-container">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox" />
              <p style={{ margin: "0px" }} className="checkbox-text">
                Remember me
              </p>
            </label>
            <p
              onClick={() => toggleSlide("forgot-password")}
              className="forgot-password-link"
            >
              Forgot Password?
            </p>
          </div>
          <div className="login-button" onClick={() => handleLogin()}>
            <p style={{ margin: "0px" }}>Login</p>
          </div>
        </form>
        <div className="divider-container">
          <div className="divider"></div>
          <p className="divider-text">or</p>
          <div className="divider"></div>
        </div>
        <div className="social-login-container">
          <div
            className="social-login-button"
            onClick={() => handleSocialLogin("google")}
          >
            <img
              src={assets.Images.Google}
              alt="Google"
              className="social-login-icon"
            />
          </div>
          <div
            className="social-login-button"
            onClick={() => handleSocialLogin("microsoft")}
          >
            <img
              src={assets.Images.Microsoft}
              alt="Microsoft"
              className="social-login-icon"
            />
          </div>
          {/* <div className="social-login-button">
            <img
              src={assets.Images.Apple}
              alt="Apple"
              className="social-login-icon"
            />
          </div> */}
          <div
            className="social-login-button"
            onClick={() => handleSocialLogin("github")}
          >
            <img
              src={assets.Images.LinkedIn}
              alt="LinkedIn"
              className="social-login-icon"
            />
          </div>
        </div>
        <div className="signup-link-container">
          Don’t have an account?{" "}
          <p
            style={{ margin: "0px" }}
            onClick={() => toggleSlide("signup")}
            className="signup-link"
          >
            Sign up.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
