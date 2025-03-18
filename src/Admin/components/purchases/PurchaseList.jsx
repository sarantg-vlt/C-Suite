import React from "react";
import searchIcon from "../Assets/Images/potrate-1.jpg";

const PurchaseList = () => {
  return (
    <div className="users-list-cnt">
      <div className="users-details-header">
        <p className="user-name-cnt ">username</p>
        <p className="user-name-cnt">amount</p>
        <p className="user-name-cnt">course</p>
        <p className="user-date-cnt">date</p>
        <p className="user-date-cnt">paymentId</p>
        <p style={{ width: ".5rem" }}></p>
      </div>
      <div className="user-details-cnt">
        <div className="user-name-cnt">
          <img src={searchIcon} alt="profile-icon" className="profile-img" />
          <div className="name-cnt">
            <h3>Test user</h3>
            <p>testuser123@gmail.com</p>
          </div>
        </div>
        <p className="user-name-cnt details-text">₹ 1200</p>
        <p className="details-text user-name-cnt">Google Cloud</p>
        <p className="details-text user-date-cnt">july 4, 2023</p>
        <p className="details-text user-date-cnt">PIDTY6565</p>
      </div>
      <div className="user-details-cnt">
        <div className="user-name-cnt">
          <img src={searchIcon} alt="profile-icon" className="profile-img" />
          <div className="name-cnt">
            <h3>Test user</h3>
            <p>testuser123@gmail.com</p>
          </div>
        </div>
        <p className="user-name-cnt details-text">₹ 1200</p>
        <p className="details-text user-name-cnt">It & Security</p>
        <p className="details-text user-date-cnt">july 4, 2023</p>
        <p className="details-text user-date-cnt">PIDTY6565</p>
      </div>
    </div>
  );
};

export default PurchaseList;
