import React from "react";
import Sidebar from "../sidebar/LeftBar";
import AllPurchases from "./AllPurchases";

const PurchasesPage = () => {
  return (
    <div className="users-page-dashboard">
      <Sidebar />
      <AllPurchases />
    </div>
  );
};

export default PurchasesPage;
