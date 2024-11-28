import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // For navigation
import searchIcon from "../Assets/Images/search.png";
import addIcon from "../Assets/Images/plus.png";
import InstructorsList from "./InstructorsList";
import axios from "axios";
const apiBaseUri = process.env.REACT_APP_API_BASE_URL;

const Instructors = ({ openEditInstructor, openAddInstructor }) => {
  const navigate = useNavigate();
  const [instuctors, setInstuctors] = useState([])  
  useEffect(() => {
    const fetchinstractors = async () => {
      try {
        const res = await axios.get(`${apiBaseUri}/instructor/emails`);
        setInstuctors(res.data); // Assuming the API response is structured as { data: [...] }
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchinstractors();
  }, [apiBaseUri]);

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
          <span> {instuctors.length}</span>
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
      <InstructorsList editAction={openEditInstructor} instructors={instuctors} />
    </div>
  );
};

export default Instructors;
