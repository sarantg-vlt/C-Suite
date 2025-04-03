import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./Marks.css";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Marks = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null); // State to store selected course

  // Fetch From from API
  useEffect(() => {
    const userId = localStorage.getItem("userid");
    console.log("userId", userId);

    if (!API_BASE_URL) {
      console.error("API base URL is not defined in .env file.");
      setError(true);
      setLoading(false);
      return;
    }
    const apiUrl = `${API_BASE_URL}/answers/${userId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
        console.log("Course Data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleBackClick = () => {
    navigate("/home");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer />

      <div className="profile-back-arrow-container" onClick={handleBackClick}>
        <IoMdArrowRoundBack className="profile-back-arrow" />
      </div>
      <div className="main-content">
        <div className="cardContainer3">
          <h2>Marks</h2>

          <div className="courseContainer4">
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Total Marks</th>
                  <th>Lessons</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.courseTitle}>
                    <td>{course.courseTitle}</td>
                    <td>{course.totalMarks}</td>
                    <td>
                      <button onClick={() => setSelectedCourse(course)}>
                        View Lessons
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lesson Popup Modal */}
      {selectedCourse && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Course: {selectedCourse.courseTitle}</h3>
            <p>
              <strong>Total Marks:</strong> {selectedCourse.totalMarks}
            </p>
            <table className="lesson-table">
              <thead>
                <tr>
                  <th>Lesson Title</th>
                  <th>Lesson Marks</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourse.lessons.map((lesson) => (
                  <tr key={lesson.lessonId}>
                    <td>{lesson.lessonTitle}</td>
                    <td>{lesson.lessonMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setSelectedCourse(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Marks;
