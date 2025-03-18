import React, {useEffect, useState } from "react";
import CourseCard from "./CourseCard";
// import courseList from "../Assets/Data/courseList.json";
import { useNavigate } from "react-router-dom";
import { getAllCourse } from "../../api/baseApi";

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, SetCourses] = useState(null);

useEffect(()=>{
  const fetchCourses = async () => {
    try {
      if (courses === null ) {
        const {data} = await getAllCourse();
        SetCourses(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchCourses()
},[courses])


  return (
    <div className="course-list-cnt">
      <div className="course-list-header">
        <h1>Course List</h1>
        <div className="admin-add-course-btn" onClick={() => navigate("Courses/new")}>
          <h3 className="top-btn-text">New Course</h3>
        </div>
      </div>
      <div className="course-list">
        {courses && courses?.map((course, index) => (
          <CourseCard data={course} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
