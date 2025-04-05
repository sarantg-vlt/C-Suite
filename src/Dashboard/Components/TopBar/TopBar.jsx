import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import "./TopBar.css";
import defaultProfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";

const apiBaseApi = process.env.REACT_APP_API_BASE_URL;

const TopBar = ({ onSearch }) => {
  const [userName, setUserName] = useState("User");
  const [userProfilePic, setUserProfilePic] = useState(defaultProfileSVG);
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [hiddenNotifications, setHiddenNotifications] = useState([]);
  const [readButtons, setReadButtons] = useState({});
  const notificationRef = useRef(null);
  const NOTIFICATION_LIMIT = 3;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = localStorage.getItem("userid");
        if (userId) {
          const response = await axios.get(`${apiBaseApi}/user/user/${userId}`);
          const userData = response.data.user;
  
          setUserName(userData.name || "User");
  
          const base64Pic = userData.profilePic;
          const imageSrc =
            base64Pic && base64Pic.trim() !== ""
              ? `data:image/jpeg;base64,${base64Pic}`
              : defaultProfileSVG;
  
          setUserProfilePic(imageSrc);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserProfilePic(defaultProfileSVG);
      }
    };
  
    getUserData();
  }, []);
  

  const fetchNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${apiBaseApi}/notification`);
      const fetchedNotifications = Array.isArray(response.data) ? response.data : [];
      setNotifications(fetchedNotifications);

      const readNotifications = fetchedNotifications
        .filter((notif) => notif.readBy.includes(localStorage.getItem("userid")))
        .map((notif) => notif._id);

      setHiddenNotifications(readNotifications);
    } catch (err) {
      setError("Error loading notifications");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        console.error("User ID not found");
        return;
      }

      setReadButtons((prev) => ({ ...prev, [notificationId]: true }));

      await axios.put(`${apiBaseApi}/notification/${userId}/${notificationId}`);

      setTimeout(() => {
        setHiddenNotifications((prev) => [...prev, notificationId]);
      }, 1200);
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const toggleNotifications = (event) => {
    event.stopPropagation(); // Prevent immediate closing
    setOpenNotification((prev) => !prev);
  };

  // Close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !event.target.closest(".notification-icon") // Allow clicking bell icon without closing immediately
      ) {
        setOpenNotification(false);
      }
    };

    if (openNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNotification]);

  return (
    <div className="top-bar">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for class, task, etc."
          onChange={(e) => onSearch(e.target.value)}
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

        <div className="notification-icon" onClick={toggleNotifications}>
          <FontAwesomeIcon icon={faBell} />
          {notifications.filter((n) => !n.readBy.includes(localStorage.getItem("userid"))).length > 0 && (
            <span className="notification-dot">
              {notifications.filter((n) => !n.readBy.includes(localStorage.getItem("userid"))).length}
            </span>
          )}
        </div>

        {openNotification && (
          <div className="notification-container" ref={notificationRef}>
            {error ? (
              <p className="error-text">{error}</p>
            ) : notifications.length > 0 ? (
              <ul>
                {(showAll ? notifications : notifications.slice(0, NOTIFICATION_LIMIT)).map((notif) => {
                  const isRead = notif.readBy.includes(localStorage.getItem("userid"));
                  return (
                    <li
                      key={notif._id}
                      className={`notification-item ${hiddenNotifications.includes(notif._id) ? "d-none" : ""}`}
                    >
                      <div className="d-f">
                        <div className="d-flex">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="#000" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5"/>
                          </svg>
                          <div>
                            <h6>{notif.title}</h6>
                            <span>{notif.message}</span>
                          </div>
                        </div>
                        {!isRead && (
                          <button
                            className={`mark-as-read-btn ${readButtons[notif._id] ? "read" : ""}`}
                            onClick={() => markAsRead(notif._id)}
                          >
                            Mark As Read
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}

                {!showAll && notifications.length > NOTIFICATION_LIMIT && (
                  <div className="text-center">
                    <button className="read-more-btn" onClick={() => setShowAll(true)}>
                      Read More
                    </button>
                  </div>
                )}

                {showAll && (
                  <div className="text-center">
                    <button className="read-more-btn" onClick={() => setShowAll(false)}>
                      Hide
                    </button>
                  </div>
                )}
              </ul>
            ) : (
              <p>No notifications</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
