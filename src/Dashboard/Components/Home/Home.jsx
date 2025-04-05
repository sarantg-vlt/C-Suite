import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Statistics from "../Statistics/Statistics";
import CourseRecommendation from "../CourseRecomend/CourseRecommendation";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/courseDetail`);
        const courses = response.data;

        const userInfo = JSON.parse(localStorage.getItem("userDataUpdated"));
        if (userInfo) {
          const purchasedCourses = userInfo.coursePurchased || [];
          const purchasedCourseIds = purchasedCourses.map(
            (item) => item.courseId
          );
          const filteredCourses = courses.filter(
            (course) => !purchasedCourseIds.includes(course._id)
          );

          setRecommendedCourses(filteredCourses);
        } else {
          setFetchError(true);
          alert("User not logged in, Go to Profile page");
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setFetchError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCourses = recommendedCourses.filter((course) => {
    const matchesCourseTitle = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLesson = course.lessons?.some((lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesCourseTitle || matchesLesson;
  });

  // Close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openNotification &&
        !event.target.closest(".notification-container") &&
        !event.target.closest(".notification-icon")
      ) {
        setOpenNotification(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openNotification]);

  return (
    <>
      <ToastContainer />
      <div className="mainContent">
        <TopBar
          onSearch={handleSearch}
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
        />

        {!searchTerm && (
          <>
            <div className="headerPart">
              <Header />
            </div>
            <div className="center-Part">
              <div className="center-1">
                <Statistics />
              </div>
            </div>
          </>
        )}

        <div className="home-courseBox">
          <h3>{searchTerm ? "Search Results" : "Recommended Courses"}</h3>
          <div className="home-course">
            {filteredCourses.length > 0 ? (
              filteredCourses.slice(0, 7).map((course, index) => {
                const matchedLessons =
                  course.lessons?.filter((lesson) =>
                    lesson.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) || [];

                return (
                  <CourseRecommendation
                    key={index}
                    title={course.title}
                    courseId={course._id}
                    imgName={course.image}
                    matchedLessons={matchedLessons}
                  />
                );
              })
            ) : (
              <p>You have purchased all the Courses 😊</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
