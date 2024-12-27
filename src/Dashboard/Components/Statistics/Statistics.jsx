import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import axios from "axios";
import "./Statistics.css";
import Events from "./Events";
import BigCalendar from "../Calendar/Big-Calendar/BigCalendar";

const Statistics = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [timeSpentData] = useState({
    Sunday: 5,
    Monday: 10,
    Tuesday: 7,
    Wednesday: 12,
    Thursday: 6,
    Friday: 8,
    Saturday: 14,
  });

  // Fetch enrolled courses and progress
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        if (!apiBaseUrl) {
          console.error("API base URL is not configured.");
          return;
        }

        const coursesResponse = await axios.get(`${apiBaseUrl}/courseDetail`);
        const allCourses = coursesResponse.data;

        const userInfo = JSON.parse(localStorage.getItem("userDataUpdated"));
        if (!userInfo || !userInfo.coursePurchased) return;

        const enrolledCoursesWithProgress = await Promise.all(
          userInfo.coursePurchased.map(async (purchasedCourse) => {
            const courseDetails = allCourses.find(
              (course) => course._id === purchasedCourse.courseId
            );

            if (!courseDetails) return null;

            try {
              const userId = localStorage.getItem("userid");
              const progressResponse = await axios.get(
                `${apiBaseUrl}/user/progress/${userId}/${courseDetails._id}`
              );
              const progressData = parseFloat(
                progressResponse.data.watchedPercentage || 0
              );

              return {
                ...courseDetails,
                progress: progressData,
              };
            } catch (error) {
              console.error(
                `Error fetching progress for course ${courseDetails._id}:`,
                error
              );
              return {
                ...courseDetails,
                progress: 0,
              };
            }
          })
        );

        const filteredCourses = enrolledCoursesWithProgress.filter(Boolean);
        setEnrolledCourses(filteredCourses);

        if (filteredCourses.length > 0) {
          setSelectedCourse(filteredCourses[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCourseChange = (event) => {
    const course = enrolledCourses.find((c) => c._id === event.target.value);
    setSelectedCourse(course);
  };

  return (
    <div className="statistics">
      <div className="time-spent d-block">
        <h3>Event</h3>
        <div className="chart-container">
          <Events/>
         
        </div>
      </div> 

      <div className="completion">
        <h3>Course Completion</h3>
        <div className="course-selector">
          <select
            value={selectedCourse?._id || ""}
            onChange={handleCourseChange}
            className="course-select"
          >
            <option value="" disabled>
              Select a course
            </option>
            {enrolledCourses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {selectedCourse ? (
          <>
            <p className="selected-course">
              Showing completion status for: {selectedCourse.title}
            </p>
            <div className="completion-progress">
              <p>Overall Progress: {Math.round(selectedCourse.progress)}%</p>
            </div>
            <Chart
              data={{ progress: selectedCourse.progress }}
              isTimeSpent={false}
            />
          </>
        ) : (
          <p>No courses enrolled</p>
        )}
      </div>

      <BigCalendar/>
    </div>
  );
};

export default Statistics;