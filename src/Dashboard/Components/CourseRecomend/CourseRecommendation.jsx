// import "./CourseRecommendation.css";
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DefaultImg from "../Assets/Images/imagenotxt.png";

// const CourseRecommendation = ({ title, courseId, imgName }) => {
//   useEffect(() => {}, [courseId]);

//   const resolveImagePath = (imagePath) => {
//     if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
//       return imagePath;
//     }

//     // Check for proper base64-encoded images
//     if (imagePath.startsWith("data:image/")) {
//       const base64Content = imagePath.split(",")[1]; // Get the content after `data:image/...;base64,`
//       if (base64Content && base64Content.length > 0) {
//         return imagePath; // Valid base64 string
//       } else {
//         console.warn("Invalid base64 image content. Using fallback image.");
//         return DefaultImg;
//         // return
//       }
//     }
//   };
//   const navigate = useNavigate();
//   return (
//     <div className="cr-card">
//       <div className="cr-image-container">
//         <img
//           src={imgName ? resolveImagePath(imgName) : DefaultImg}
//           className="cr-image"
//           alt="thumbnail"
//         />
//         <div className="cr-title">{title}</div>
//       </div>
//       <button
//         className="cr-button"
//         onClick={() => navigate(`/home/courseDetails/${courseId}`)}
//       >
//         View Course
//       </button>
//     </div>
//   );
// };

// export default CourseRecommendation;
import "./CourseRecommendation.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultImg from "../Assets/Images/imagenotxt.png";

const CourseRecommendation = ({
  title,
  courseId,
  imgName,
  matchedLessons = [],
}) => {
  useEffect(() => {}, [courseId]);

  const resolveImagePath = (imagePath) => {
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
        return DefaultImg;
        // return
      }
    }
  };
  const navigate = useNavigate();
  return (
    <div className="cr-card">
      <div className="cr-image-container">
        <img
          src={imgName ? resolveImagePath(imgName) : DefaultImg}
          className="cr-image"
          alt="thumbnail"
        />
        <div className="cr-title">{title}</div>
        {/* {matchedLessons.length > 0 && (
          <div className="matchedLessons">
            <h5>Matched Lessons:</h5>
            <ul>
              {matchedLessons.map((lesson, index) => (
                <li key={index}>{lesson.title}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
      <button
        className="cr-button"
        onClick={() => navigate(`/home/courseDetails/${courseId}`)}
      >
        View Course
      </button>
    </div>
  );
};

export default CourseRecommendation;
