import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import "./TopBar.css";
import defaultProfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";

const TopBar = ({ onSearch }) => {
  const [userName, setUserName] = useState("User");
  const [userProfilePic, setUserProfilePic] = useState(defaultProfileSVG);
  const [openNotification, setOpenNotification] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = localStorage.getItem("userid");
        if (userId) {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/user/${userId}`);
          const userData = response.data.user;

          // Update the state with fetched user data
          setUserName(userData.name || "User");
          setUserProfilePic(userData.profilePic || defaultProfileSVG); // Use default if no profilePic
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserProfilePic(defaultProfileSVG);
      }
    };

    getUserData();

    // Optional: Handle localStorage updates if user data changes
    const handleStorageChange = (e) => {
      if (e.key === "userDataUpdated" && e.newValue) {
        const updatedData = JSON.parse(e.newValue);
        setUserName(updatedData.name || "User");
        setUserProfilePic(updatedData.profilePic || defaultProfileSVG);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="top-bar">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for class, task, etc."
          onChange={(e) => onSearch(e.target.value)} // Call onSearch on input change
        />
      </div>
      <div className="user-info">
        <img
          src={userProfilePic}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => {
            e.target.src = defaultProfileSVG;
          }}
        />
        <div className="user-text">
          <span className="welcome-text">Welcome back</span>
          <span className="user-name">{userName}</span>
        </div>
        <div className={`notification-icon ${openNotification ? 'notification-active' : 'notification-deactive'}`}>
          <FontAwesomeIcon icon={faBell} onClick={()=>setOpenNotification(openNotification=>!openNotification)} />
          <span className="notification-dot">1</span>
        </div>
        <div className={`notification-container ${openNotification ? 'notification-show' : 'notification-hidden'}`}>
          <p>no notification message</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
