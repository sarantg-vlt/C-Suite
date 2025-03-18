// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import logo from "../Assets/logo.png";

const LeftBar = () => {
  return (
    <div className="sidebar1">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="menu">
        <Link to="../admin" className="menu-item">
          {/* <FontAwesomeIcon icon="fa-solid fa-fan" className="icon"/> */}
          <span>Dashboard</span>
        </Link>
        {/* <Link to="../admin" className="menu-item">
          <span>All Courses</span>
        </Link> */}
        <Link to="../admin/users" className="menu-item">
          {/* <FontAwesomeIcon icon={"faSignOutAlt"} className="icon" /> */}
          <span>Users</span>
        </Link>
        <Link to="../admin/events" className="menu-item">
          {/* <FontAwesomeIcon icon={"faSignOutAlt"} className="icon" /> */}
          <span>Events</span>
        </Link>
        <Link to="../admin/purchases" className="menu-item">
          {/* <FontAwesomeIcon icon={"faSignOutAlt"} className="icon" /> */}
          <span>Purchases</span>
        </Link>
        <Link to="../admin/Review" className="menu-item">
          {/* <FontAwesomeIcon icon={"faSignOutAlt"} className="icon" /> */}
          <span>Reviews</span>
        </Link>
        <Link to="../admin/ela" className="menu-item">
          {/* <FontAwesomeIcon icon={"faSignOutAlt"} className="icon" /> */}
          <span>ElA</span>
        </Link>
        <Link to="../admin/ContactUs" className="menu-item">
          {/* <FontAwesomeIcon icon={"faSignOutAlt"} className="icon" /> */}
          <span>Contact Us</span>
        </Link>
        <Link to="../admin/Notification" className="menu-item">
          {/* <FontAwesomeIcon icon={"faSignOutAlt"} className="icon" /> */}
          <span>Notification</span>
        </Link>
        <Link to="../admin/Appointents" className="menu-item">
          {/* <FontAwesomeIcon icon={"faSignOutAlt"} className="icon" /> */}
          <span>Appoinments</span>
        </Link>
        <Link to="/" className="menu-item">
          {/* <FontAwesomeIcon icon={"faSignOutAlt"} className="icon" /> */}
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default LeftBar;