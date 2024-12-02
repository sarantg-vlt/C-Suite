// import axios from "axios";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { toast } from "react-toastify";
// import { check, signupCheck } from "../../api/baseapi.js"; // Adjust the import path as needed
// import { useLocation, useNavigate } from "react-router-dom";

// const auth = getAuth();
// const provider = new GoogleAuthProvider();

// export const googlePopup = async (navigate, Courseid) => {
//   let loc = "";

//   await signInWithPopup(auth, provider)
//     .then(async (result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       const user = result.user;
//       console.log({ user, token });

//       // Check if the user already exists
//       try {
//         console.log('Check if the user already exists')
//         const checkResponse = await check({ email: user.email });
//         console.log("checkResponse",checkResponse)

//         if (checkResponse.status === 200) {
//           toast.success("User already registered. Logging in...");
//           loc = login(checkResponse.data);
//           return;
//         }
//         //  else {
//         //   toast.info("User not found. Registering...");
//         //   let data = {
//         //     name: user.displayName,
//         //     email: user.email,
//         //     linkedin: null,
//         //     password: null,
//         //   };
//         //   const config = {
//         //     headers: { "Content-Type": "application/json" },
//         //   };
//         //   try {
//         //     const signupResponse = await signupCheck(data, config);
//         //     console.log(signupResponse.data);
//         //     loc = login(signupResponse.data);
//         //   } catch (signupError) {
//         //     console.error("Signup error:", signupError);
//         //     toast.error("Signup failed");
//         //   }
//         // }
//       } catch (checkError) {
//         if (checkError.response && checkError.response.status === 404) {
//           toast.info("User not found. Registering...");
//           let data = {
//             name: user.displayName,
//             email: user.email,
//             linkedin: null,
//             password: null,
//           };
//           const config = {
//             headers: { "Content-Type": "application/json" },
//           };
//           try {
//             const signupResponse = await signupCheck(data, config);
//             console.log(signupResponse.data);
//             loc = login(signupResponse.data);
//           } catch (signupError) {
//             console.error("Signup error:", signupError);
//             toast.error("Signup failed");
//           }
//         } else {
//           console.error("Check error:", checkError);
//           toast.error("Error checking user");
//         }
//       }

//       // if (loc === "home") {
//       //   setTimeout(() => {
//       //     if (Courseid) {
//       //       navigate("../home/courseDetails/" + Courseid);
//       //     } else {
//       //       navigate("../home");
//       //     }
//       //   }, 5000);
//       // } else if (loc === "quick-assessment") {
//       //   setTimeout(() => {
//       //     navigate("../quick-assessment");
//       //   }, 5000);
//       // }

//       return loc;
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       console.log({ errorCode, errorMessage, credential });
//       return { errorCode, errorMessage, credential };
//     });

//   return loc;
// };

// function login(data) {
//   // Assuming data is already an object
//   const userData = data.user ? data.user : data;

//   toast.success("Login Successful!");
//   localStorage.setItem("userDataUpdated", JSON.stringify(data));
//   localStorage.setItem("isloggedin", true);
//   localStorage.setItem("userid", data._id);
//   localStorage.setItem("name", data.name);
//   localStorage.setItem("email", data.email);
//   localStorage.setItem("linkedin", data.linkedin);
//   localStorage.setItem("elacomplete", data.elaComplete);

//   return userData.elaComplete ? "home" : "quick-assessment";
// }
//


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { check, signupCheck } from "../../api/baseapi.js"; // Adjust the import path as needed

const auth = getAuth();
const provider = new GoogleAuthProvider();

// Force account selection
provider.setCustomParameters({
  prompt: "select_account", // Ensures the Google account chooser is always shown
});

const googlePopup = async (navigate, Courseid) => {
  try {
    // Trigger Google sign-in popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if email is verified
    if (!user.emailVerified) {
      toast.error("Please verify your email address before logging in.");
      await user.sendEmailVerification();
      toast.info("Verification email sent. Please check your inbox.");
      return; // Stop further execution
    }

    // Check if the user is registered or needs to be registered
    const loc = await handleUserCheck(user);

    // Navigate to the appropriate location based on user status
    handleNavigation(navigate, loc, Courseid);
  } catch (error) {
    console.error("Google login error:", error);
    toast.error("Google login failed. Please try again.");
  }
};

// Helper to check user registration
const handleUserCheck = async (user) => {
  try {
    const checkResponse = await check({ email: user.email });
    if (checkResponse.status === 200) {
      toast.success("User already registered. Logging in...");
      return login(checkResponse.data);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.info("User not found. Registering...");
      return await handleUserRegistration(user);
    } else {
      console.error("Error during user check:", error);
      toast.error("Error verifying user. Please try again later.");
      throw error;
    }
  }
};

// Helper to register a new user
const handleUserRegistration = async (user) => {
  const data = {
    name: user.displayName,
    email: user.email,
    linkedin: null,
    password: null,
  };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const signupResponse = await signupCheck(data, config);
    toast.success("Registration successful. Logging in...");
    return login(signupResponse.data);
  } catch (error) {
    console.error("Signup error:", error);
    toast.error("Signup failed. Please try again.");
    throw error;
  }
};

// Helper to log in the user
const login = (data) => {
  toast.success("Login successful!");
  localStorage.setItem("userDataUpdated", JSON.stringify(data));
  localStorage.setItem("isloggedin", true);
  localStorage.setItem("userid", data._id);
  localStorage.setItem("name", data.name);
  localStorage.setItem("email", data.email);
  localStorage.setItem("linkedin", data.linkedin);
  localStorage.setItem("elacomplete", data.elaComplete);

  return data.elaComplete ? "home" : "quick-assessment";
};

// Helper to navigate based on user status
const handleNavigation = (navigate, loc, Courseid) => {
  if (loc === "home") {
    navigate(Courseid ? `../home/courseDetails/${Courseid}` : "../home");
  } else if (loc === "quick-assessment") {
    navigate("../quick-assessment");
  }
};

export default googlePopup;
