import React, { useState } from "react";
import assets from "../assets/assets";
import { auth } from "../../firebase/firebaseConfig";
import { sendPasswordResetEmail } from "@firebase/auth";
import { isValidEmail } from "../../utils/validityCheck";
import { toast } from "react-toastify";
// import nodemailer from 'nodemailer';

const ForgotPassword = ({ toggleSlide, updateEmail }) => {
  const [userEmail, setUserEmail] = useState("");

  // const sendEmail = async () => {
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: 'deivasigamanivaradharaj@gmail.com',
  //       pass: 'Varadharaj@1',
  //     },
  //   });
  //   const mailOptions = {
  //     from: 'deivasigamanivaradharaj@gmail.com',
  //     to: 'deivagenius@gmail.com',
  //     subject: 'Hello from  ReactJS',
  //     text: 'This is a test  email sent using SMTP and ReactJS',
  //   };
  //   try {
  //     await transporter. sendMail(mailOptions);
  //     console.log(' Email sent successfully');
  //   } catch (error) {
  //     console.error('Error sending  email:', error);
  //   }
  // };

  const handleRequestOtp = async () => {
    if (isValidEmail(userEmail)) {
      try {
        const response = await sendPasswordResetEmail(auth, userEmail);
        console.log(response);
        updateEmail(userEmail);
        toggleSlide("email-response");
      } catch (error) {
        console.log(error);
      }
      // sendEmail
    } else {
      toast.error("Enter valid Email");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="logo-container">
          <img src={assets.Images.CSuiteLogo} alt="logo" className="logo-img" />
        </div>
        <div className="forgot-password-details">
          <h1 className="forgot-password-title">Forgot Password ?</h1>
          <img
            src={assets.Images.Lock}
            alt="forgot-password"
            className="lock-img"
          />
          <h2 className="forgot-password-subtitle">
            Don't worry, it happens to the best of us <br /> Type your email to
            reset your password
          </h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter your email"
              className="email-input"
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <img
              src={assets.Images.mail_icon}
              alt="mail-icon"
              className="mail-icon"
            />
          </div>
          <div className="send-button" onClick={() => handleRequestOtp()}>
            <p>Sent</p>
            <img
              src={assets.Images.mail_icon}
              alt="mail-icon"
              className="mail-icon"
            />
          </div>
        </div>
      </div>
      <div className="remember-password-container">
        <h2 className="remember-password-text">
          Remember Password?{" "}
          <p  onClick={() => toggleSlide("login")} className="login-link">
            Log in
          </p>
        </h2>
      </div>
    </div>
  );
};

export default ForgotPassword;
