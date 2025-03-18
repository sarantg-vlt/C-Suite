import React, { useState } from "react";
import Sidebar from "../sidebar/LeftBar";
import "./users-admin.css";
import Users from "./Users";
import AddnewUser from "./AddnewUser";
import EditUserData from "./EditUserData";

const Allusers = () => {
  const [addnewUser, setAddnewUser] = useState(false);
  const [editnewUser, setEditUser] = useState({ open: false, data: null });
  return (
    <div className="users-page-dashboard">
      <Sidebar />
      <Users
        openNewUser={() => setAddnewUser(true)}
        openEditUser={(user) => setEditUser({ open: true, data: user })}
      />
      {addnewUser && <AddnewUser closeNewUser={() => setAddnewUser(false)} />}
      {editnewUser.open && (
        <EditUserData
          currentData={editnewUser.data}
          closeEditUser={() => setEditUser({ open: false, data: null })}
        />
      )}
    </div>
  );
};

export default Allusers;
