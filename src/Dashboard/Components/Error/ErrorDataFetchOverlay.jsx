import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorDataFetchOverlay.css";

const ErrorDataFetchOverlay = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/home");
  };

  const handleRedirectProfile = () => {
    navigate("/home/profile");
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error-overlay">
      <div className="error-message">
        Unable to fetch data from the seerver. Kindly contact the admin.
      </div>
      <div className="button-group">
        <button className="error-button" onClick={handleRedirect}>
          Go to Home
        </button>
        <button className="error-button" onClick={handleRedirectProfile}>
          Go to Profile
        </button>
        <button className="reload-button" onClick={handleReload}>
          Reload
        </button>
      </div>
    </div>
  );
};

export default ErrorDataFetchOverlay;
