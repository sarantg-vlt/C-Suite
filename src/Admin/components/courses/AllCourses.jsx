import React from "react";
import Sidebar from "../sidebar/LeftBar";
import "./courses.css";
import CourseList from "./CourseList";

const AllCourses = () => {
  return (
    <div className="courses-page">
      <Sidebar />
      <CourseList/>
    </div>
  );
};

export default AllCourses;
