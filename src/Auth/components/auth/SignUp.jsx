// import React, { useState } from "react";
// import assets from "../assets/assets";
// import { auth } from "../../firebase/firebaseConfig";
// import axios from "axios";
// import { createUserWithEmailAndPassword } from "@firebase/auth";
// import {
//   isStrongPassword,
//   isValidEmail,
//   isValidName,
//   isValidLinkedin,
// } from "../../utils/validityCheck";
// import { check, signupCheck } from "../../../api/baseapi";
// import { toast } from "react-toastify";

// const SignUp = ({ toggleSlide }) => {
//   const [form, setForm] = useState({
//     email: "",
//     password: null,
//     name: "",
//     LinkedIn: "",
//   });
//   const [ispasswordConformed, setIspasswordConformed] = useState(null);
//   const [errorArray, setErrorArray] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleValueChange = (type, value, isvalid) => {
//     // console.log(isvalid);
//     let newArray = [...errorArray];
//     setForm({ ...form, [type]: value });
//     if (isvalid && newArray?.includes(type)) {
//       newArray.splice(type, 1);
//       setErrorArray(newArray);
//     }
//     if (!isvalid && !newArray?.includes(type)) {
//       newArray.push(type);
//       setErrorArray(newArray);
//     }
//   };

//   // console.log(errorArray);
//   const checkPasswordConform = (e) => {
//     if (e.target.value === form.password) {
//       setIspasswordConformed(true);
//     } else {
//       setIspasswordConformed(false);
//     }
//   };

//   const handleSignUp = async () => {
//     const newErrorArray = [...errorArray];
//     Object.entries(form).forEach(([key, value]) => {
//       if (value === null || value === "") {
//         if (!newErrorArray?.includes(key)) newErrorArray.push(key);
//       }
//     });
//     setErrorArray(newErrorArray);
//     if (newErrorArray.length < 1 && ispasswordConformed) {
//       // try {
//       //   const response = await createUserWithEmailAndPassword(
//       //     auth,
//       //     form?.email,
//       //     form?.password
//       //   );
//       //   // try {
//       //   // const response = await axios.post(
//       //   //   "https://quiz-project-d15l.onrender.com/api/signup/",
//       //   //   {
//       //   //     name: form.name,
//       //   //     email: form.email,
//       //   //     password: form.password,
//       //   //   }
//       //   // );
//       //   //   console.log(response);
//       //   //   toast.success("Signup Success");
//       //   // } catch (err) {
//       //   //   console.error(err);
//       //   //   toast.error(err.response ? err.response.data.error : "Signup Failed");
//       //   // }
//       //   console.log(response);
//       //   if (response) {
//       //     const addToServer = await axios.post(
//       //       "http://localhost:5000/user/new",
//       //       { name: form.name, email: form.email, authId: response?.user?.uid }
//       //     );
//       //     console.log(addToServer);
//       //   }
//       //   toast.success("Signup Success");
//       // } catch (err) {
//       //   console.log(err);
//       //   toast.error(err);
//       // }
//       let data = {
//         name: form?.name,
//         email: form?.email,
//         linkedin: form?.LinkedIn,
//         password: form?.password,
//       };
//       // try {
//       //   alert("98", data);
//       //   const response = await axios.get(
//       //     "https://csuite-production.up.railway.app/api/user/check",
//       //     {
//       //       params: {
//       //         email: form?.email,
//       //       },
//       //     }
//       //   );
//       //   alert("line 106", response);
//       //   if (true) {
//       //     alert("line 107 ");
//       //     try {
//       //       const response = await axios.post(
//       //         "https://csuite-production.up.railway.app/api/user/signup",
//       //         data,
//       //         {
//       //           headers: { "Content-Type": "application/json" }, // Set Content-Type header
//       //         }
//       //       );
//       //       console.log(response.data);
//       //       toast.success("Signup Successfull!");
//       //       setTimeout(() => {
//       //         toggleSlide("login");
//       //       }, 5000);
//       //       // Handle successful response (optional)
//       //     } catch (error) {
//       //       console.error(error, "line 123"); // Handle errors
//       //     }
//       //   } else {
//       //     toast.error("Email Already Exist!");
//       //   }
//       // } catch (error) {
//       //   console.error(error, "line 129"); // Handle errors
//       // }
//       const config = {
//         headers: { "Content-Type": "application/json" },
//       };

//       try {
//         // Step 1: Check if the user already exists
//         try {
//           const checkResponse = await check({
//             email: form?.email,
//           });

//           if (checkResponse.status === 200) {
//             // User already exists
//             toast.error("Email Already Exists!");
//             return; // Exit the function
//           }
//         } catch (checkError) {
//           // Handle errors during the check request
//           if (checkError.response && checkError.response.status === 404) {
//             // User not found, proceed to signup
//             try {
//               const signupResponse = await signupCheck(data, config);
//               console.log(signupResponse.data);
//               toast.success("Signup Successful!");
//               setTimeout(() => {
//                 toggleSlide("login");
//               }, 3000);
//             } catch (signupError) {
//               console.error("Signup error:", signupError);
//               toast.error("Signup Failed");
//             }
//           } else {
//             // Unexpected error during check
//             console.error("Check error:", checkError);
//             toast.error("Unexpected Error");
//           }
//         }
//       } catch (error) {
//         // Handle any other unexpected errors
//         console.error("An unexpected error occurred:", error);
//         toast.error("An unexpected error occurred");
//       }
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-content">
//         <div className="logo-container" style={{ margin: "0px" }}>
//           <img src={assets.Images.CSuiteLogo} alt="logo" className="logo-img" />
//         </div>
//         <h2 className="signup-title">Sign Up</h2>
//         <p className="signup-subtitle">Let’s get started with your account</p>
//         <form className="signup-form">
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Name"
//               className="input"
//               style={{
//                 borderColor: errorArray?.includes("name") ? "red" : "#C7C7C7",
//               }}
//               onChange={(e) =>
//                 handleValueChange(
//                   "name",
//                   e.target.value,
//                   isValidName(e.target.value)
//                 )
//               }
//             />
//             {errorArray?.includes("name") && (
//               <p className="input-error">Enter valid Name</p>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Email"
//               className="input"
//               style={{
//                 borderColor: errorArray?.includes("email") ? "red" : "#C7C7C7",
//               }}
//               onChange={(e) =>
//                 handleValueChange(
//                   "email",
//                   e.target.value,
//                   isValidEmail(e.target.value)
//                 )
//               }
//             />
//             {errorArray?.includes("email") && (
//               <p className="input-error">Enter valid Email</p>
//             )}
//             <img
//               src={assets.Images.mail_icon}
//               alt="mail-icon"
//               className="input-icon"
//             />
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="LinkedIn"
//               className="input"
//               style={{
//                 borderColor: errorArray?.includes("LinkedIn")
//                   ? "red"
//                   : "#C7C7C7",
//               }}
//               onChange={(e) =>
//                 handleValueChange(
//                   "LinkedIn",
//                   e.target.value,
//                   isValidLinkedin(e.target.value)
//                 )
//               }
//             />
//             {errorArray?.includes("LinkedIn") && (
//               <p className="input-error">Enter valid LinkedIn ID</p>
//             )}
//             {/* <img
//               src={assets.Images.mail_icon}
//               alt="mail-icon"
//               className="input-icon"
//             /> */}
//           </div>
//           <div className="input-container">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="input"
//               style={{
//                 borderColor: errorArray?.includes("password")
//                   ? "red"
//                   : "#C7C7C7",
//               }}
//               onChange={(e) =>
//                 handleValueChange(
//                   "password",
//                   e.target.value,
//                   isStrongPassword(e.target.value)
//                 )
//               }
//             />
//             {errorArray?.includes("password") && (
//               <p className="input-error">
//                 Enter strong password with at least 8 characters
//               </p>
//             )}
//             <img
//               src={assets.Images.Lock_Vector}
//               alt="lock-icon"
//               className="input-icon"
//               onClick={() => setShowPassword(!showPassword)}
//             />
//           </div>
//           <div className="input-container">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               className="input"
//               style={{
//                 borderColor: ispasswordConformed === false ? "red" : "#C7C7C7",
//               }}
//               onChange={(e) => checkPasswordConform(e)}
//             />
//             {ispasswordConformed === false && (
//               <p className="input-error">Password Mismatch</p>
//             )}
//             <img
//               src={assets.Images.Lock_Vector}
//               alt="lock-icon"
//               className="input-icon"
//               onClick={() => setShowPassword(!showPassword)}
//             />
//           </div>
//         </form>
//         <div className="signup-button" onClick={() => handleSignUp()}>
//           <p style={{ margin: "0px" }}>Sign Up</p>
//         </div>
//         <div className="login-link">
//           Already have an account?{" "}
//           <p onClick={() => toggleSlide("login")} className="login-link-action">
//             Log in
//           </p>
//         </div>
//         {/* <div className="divider-container" style={{ marginTop: 0 }}>
//           <div className="divider"></div>
//           <p className="divider-text">or</p>
//           <div className="divider"></div>
//         </div>
//         <div className="social-buttons">
//           <div className="social-button">
//             <img
//               src={assets.Images.Google}
//               alt="Google"
//               className="social-icon"
//             />
//           </div>
//           <div className="social-button">
//             <img
//               src={assets.Images.Microsoft}
//               alt="Microsoft"
//               className="social-icon"
//             />
//           </div>
//           <div className="social-button">
//             <img
//               src={assets.Images.Apple}
//               alt="Apple"
//               className="social-icon"
//             />
//           </div>
//           <div className="social-button">
//             <img
//               src={assets.Images.LinkedIn}
//               alt="LinkedIn"
//               className="social-icon"
//             />
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import  googlePopup  from "../../firebase/auth_google_popup";
import { signinMicrosoft } from "../../firebase/auth_microsoft_execute";
import { handleLinkedIn } from "../../firebase/auth_linkedIn_execute";
import { check, signupCheck } from "../../../api/baseapi";
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

  const [form, setForm] = useState({
    email: "",
    password: null,
    name: "",
    LinkedIn: "",
  });
  const [ispasswordConformed, setIspasswordConformed] = useState(null);
  const [errorArray, setErrorArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleValueChange = (type, value, isvalid) => {
    let newArray = [...errorArray];
    setForm({ ...form, [type]: value });
    if (isvalid && newArray?.includes(type)) {
      newArray.splice(type, 1);
      setErrorArray(newArray);
    }
    if (!isvalid && !newArray?.includes(type)) {
      newArray.push(type);
      setErrorArray(newArray);
    }
  };

  const checkPasswordConform = (e) => {
    if (e.target.value === form.password) {
      setIspasswordConformed(true);
    } else {
      setIspasswordConformed(false);
    }
  };

  const handleSignUp = async () => {
    const newErrorArray = [...errorArray];
  
    // Validate form fields
    Object.entries(form).forEach(([key, value]) => {
      if (value === null || value === "") {
        if (!newErrorArray.includes(key)) newErrorArray.push(key);
      }
    });
  
    setErrorArray(newErrorArray);
  
    if (newErrorArray.length > 0) {
      toast.warn("Please fill all required fields!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    if (!ispasswordConformed) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    let data = {
      name: form?.name,
      email: form?.email,
      linkedin: form?.LinkedIn,
      password: form?.password,
    };
  
    const config = {
      headers: { "Content-Type": "application/json" },
    };
  
    try {
      // Check if email already exists
      try {
        const checkResponse = await check({ email: form?.email });
  
        if (checkResponse.status === 200) {
          toast.error("Email Already Exists!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
          return;
        }
      } catch (checkError) {
        if (checkError.response && checkError.response.status === 404) {
          try {
            // Signup process
            const signupResponse = await signupCheck(data, config);
            console.log(signupResponse.data);
  
            toast.success("Signup Successful!", {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
            });
  
            setTimeout(() => {
              toggleSlide("login");
            }, 2000);
          } catch (signupError) {
            console.error("Signup error:", signupError);
            toast.error("Signup Failed. Please try again.", {
              position: "top-right",
              autoClose: 3000,
              theme: "dark",
            });
          }
        } else {
          console.error("Check error:", checkError);
          toast.error("Unexpected Error during signup!", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-right",
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
    <div className="signup-container">
      <div className="signup-content">
        <div className="logo-container" style={{ margin: "0px" }}>
          <img src={assets.Images.CSuiteLogo} alt="logo" className="logo-img" />
        </div>
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-subtitle">Let’s get started with your account</p>
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
                handleValueChange("name", e.target.value, isValidName(e.target.value))
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
                borderColor: errorArray?.includes("email") ? "red" : "#C7C7C7",
              }}
              onChange={(e) =>
                handleValueChange("email", e.target.value, isValidEmail(e.target.value))
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
              placeholder="LinkedIn"
              className="input"
              style={{
                borderColor: errorArray?.includes("LinkedIn")
                  ? "red"
                  : "#C7C7C7",
              }}
              onChange={(e) =>
                handleValueChange("LinkedIn", e.target.value, isValidLinkedin(e.target.value))
              }
            />
            {errorArray?.includes("LinkedIn") && (
              <p className="input-error">Enter valid LinkedIn ID</p>
            )}
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              style={{
                borderColor: errorArray?.includes("password")
                  ? "red"
                  : "#C7C7C7",
              }}
              onChange={(e) =>
                handleValueChange("password", e.target.value, isStrongPassword(e.target.value))
              }
            />
            {errorArray?.includes("password") && (
              <p className="input-error">
                Enter strong password with at least 8 characters
              </p>
            )}
            <img
              src={showPassword ? assets.Images.Eye : assets.Images.Eye_Closed_Icon}
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
                borderColor: ispasswordConformed === false ? "red" : "#C7C7C7",
              }}
              onChange={(e) => checkPasswordConform(e)}
            />
            {ispasswordConformed === false && (
              <p className="input-error">Password Mismatch</p>
            )}
            <img
              src={showPassword ? assets.Images.Eye : assets.Images.Eye_Closed_Icon}
              alt="eye-icon"
              className="input-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </form>
        <button type="button" className="signup-button" onClick={() => handleSignUp()}>
          Sign Up
        </button>

<div className="signup-social-container">
  <div className="signup-social-button" onClick={() => handleSocialLogin("google")}>
    <img src={assets.Images.Google} alt="Google" className="signup-social-icon" />
  </div>
  <div className="signup-social-button" onClick={() => handleSocialLogin("microsoft")}>
    <img src={assets.Images.Microsoft} alt="Microsoft" className="signup-social-icon" />
  </div>
  <div className="signup-social-button" onClick={() => handleSocialLogin("github")}>
    <img src={assets.Images.LinkedIn} alt="LinkedIn" className="signup-social-icon" />
  </div>
</div>

        <p className="signup-footer">
          Already have an account?{" "}
          <span onClick={() => toggleSlide("login")} className="signup-footer-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

