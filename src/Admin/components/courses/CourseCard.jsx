import React from "react";
import { useNavigate } from "react-router-dom";
import DefultImg from "../Assets/Images/imagenotxt2.png";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  const resloveImagePath = (imagePath) => {
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Check for proper base64-encoded images
    if (imagePath.startsWith("data:image/")) {
      const base64Content = imagePath.split(",")[1]; // Get the content after `data:image/...;base64,`
      if (base64Content && base64Content.length > 0) {
        return imagePath; // Valid base64 string
      } else {
        console.warn("Invalid base64 image content. Using fallback image.");
        return DefultImg;
      }
    }

    // Attempt to resolve local images
    try {
      const resolvedImage = require(`../Assets/Images/${imagePath}`);
      return resolvedImage;
    } catch (error) {
      console.error(
        `Failed to resolve image path: ${imagePath}. Using fallback image.`,
        error
      );
      return DefultImg;
    }
    return require(`../Assets/Images/imagenotxt.png`);
  };
  return (
    <div
      className="course-card"
      onClick={() => navigate(`Course/edit/${data?._id}`, { state: data })}
    >
      <img
        src={resloveImagePath(data?.image)}
        alt={data?.title || "Course image"}
        className="course-img"
      />
      <h4 className="course-card-title">{data?.title}</h4>
      <p className="course-card-description">
        {data?.description?.slice(0, 80)}..
      </p>
      <div className="course-edit-btn">
        <p>Edit Course</p>
      </div>
    </div>
  );
};

export default CourseCard;
