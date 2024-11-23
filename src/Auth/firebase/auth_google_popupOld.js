import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const auth = getAuth();
const provider = new GoogleAuthProvider();
const api = process.env.REACT_APP_API_BASE_URL;

export const googlePopup = async () => {
  var loc = "";
  const res = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log({ user, token });
      loc = adduser(user.displayName, user.email);
      return { user, token };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // console.log({ errorCode, errorMessage, email, credential });
      console.log({ errorCode, errorMessage, credential });
      return { errorCode, errorMessage, credential };
    });
  return loc;
};

async function adduser(name, email) {
  try {
    const response = await axios.get(
      api,
      {
        params: {
          email: email,
        },
      }
    );
    if (response.data == "null") {
      let data = { name: name, email: email, linkedin: null, password: null };
      try {
        const response = await axios.post(
          "https://c-suite-xpmf.onrender.com/api/user/signup",
          data,
          {
            headers: { "Content-Type": "application/json" }, // Set Content-Type header
          }
        );
        console.log(response.data);
        return login(response.data);
        // Handle successful response (optional)
      } catch (error) {
        console.error(error); // Handle errors
      }
    } else {
      return login(response.data);
    }
  } catch (error) {
    console.error(error); // Handle errors
  }
}

function login(data) {
  var location = "";
  toast.success("Login Successfull!");
  localStorage.setItem("isloggedin", true);
  localStorage.setItem("userid", JSON.parse(data)._id);
  localStorage.setItem("name", JSON.parse(data).name);
  localStorage.setItem("email", JSON.parse(data).email);
  localStorage.setItem("linkedin", JSON.parse(data).linkedin);
  localStorage.setItem("elacomplete", JSON.parse(data).elacomplete);
  if (JSON.parse(data).elacomplete === false) {
    location = "quick-assessment";
  } else {
    location = "home";
  }
  return location;
}
