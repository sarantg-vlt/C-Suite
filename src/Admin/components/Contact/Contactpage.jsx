import React from "react";
// import { useNavigate } from "react-router-dom";  // For navigation
import searchIcon from "../Assets/Images/search.png";
import addIcon from "../Assets/Images/plus.png";
// import InstructorsList from "./InstructorsList";

const Contactpage = ({contacts}) => {
  const contact_count = contacts.data
  return (
    <>
        <h2 className="users-page-title">Contact Management</h2>
        <p>Manage the contacts and their details here</p>
      <div className="users-list-header">
        <h2>
          All Contacters
          <span> {contact_count?.length || 0}</span>
        </h2>
        <div className="users-header-actions-cnt">
          <div className="search-user-cnt">
            <img src={searchIcon} alt="search-icon" className="search-icon" />
            <input type="text" className="search-input" placeholder="Search" />
          </div>
          <div className="add-new-btn">
            <img
              src={addIcon}
              alt="add-icon"
              className="search-icon add-icon"
            />
            <p> Add new</p>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Contactpage