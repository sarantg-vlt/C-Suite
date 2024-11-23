// import axios from "axios";
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const LinkedInAuth = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     const params = new URLSearchParams(location.search);
//     const Code = params.get("code");
//     console.log(Code);
//     if (Code) {
//       const res = await axios.post("${apiBaseUrl}/user", {
//         methord: "linkedin",
//         Code,
//       });
//       if (res) {
//         toast.success("Authentication Successfull ✅");
//         navigate.push("/");
//       }
//     }
//   };
//   fetchData();
//   return (
//     <div
//       className="screen-container"
//       style={{ display: "flex", flexDirection: "column" }}
//     >
//       <h3>Verifiaction completed 👍</h3>
//       <h1>Creating Account 🚀</h1>
//     </div>
//   );
// };

// export default LinkedInAuth;


import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LinkedInAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const api = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        if (code) {
          const res = await axios.post(
            api,
            {
              method: "linkedin",
              code, // Fixed case
            }
          );

          if (res?.status === 200) {
            toast.success("Authentication Successful ✅");
            navigate("/home");
          } else {
            throw new Error("Unexpected response");
          }
        } else {
          toast.error("Authorization code is missing");
        }
      } catch (error) {
        console.error(error);
        toast.error("Authentication failed ❌");
      }
    };

    fetchData();
  }, [location, navigate]);

  return (
    <div
      className="screen-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}
    >
      <h3>Verification completed 👍</h3>
      <h1>Creating Account 🚀</h1>
    </div>
  );
};

export default LinkedInAuth;
