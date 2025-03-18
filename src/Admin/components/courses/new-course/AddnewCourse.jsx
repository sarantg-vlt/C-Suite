//AddnewCourse.jsx
import React from "react";
import NewCourse from "./NewCourse";
import Sidebar from "../../sidebar/LeftBar";

const AddnewCourse = () => {
  return (
    <div className="courses-page">
      <Sidebar />
      <NewCourse />
    </div>
  );
};

export default AddnewCourse;
