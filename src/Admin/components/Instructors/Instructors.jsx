import React from "react";
import { useNavigate } from "react-router-dom";  // For navigation
import searchIcon from "../Assets/Images/search.png";
import addIcon from "../Assets/Images/plus.png";
import InstructorsList from "./InstructorsList";

const Instructors = ({ openEditInstructor, openAddInstructor }) => {
  const navigate = useNavigate();  

  return (
    <div className="user-page">
      {/* Back Button */}
     
      <button
        className="back-btn"
        onClick={() => navigate(-1)}  
      >
        Back
      </button>

      <>
        <h2 className="users-page-title">Instructor Management</h2>
        <p>Manage the instructors and their details here</p>
      </>
      <div className="users-list-header">
        <h2>
          All Instrcutors
          <span> 44</span>
        </h2>
        <div className="users-header-actions-cnt">
          <div className="search-user-cnt">
            <img src={searchIcon} alt="search-icon" className="search-icon" />
            <input type="text" className="search-input" placeholder="Search" />
          </div>
          <div className="add-new-btn" onClick={() => openAddInstructor()}>
            <img
              src={addIcon}
              alt="add-icon"
              className="search-icon add-icon"
            />
            <p> Add new</p>
          </div>
        </div>
      </div>
      <InstructorsList editAction={openEditInstructor} />
    </div>
  );
};

export default Instructors;
