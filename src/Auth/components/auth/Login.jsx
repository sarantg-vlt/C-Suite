import React, { useEffect, useState } from "react";
import assets from "../assets/assets";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { check, loginCheck } from "../../../api/baseapi";
import googlePopup from "../../firebase/auth_google_popup";
import { signinMicrosoft } from "../../firebase/auth_microsoft_execute";
import { handleLinkedIn } from "../../firebase/auth_linkedIn_execute";
import { isStrongPassword, isValidEmail } from "../../utils/validityCheck";
import { toast } from "react-toastify";

const Login = ({ toggleSlide = () => {} }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "", username: "" });
    const [error, setError] = useState({ email: false, password: false, username: false });
    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const Courseid = params.get("courseid");

    useEffect(() => {
        if (localStorage.getItem("isloggedin") === "true") {
            if (localStorage.getItem("elacomplete") === "false") {
                navigate("../quick-assessment");
            } else {
                navigate(Courseid ?` ../home/courseDetails/${Courseid} `: "../home");
            }
        }
    }, [navigate, Courseid]);

    const isValidUsername = (username) => username && username.length >= 3;

    const handleValueChange = (type, value, valid) => {
        setForm((prev) => ({ ...prev, [type]: value }));
        setError((prev) => ({ ...prev, [type]: !valid }));
    };

    const validateInput = () => {
        const newError = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isEmailValid = emailPattern.test(form.email);

        if (!form.email && !form.username) {
            newError.email = newError.username = true;
            toast.error("Please enter a valid email or username.");
        }

        if (form.username && !isValidUsername(form.username)) {
            newError.username = true;
            toast.error("Username must be at least 3 characters.");
        }

        if (!form.password || form.password.length < 8) {
            newError.password = true;
            toast.error("Please enter a valid password.");
        }

        return newError;
    };

    const handleLogin = async () => {
        const newError = validateInput();
    
        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }
    
        try {
            const res = await check({ email: form.email || form.username });
    
            if (res.status === 200) {
                try {
                    const loginRes = await loginCheck({
                        email: form.email || form.username,
                        password: form.password,
                    });
    
                    // Store user data in local storage
                    localStorage.setItem("userDataUpdated", JSON.stringify(loginRes.data.user));
                    localStorage.setItem("isloggedin", "true");
                    localStorage.setItem("userid", loginRes.data.user._id);
                    localStorage.setItem("name", loginRes.data.user.name);
                    localStorage.setItem("email", loginRes.data.user.email);
                    localStorage.setItem("linkedin", loginRes.data.user.linkedin);
                    localStorage.setItem("elacomplete", loginRes.data.user.elaComplete);
    
                    // ✅ Show success message FIRST (on login page)
                    toast.success('Login Successfull', {
                        autoClose: 2000, // Time in milliseconds (5 seconds)
                      });
    
                    // ✅ Clear toast messages before navigating
                     setTimeout(() => {
                        // toast.dismiss(); // ✅ Clears toast messages before moving to a new page
                        
                        if (loginRes.data.user.elaComplete === false) {
                            navigate("../quick-assessment");
                        } else {
                            navigate(Courseid ? `../home/courseDetails/${Courseid}` : "../home");
                        }
                    }, 2000); // 1s delay ensures toast is visible on login page
    
                } catch (error) {
                    console.error("Invalid Password", error);
                    toast.error("Invalid Password");
                }
            } else {
                toast.error("User not found. Please check your email or username.");
            }
        } catch (error) {
            if (error.response?.status === 404) {
                console.error("User not found:", error.response.data.message);
                toast.error("User not found");
            } else {
                console.error("Server Unreachable", error);
                toast.error("Server Unreachable");
            }
        }
    };

    const handleSocialLogin = async (type) => {
        let res;
        if (type === "google") {
            res = await googlePopup(navigate, Courseid);
        } else if (type === "microsoft") {
            res = await signinMicrosoft();
        } else if (type === "github") {
            handleLinkedIn();
        }

        if (res === "home") {
            navigate(Courseid ?` ../home/courseDetails/${Courseid}` : "../home");
        } else if (res === "quick-assessment") {
            navigate("../quick-assessment");
        }
    };

    return (
        <div className="login-container">
            {/* <ToastContainer /> */}
            <div className="logo-container">
                <img src={assets.Images.CSuiteLogo} alt="logo" className="logo-img" />
            </div>
            <div className="login-details">
                <h2 className="login-title">Hello Again!</h2>
                <p className="login-subtitle">
                    Empower Your Journey: Where Professionalism Meets Progress
                </p>
                <form className="login-form">
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={form.email}
                            style={{ borderColor: error.email || error.username ? "red" : "#C7C7C7" }}
                            onChange={(e) =>
                                handleValueChange(
                                    "email",
                                    e.target.value,
                                    isValidEmail(e.target.value) || isValidUsername(e.target.value)
                                )
                            }
                            className="input"
                        />
                        <img src={assets.Images.mail_icon} alt="mail-icon" className="icon" />
                    </div>
                    <div className="input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="eg. Abcd@123"
                            value={form.password}
                            style={{ borderColor: error.password ? "red" : "#C7C7C7" }}
                            onChange={(e) =>
                                handleValueChange("password", e.target.value, isStrongPassword(e.target.value))
                            }
                            className="input"
                        />
                        <img
                            src={assets.Images.Lock_Vector}
                            alt="lock-icon"
                            className="icon"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    <div className="login-button" onClick={handleLogin}>
                        <p>Login</p>
                    </div>
                </form>
                <div className="social-login-container">
                    <div className="social-login-button" onClick={() => handleSocialLogin("google")}>
                        <img src={assets.Images.Google} alt="Google" className="social-login-icon" />
                    </div>
                    <div className="social-login-button" onClick={() => handleSocialLogin("microsoft")}>
                        <img src={assets.Images.Microsoft} alt="Microsoft" className="social-login-icon" />
                    </div>
                </div>
                <p onClick={() => toggleSlide("signup")} className="signup-link">
    Don’t have an account? Sign up.
</p>

            </div>
        </div>
    );
};

export default Login;
