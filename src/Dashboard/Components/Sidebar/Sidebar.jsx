import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoShort from "../Assets/Images/logoShort.png";
import logoTxt from "../Assets/Images/logoTxt.png";
import "./Sidebar.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";

import {
  faHome,
  faUser,
  faHeart,
  faBook,
  faCog,
  faSignOutAlt,
  faBars,
  faChevronLeft,
  faHand,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

function SidebarItem({
  icon,
  text,
  active,
  expanded,
  path,
  splMargin,
  loggedOut,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const iconStyle = {
    marginLeft: expanded
      ? ""
      : windowWidth <= 1125 && !splMargin
      ? "7px"
      : windowWidth <= 1125 && splMargin
      ? "5px"
      : splMargin
      ? "6.25px"
      : "8.25px",
    flex: expanded ? 1 : "",
  };

  return (
    <NavLink
      to={path}
      className={`sidebar-item ${active ? "active" : ""} ${
        expanded ? "expanded" : "collapsed"
      }`}
      end={true}
      onClick={(e) => {
        if (loggedOut) {
          toast.success("Logout Successfully", {
            autoClose: 3000,
          });
          setTimeout(() => {
            localStorage.clear();
            navigate("/"); // Navigate after 2 seconds
          }, 3000);
        }
      }}
    >
      <FontAwesomeIcon icon={icon} className="icon" style={iconStyle} />
      <span
        className="item-text"
        style={{
          marginLeft: expanded ? "6px" : "",
          flex: expanded ? 6 : 0,
          transform: expanded ? "translateX(0%)" : "translateX(-100%)",
          opacity: expanded ? 1 : 0,
        }}
      >
        {text}
      </span>
    </NavLink>
  );
}

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const iconStyle = {
    marginLeft: expanded ? "" : windowWidth <= 1125 ? "3.5px" : "8px",
    flex: expanded ? 1 : "",
  };

  const collapsedShortMobileLogo = {
    marginLeft: expanded ? "" : windowWidth <= 835 ? "10px" : "0px",
  };

  return (
    <>
      <aside className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
        <nav className="sidebar-nav">
          <div className="sidebar-header">
            <img
              src={expanded ? logoShort : logoShort}
              className={expanded ? "logo-short" : "logo-short"}
              style={collapsedShortMobileLogo}
              alt="Logo"
            />
            <img
              src={logoTxt}
              className={expanded ? "logo-txt" : "logo-txt"}
              alt="LogoTxt"
            />
          </div>
          <div className="sidebar-menu">
            <button
              className={`sidebar-item ${expanded ? "expanded" : "collapsed"}`}
              style={{
                border: "none",
                outline: "none",
              }}
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon
                icon={expanded ? faChevronLeft : faBars}
                style={
                  (iconStyle,
                  {
                    marginLeft: expanded ? "" : "7px",
                  })
                }
                className="icon"
              />
              <span
                className="item-text"
                style={{
                  marginLeft: expanded ? "6px" : "",
                  flex: expanded ? 6 : 0,
                  opacity: expanded ? 1 : 0,
                }}
              >
                {/* {"Hide"} */}
              </span>
            </button>
            <SidebarItem
              path={"./"}
              icon={faHome}
              splMargin={true}
              text={"Dashboard"}
              expanded={expanded}
            />
            <SidebarItem
              path={"./Profile"}
              icon={faUser}
              text={"Profile"}
              expanded={expanded}
            />
            <SidebarItem
              icon={faHeart}
              splMargin={true}
              path={"./enrolled"}
              text={"Enrolled"}
              expanded={expanded}
            />
            <SidebarItem
              icon={faBook}
              path={"./Courses"}
              text={"Courses"}
              expanded={expanded}
            />
            <SidebarItem
              icon={faUserGraduate} // Changed icon for Marks
              path={"./marks"}
              text={"Marks"}
              expanded={expanded}
            />
            <SidebarItem
              icon={faHand}
              path={"./Request"}
              text={"Request"}
              expanded={expanded}
            />
          </div>
          <div className="menu-bottom">
            {/* <SidebarItem
              icon={faCog}
              path={"./setting"}
              text={"Settings"}
              expanded={expanded}
            /> */}
            <SidebarItem
              icon={faSignOutAlt}
              // path={"/"}
              text={"Logout"}
              expanded={expanded}
              loggedOut={true}
            />
          </div>
        </nav>
      </aside>
      {expanded && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
