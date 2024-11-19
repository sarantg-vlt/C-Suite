//const clientId = "86mel6vthcai4p";
const clientId = "86zi1t4qeml4hq";
const redirectUri = "https://c-suite-alpha.vercel.app/auth-linkedin-bridge";
const state = "linkedIn-auth-state-secret";
const scope = "profile openid email";

export const handleLinkedIn = () => {
  // Define the LinkedIn authorization URL
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

  // Redirect the user to the LinkedIn authorization page
   window.location.href = authUrl;
 
};
