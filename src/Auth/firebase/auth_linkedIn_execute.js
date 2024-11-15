//const clientId = "86aue2n06v0823";
//const redirectUri = "https://csuite-auth.netlify.app/auth-linkedin-bridge";
//const state = "linkedIn-auth-state-secret";
//const scope = "profile openid email";

//export const handleLinkedIn = () => {
//const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
//window.location.href = authUrl;
//};

import axios from 'axios';
import { toast } from 'react-toastify';

const CLIENT_ID = '86mel6vthcai4p';
const REDIRECT_URI = 'https://c-suit.vercel.app/linkedin/callback';

export const handleLinkedIn = () => {
const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
window.location.href = authUrl;
};
export const signinLinkedIn = async () => {
  const state = 'someRandomStringToPreventCSRF'; 
  
  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=r_liteprofile%20r_emailaddress`;
  window.open(linkedInAuthUrl, '_self');

};

export async function handleLinkedInCallback(authCode) {
  try {
    const tokenResponse = await axios.post("https://www.linkedin.com/oauth/v2/accessToken", null, {
      params: {
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: "WPL_AP1.BWoeA8uc3hxDA5nI.TY69Gg==",
      },
    });

    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const user = {
      name: profileResponse.data.localizedFirstName + ' ' + profileResponse.data.localizedLastName,
      email: emailResponse.data.elements[0]["handle~"].emailAddress,
      socialMediaId: profileResponse.data.id,
    };

    await saveLinkedInUser(user);

  } catch (error) {
    console.error("LinkedIn login failed:", error);
    toast.error("LinkedIn login failed.");
  }
}

async function saveLinkedInUser(user) {
  try {
    const response = await axios.post("https://csuite-ui0f.onrender.com/api/user/checks", user);
    if (response.data.exists) {
      console.log("User signed in:", response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } else {
      console.log("New user signed up:", response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
  } catch (error) {
    console.error("Error saving LinkedIn user:", error);
    toast.error("Error saving LinkedIn user.");
  }
}
