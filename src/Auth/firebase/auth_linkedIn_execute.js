const clientId = "86aue2n06v0823";
const redirectUri = "https://csuite-auth.netlify.app/auth-linkedin-bridge";
const state = "linkedIn-auth-state-secret";
const scope = "profile openid email";

export const handleLinkedIn = () => {
  // Define the LinkedIn authorization URL
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

  // Redirect the user to the LinkedIn authorization page
  window.location.href = authUrl;
};
