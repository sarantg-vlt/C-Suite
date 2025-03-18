import React from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../Assets/Images/search.png";
import addIcon from "../Assets/Images/plus.png";
import UsersList from "./UsersList";

const Users = ({ openNewUser, openEditUser }) => {
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
        <h2 className="users-page-title">User Management</h2>
        <p>Manage the users and their details here</p>
      </>
      <div className="users-list-header">
        <h2>All users</h2>
        <div className="users-header-actions-cnt">
          <div className="search-user-cnt">
            <img src={searchIcon} alt="search-icon" className="search-icon" />
            <input type="text" className="search-input" placeholder="Search" />
          </div>
          <div className="add-new-btn" onClick={() => openNewUser()}>
            <img
              src={addIcon}
              alt="add-icon"
              className="search-icon add-icon"
            />
            <p> Add user</p>
          </div>
        </div>
      </div>
      <UsersList editAction={openEditUser} />
    </div>
  );
};

export default Users;
