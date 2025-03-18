import React, { useState } from "react";
import AddInstructor from "./addInstructors/AddInstructor";
import EditInstructor from "./editinstructors/EditInstructor";
import Instructors from "./Instructors";
import LeftBar from "../sidebar/LeftBar";
import './Instructors.css'

const AllInstructors = () => {
  const [addnewInstructor, setAddnewInstructor] = useState(false);
  const [editInstructor, setEditInstructor] = useState({
    open: false,
    data: null,
  });
  return (
    <div className="users-page-dashboard">
      <LeftBar />
      <Instructors
        openAddInstructor={() => setAddnewInstructor(true)}
        openEditInstructor={(user) => setEditInstructor({ open: true, data: user })}
      />
      {addnewInstructor && (
        <AddInstructor closeNewData={() => setAddnewInstructor(false)} />
      )}
      {editInstructor.open && (
        <EditInstructor
          currentData={editInstructor.data}
          closeEditUser={() => setEditInstructor({ open: false, data: null })}
        />
      )}
    </div>
  );
};

export default AllInstructors;
