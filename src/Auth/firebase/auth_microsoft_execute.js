
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { check, signupCheck } from "../../api/baseapi.js";

const auth = getAuth();
const provider = new OAuthProvider('microsoft.com');

export const signinMicrosoft = async (navigate, Courseid) => {
  let loc = "";
  let result = null; // Declare result outside try-catch for scope accessibility

  try {
    result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Checking if Microsoft user already exists...");
    const checkResponse = await check({ email: user.email });
    
    if (checkResponse.status === 200) {
      toast.success("User already registered. Logging in...");
      loc = login(checkResponse.data);
      return loc;
    }

  } catch (checkError) {
    if (checkError.response && checkError.response.status === 404) {
      toast.info("User not found. Registering...");

      if (result) {  
        const microsoftUserData = {
          name: result.user.displayName,
          email: result.user.email,
          socialMediaId: result.user.uid
        };

        try {
          const signupResponse = await signupCheck(microsoftUserData);
          console.log("New user signed up:", signupResponse.data);
          loc = login(signupResponse.data);
        } catch (signupError) {
          console.error("Signup error:", signupError);
          toast.error("Signup failed");
        }
      } else {
        console.error("Microsoft sign-in result not available for user data.");
      }

    } else {
      console.error("Error checking Microsoft user:", checkError);
      toast.error("Error checking user");
    }
  }

  return loc;
};

function login(data) {
  const userData = data.user ? data.user : data;

  toast.success("Login Successful!");
  localStorage.setItem("userDataUpdated", JSON.stringify(userData));
  localStorage.setItem("isloggedin", true);
  localStorage.setItem("userid", userData._id);
  localStorage.setItem("name", userData.name);
  localStorage.setItem("email", userData.email);
  localStorage.setItem("linkedin", userData.linkedin);
  localStorage.setItem("elacomplete", userData.elaComplete);

  return userData.elaComplete ? "home" : "quick-assessment";
}
