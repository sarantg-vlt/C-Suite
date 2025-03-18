import React from "react";
import { useNavigate } from "react-router-dom";
import PurchaseList from "./PurchaseList";

const AllPurchases = () => {
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
        <h2 className="users-page-title">Purchases</h2>
        <p>Check all the Purchases</p>
      </>
      <div className="users-list-header">
        <h2>
          All Purchases
          <span> 44</span>
        </h2>
      </div>
      <PurchaseList />
    </div>
  );
};

export default AllPurchases;
