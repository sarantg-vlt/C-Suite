// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
// import "./TopBar.css";
// import defaultProfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";

// const TopBar = ({ onSearch }) => {
//   const [userName, setUserName] = useState("User");
//   const [userProfilePic, setUserProfilePic] = useState(defaultProfileSVG);
//   const [openNotification, setOpenNotification] = useState(false)

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const userId = localStorage.getItem("userid");
//         if (userId) {
//           const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/user/${userId}`);
//           const userData = response.data.user;

//           // Update the state with fetched user data
//           setUserName(userData.name || "User");
//           setUserProfilePic(userData.profilePic || defaultProfileSVG); // Use default if no profilePic
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setUserProfilePic(defaultProfileSVG);
//       }
//     };

//     getUserData();

//     // Optional: Handle localStorage updates if user data changes
//     const handleStorageChange = (e) => {
//       if (e.key === "userDataUpdated" && e.newValue) {
//         const updatedData = JSON.parse(e.newValue);
//         setUserName(updatedData.name || "User");
//         setUserProfilePic(updatedData.profilePic || defaultProfileSVG);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <div className="top-bar">
//       <div className="search-container">
//         <FontAwesomeIcon icon={faSearch} className="search-icon" />
//         <input
//           type="text"
//           placeholder="Search for class, task, etc."
//           onChange={(e) => onSearch(e.target.value)} // Call onSearch on input change
//         />
//       </div>
//       <div className="user-info">
//         <img
//           src={userProfilePic}
//           alt="User Avatar"
//           className="user-avatar"
//           onError={(e) => {
//             e.target.src = defaultProfileSVG;
//           }}
//         />
//         <div className="user-text">
//           <span className="welcome-text">Welcome back</span>
//           <span className="user-name">{userName}</span>
//         </div>
//         <div className={`notification-icon ${openNotification ? 'notification-active' : 'notification-deactive'}`}>
//           <FontAwesomeIcon icon={faBell} onClick={()=>setOpenNotification(openNotification=>!openNotification)} />
//           <span className="notification-dot">1</span>
//         </div>
//         <div className={`notification-container ${openNotification ? 'notification-show' : 'notification-hidden'}`}>
//           <p>no notification message</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopBar;




// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
// import "./TopBar.css";
// import defaultProfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";
// const apiBaeApi = process.env.REACT_APP_API_BASE_URL;

// const TopBar = ({ onSearch }) => {
//   const [userName, setUserName] = useState("User");
//   const [userProfilePic, setUserProfilePic] = useState(defaultProfileSVG);
//   const [openNotification, setOpenNotification] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const notificationRef = useRef(null);

//   // Fetch User Data
//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const userId = localStorage.getItem("userid");
//         if (userId) {
//           const response = await axios.get(
//             `${process.env.REACT_APP_API_BASE_URL}/user/user/${userId}`
//           );
//           const userData = response.data.user;

//           setUserName(userData.name || "User");
//           setUserProfilePic(userData.profilePic || defaultProfileSVG);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setUserProfilePic(defaultProfileSVG);
//       }
//     };

//     getUserData();

//     // Update profile if localStorage changes
//     const handleStorageChange = (e) => {
//       if (e.key === "userDataUpdated" && e.newValue) {
//         const updatedData = JSON.parse(e.newValue);
//         setUserName(updatedData.name || "User");
//         setUserProfilePic(updatedData.profilePic || defaultProfileSVG);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   // Fetch Notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const response = await axios.get(
//           `${apiBaeApi}/admin-event`
//         );
//         setNotifications(response.data || []);
//       } catch (err) {
//         setError("Error loading notifications");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   // Hide Notifications When Clicking Outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setOpenNotification(false);
//       }
//     };

//     if (openNotification) {
//       document.addEventListener("click", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [openNotification]);

//   return (
//     <div className="top-bar">
//       <div className="search-container">
//         <FontAwesomeIcon icon={faSearch} className="search-icon" />
//         <input
//           type="text"
//           placeholder="Search for class, task, etc."
//           onChange={(e) => onSearch(e.target.value)}
//         />
//       </div>
//       <div className="user-info">
//         <img
//           src={userProfilePic}
//           alt="User Avatar"
//           className="user-avatar"
//           onError={(e) => {
//             e.target.src = defaultProfileSVG;
//           }}
//         />
//         <div className="user-text">
//           <span className="welcome-text">Welcome back</span>
//           <span className="user-name">{userName}</span>
//         </div>

//         {/* Notification Bell Icon */}
//         <div
//           className={`notification-icon ${
//             openNotification ? "notification-active" : "notification-deactive"
//           }`}
//           onClick={() => setOpenNotification((prev) => !prev)}
//           ref={notificationRef}
//         >
//           <FontAwesomeIcon icon={faBell} />
//           {notifications.length > 0 && (
//             <span className="notification-dot">{notifications.length}</span>
//           )}
//         </div>

//         {/* Notification Dropdown */}
//         {openNotification && (
//           <div
//             className={`notification-container ${
//               openNotification ? "notification-show" : "notification-hidden"
//             }`}
//           >
//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p className="text-red-500">{error}</p>
//             ) : notifications.length > 0 ? (
//               <ul>
//                 {notifications.map((notif, index) => (
//                   <li key={index} className="p-2 border-b last:border-none">
//                     {notif.message}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No notifications</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopBar;




import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import "./TopBar.css";
import defaultProfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";
const apiBaeApi = process.env.REACT_APP_API_BASE_URL;



const TopBar = ({ onSearch }) => {
  const [userName, setUserName] = useState("User");
  const [userProfilePic, setUserProfilePic] = useState(defaultProfileSVG);
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const notificationRef = useRef(null);

  // Fetch User Data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = localStorage.getItem("userid");
        if (userId) {
          const response = await axios.get(`${apiBaeApi}/user/user/${userId}`);
          const userData = response.data.user;

          setUserName(userData.name || "User");
          setUserProfilePic(userData.profilePic || defaultProfileSVG);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserProfilePic(defaultProfileSVG);
      }
    };

    getUserData();

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

  // Fetch Notifications
  const fetchNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${apiBaeApi}/admin-event`);
      setNotifications(response.data || []);
    } catch (err) {
      setError("Error loading notifications");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch notifications every 5 seconds (for real-time updates)
  useEffect(() => {
    fetchNotifications(); // Initial fetch
    const interval = setInterval(fetchNotifications, 5000); // Fetch every 5 sec
    return () => clearInterval(interval);
  }, []);

  // Fetch notifications when opening the notification panel
  const toggleNotifications = () => {
    if (!openNotification) {
      fetchNotifications(); // Fetch latest when opening
    }
    setOpenNotification((prev) => !prev);
  };

  // Hide notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpenNotification(false);
      }
    };

    if (openNotification) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
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

        {/* Notification Bell Icon */}
        <div
          className={`notification-icon ${
            openNotification ? "notification-active" : "notification-deactive"
          }`}
          onClick={toggleNotifications}
          ref={notificationRef}
        >
          <FontAwesomeIcon icon={faBell} />
          {notifications.length > 0 && (
            <span className="notification-dot">{notifications.length}</span>
          )}
        </div>

        {/* Notification Dropdown */}
        {openNotification && (
          <div
            className={`notification-container ${
              openNotification ? "notification-show" : "notification-hidden"
            }`}
          >
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : notifications.length > 0 ? (
              <ul>
                {notifications.map((notif, index) => (
                  <li key={index} className="p-2 border-b last:border-none">
                    {notif.message}
                  </li>
                ))}
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

export default TopBar;
