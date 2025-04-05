import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import googlePopup from "../../firebase/auth_google_popup";
import { signinMicrosoft } from "../../firebase/auth_microsoft_execute";
import { handleLinkedIn } from "../../firebase/auth_linkedIn_execute";
import { check, signupCheck } from "../../../api/baseapi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  isStrongPassword,
  isValidEmail,
  isValidName,
  isValidLinkedin,
} from "../../utils/validityCheck";

const SignUp = ({ toggleSlide }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const Courseid = params.get("courseid");

  const [ispasswordConformed, setIspasswordConformed] = useState(null);
  const [errorArray, setErrorArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "", // ✅ Added confirmPassword
    name: "",
    LinkedIn: "",
  });

  const handleValueChange = (type, value, isvalid) => {
    let newArray = [...errorArray];
    setForm((prevForm) => ({ ...prevForm, [type]: value })); // ✅ Ensure confirmPassword is also stored

    if (isvalid && newArray.includes(type)) {
      newArray.splice(newArray.indexOf(type), 1);
    } else if (!isvalid && !newArray.includes(type)) {
      newArray.push(type);
    }

    setErrorArray(newArray);
  };

  const checkPasswordConform = (e) => {
    const confirmPasswordValue = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      confirmPassword: confirmPasswordValue,
    })); // ✅ Store confirmPassword

    if (confirmPasswordValue === form.password) {
      setIspasswordConformed(true);
    } else {
      setIspasswordConformed(false);
    }
  };

  const handleSignUp = async () => {
    const newErrorArray = [];

    // Check if all fields are empty and show a message
    const allFieldsEmpty = Object.values(form).every((value) => !value.trim());

    if (allFieldsEmpty) {
      toast.warn("Please fill all the required fields!", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    // Validate form fields (Ensure no empty values)
    Object.entries(form).forEach(([key, value]) => {
      if (!value || typeof value !== "string" || !value.trim()) {
        newErrorArray.push(key);
      }
    });
    // Validate Name
    if (!isValidName(form.name)) newErrorArray.push("name");

    // Validate Email
    if (!isValidEmail(form.email)) {
      newErrorArray.push("email");
      toast.error("Please enter a valid email address.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    // Validate LinkedIn
    if (!isValidLinkedin(form.LinkedIn)) {
      newErrorArray.push("LinkedIn");
      toast.error("Please enter a valid LinkedIn URL.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    // Check Password Strength
    if (!isStrongPassword(form.password)) {
      newErrorArray.push("password");
      toast.error(
        "Please enter a valid Password",
        {
          autoClose: 3000,
          theme: "dark",
        }
      );
      return;
    }

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      newErrorArray.push("confirmPassword");
      toast.error("Passwords do not match!", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    // If there are any validation errors, show a warning and stop submission
    if (newErrorArray.length > 0) {
      setErrorArray(newErrorArray);
      toast.warn("Please fill all required fields correctly!", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    const data = {
      name: form.name,
      email: form.email,
      linkedin: form.LinkedIn,
      password: form.password,
    };

    try {
      // Check if email already exists
      const checkResponse = await check({ email: form.email });

      if (checkResponse?.status === 200) {
        toast.error("Email Already Exists!", {
          autoClose: 3000,
          theme: "colored",
        });
        return;
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.error("API endpoint not found. Check the backend.");
      } else {
        toast.error("Error checking email. Try again.", {
          autoClose: 3000,
          theme: "dark",
        });
        return;
      }
    }

    try {
      // Perform signup
      const signupResponse = await signupCheck(data);
      console.log(signupResponse.data);

      toast.success("Signup Successful! Redirecting to login...");

      setTimeout(() => {
        toggleSlide("login"); // Navigates to the login page
      }, 2000);
    } catch (signupError) {
      console.error("Signup error:", signupError);
      toast.error("Signup Failed. Please try again.", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const handleSocialLogin = async (type) => {
    let res;
    if (type === "google") {
      res = await googlePopup(navigate, Courseid);
      setTimeout(() => {
        if (Courseid) navigate("../home/courseDetails/" + Courseid);
        else navigate("../home");
      }, 5000);
    }
    if (type === "github") handleLinkedIn();
    if (type === "microsoft") res = await signinMicrosoft();
  };

  return (
    <>
      {/* <ToastContainer /> */}

      <div className="signup-container">
        <div className="signup-content">
          <div className="logo-container" style={{ margin: "0px" }}>
            <img
              src={assets.Images.CSuiteLogo}
              alt="logo"
              className="logo-img"
            />
          </div>
          <h2 className="signup-title">Sign Up</h2>
          <p className="signup-subtitle">Get started with your account</p>
          <form className="signup-form">
            <div className="input-container">
              <input
                type="text"
                placeholder="Name"
                className="input"
                style={{
                  borderColor: errorArray?.includes("name") ? "red" : "#C7C7C7",
                }}
                onChange={(e) =>
                  handleValueChange(
                    "name",
                    e.target.value,
                    isValidName(e.target.value)
                  )
                }
              />
              {errorArray?.includes("name") && (
                <p className="input-error">Enter valid Name</p>
              )}
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Email"
                className="input"
                style={{
                  borderColor: errorArray?.includes("email")
                    ? "red"
                    : "#C7C7C7",
                }}
                onChange={(e) =>
                  handleValueChange(
                    "email",
                    e.target.value,
                    isValidEmail(e.target.value)
                  )
                }
              />
              {errorArray?.includes("email") && (
                <p className="input-error">Enter valid Email</p>
              )}
              <img
                src={assets.Images.mail_icon}
                alt="mail-icon"
                className="input-icon"
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="eg. https://www.linkedin.com/in/your-profile"
                className="input"
                style={{
                  borderColor: errorArray?.includes("LinkedIn")
                    ? "red"
                    : "#C7C7C7",
                }}
                onChange={(e) =>
                  handleValueChange(
                    "LinkedIn",
                    e.target.value,
                    isValidLinkedin(e.target.value)
                  )
                }
              />

              {errorArray?.includes("LinkedIn") && (
                <p className="input-error">Enter valid LinkedIn ID</p>
              )}
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="eg. Abcd@123"
                className="input"
                style={{
                  borderColor: errorArray?.includes("password")
                    ? "red"
                    : "#C7C7C7",
                }}
                onChange={(e) =>
                  handleValueChange(
                    "password",
                    e.target.value,
                    isStrongPassword(e.target.value)
                  )
                }
              />
              {errorArray?.includes("password") && (
                <p className="input-error">
                  Enter strong password with at least 8 characters
                </p>
              )}
              <img
                src={
                  showPassword
                    ? assets.Images.Eye
                    : assets.Images.Eye_Closed_Icon
                }
                alt="eye-icon"
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input"
                style={{
                  borderColor:
                    ispasswordConformed === false ? "red" : "#C7C7C7",
                }}
                onChange={(e) => checkPasswordConform(e)}
              />
              {/* {ispasswordConformed === false && (
              <p className="input-error">Password Mismatch</p>
            )} */}
              <img
                src={
                  showPassword
                    ? assets.Images.Eye
                    : assets.Images.Eye_Closed_Icon
                }
                alt="eye-icon"
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </form>
          <button
            type="button"
            className="signup-button"
            onClick={() => handleSignUp()}
          >
            Sign Up
          </button>

          <div className="signup-social-container">
            <div
              className="signup-social-button"
              onClick={() => handleSocialLogin("google")}
            >
              <img
                src={assets.Images.Google}
                alt="Google"
                className="signup-social-icon"
              />
            </div>
            <div
              className="signup-social-button"
              onClick={() => handleSocialLogin("microsoft")}
            >
              <img
                src={assets.Images.Microsoft}
                alt="Microsoft"
                className="signup-social-icon"
              />
            </div>
            <div
              className="signup-social-button"
              onClick={() => handleSocialLogin("github")}
            >
              <img
                src={assets.Images.LinkedIn}
                alt="LinkedIn"
                className="signup-social-icon"
              />
            </div>
          </div>

          <p className="signup-footer">
            Already have an account?{" "}
            <span
              onClick={() => toggleSlide("login")}
              className="signup-footer-link"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
