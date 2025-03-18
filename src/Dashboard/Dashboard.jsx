import React from "react";
import "./Dashboard.css";
import Sidebar from "../Dashboard/Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sidebarBox">
        <Sidebar />
      </div>
      <div className="outletBox">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
