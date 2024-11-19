import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  const resolveImagePath = (relativePath) => {
    try {
      return relativePath ? relativePath : require("../Assets/Images/imagenotxt.png");
    } catch (error) {
      return require("../Assets/Images/imagenotxt.png");
    }
  };
  return (
    <div
      className="course-card"
      onClick={() => navigate("Course/edit", { state: data })}
    >
      <img
        src={resolveImagePath(data?.image)}
        alt={data?.title || "Course image"}
        className="course-img"
      />
      <h4 className="course-card-title">{data?.title}</h4>
      <p className="course-card-description">{data?.description?.slice(0,80)}..</p>
      <div className="course-edit-btn">
      <p>Edit Course</p>
      </div>
    </div>
  );
};

export default CourseCard;
