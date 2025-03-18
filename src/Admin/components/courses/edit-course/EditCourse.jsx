import React from "react";
import Sidebar from "../../sidebar/LeftBar";
import Edit from "./Edit";
import { useLocation } from "react-router-dom";

const EditCourse = () => {
  const data = useLocation().state;
  console.log(data)
  return (
    <div className="courses-page">
      <Sidebar />
      <Edit courseDetails={data} />
    </div>
  );
};

export default EditCourse;
