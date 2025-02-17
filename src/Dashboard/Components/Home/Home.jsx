// import React, { useState, useEffect } from "react";
// import "./Home.css";
// import axios from "axios";
// import TopBar from "../TopBar/TopBar";
// import Header from "../Header/Header";
// import CustomCalendar from "../Calendar/Calendar";
// import Statistics from "../Statistics/Statistics";
// import LoadingPage from "../LoadingPage/LoadingPage";
// import CourseRecommendation from "../CourseRecomend/CourseRecommendation";
// import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
// import BigCalendar from "../Calendar/Big-Calendar/BigCalendar";
// import Events from "../Statistics/Events";

// function Home() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchError, setFetchError] = useState(false);
//   const [recommendedCourses, setRecommendedCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
//         const response = await axios.get(`${apiBaseUrl}/courseDetail`);
//         const courses = response.data;

//         const userInfo = JSON.parse(localStorage.getItem("userDataUpdated"));
//         if (userInfo) {
//           const purchasedCourses = userInfo.coursePurchased || [];

//           // Extract the courseId from each purchased course
//           const purchasedCourseIds = purchasedCourses.map(
//             (item) => item.courseId
//           );

//           // Filter to show only courses that have not been purchased
//           const filteredCourses = courses.filter(
//             (course) => !purchasedCourseIds.includes(course._id)
//           );

//           setRecommendedCourses(filteredCourses);
//           console.log(filteredCourses); // Ensure correct filtering
//         } else {
//           setFetchError(true);
//           alert("User not logged in, Go to Profile page");
//           console.log("No user info found in localStorage");
//         }
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error fetching course details:", err);
//         setFetchError(true);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   // const filteredCourses = recommendedCourses.filter((course) =>
//   //   course.title.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   const filteredCourses = recommendedCourses.filter((course) => {
//     const matchesCourseTitle = course.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesLesson = course.lessons?.some((lesson) =>
//       lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     return matchesCourseTitle || matchesLesson;
//   });
//   // [recommendedCourses, searchTerm]

//   // if (isLoading) {
//   //   return <LoadingPage />;
//   // }

//   // if (fetchError) {
//   //   return <ErrorDataFetchOverlay />;
//   // }

//   return (
//     <div className="mainContent">
//       <TopBar onSearch={handleSearch} />

//       {/* Conditionally render other components only when searchTerm is empty */}
//       {!searchTerm && (
//         <>
//           <div className="headerPart">
//             <Header />
//           </div>
//           <div className="center-Part">
//             <div className="center-1">
//               <Statistics />
//             </div>
//           </div>

//           {/* <div className="Dashboard">
//             <div className="box box1">
//               <Header />
//             </div>
//             <div className="box box2">
//               <p>Announcements</p>
//               <Events />
//             </div>
//             <div className="box box3">box3</div>
//             <div className="box box4">
//               <BigCalendar />
//             </div>
//           </div> */}
//         </>
//       )}

//       <div className="home-courseBox">
//         <h3>{searchTerm ? "Search Results" : "Recommended Courses"}</h3>
//         <div className="home-course">
//           {filteredCourses.length > 0 ? (
//             filteredCourses.slice(0, 7).map((course, index) => {
//               const matchedLessons =
//                 course.lessons?.filter((lesson) =>
//                   lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
//                 ) || [];

//               return (
//                 <CourseRecommendation
//                   key={index}
//                   title={course.title}
//                   courseId={course._id}
//                   imgName={course.image}
//                   matchedLessons={matchedLessons}
//                 />
//               );
//             })
//           ) : (
//             // <p>No courses or lessons found for "{searchTerm}"</p>
//             <p>You have purchased all the Courses 😊</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import Header from "../Header/Header";
import CustomCalendar from "../Calendar/Calendar";
import Statistics from "../Statistics/Statistics";
import LoadingPage from "../LoadingPage/LoadingPage";
import CourseRecommendation from "../CourseRecomend/CourseRecommendation";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
import BigCalendar from "../Calendar/Big-Calendar/BigCalendar";
import Events from "../Statistics/Events";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/courseDetail`);
        const courses = response.data;

        const userInfo = JSON.parse(localStorage.getItem("userDataUpdated"));
        if (userInfo) {
          const purchasedCourses = userInfo.coursePurchased || [];

          // Extract the courseId from each purchased course
          const purchasedCourseIds = purchasedCourses.map(
            (item) => item.courseId
          );

          // Filter to show only courses that have not been purchased
          const filteredCourses = courses.filter(
            (course) => !purchasedCourseIds.includes(course._id)
          );

          setRecommendedCourses(filteredCourses);
          console.log(filteredCourses); // Ensure correct filtering
        } else {
          setFetchError(true);
          alert("User not logged in, Go to Profile page");
          console.log("No user info found in localStorage");
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

  // const filteredCourses = recommendedCourses.filter((course) =>
  //   course.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredCourses = recommendedCourses.filter((course) => {
    const matchesCourseTitle = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLesson = course.lessons?.some((lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesCourseTitle || matchesLesson;
  });
  // [recommendedCourses, searchTerm]

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  // if (fetchError) {
  //   return <ErrorDataFetchOverlay />;
  // }

  return (
    <div className="mainContent">
      <TopBar onSearch={handleSearch} />

      {/* Conditionally render other components only when searchTerm is empty */}
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

          {/* <div className="Dashboard">
            <div className="box box1">
              <Header />
            </div>
            <div className="box box2">
              <p>Announcements</p>
              <Events />
            </div>
            <div className="box box3">box3</div>
            <div className="box box4">
              <BigCalendar />
            </div>
          </div> */}
        </>
      )}

      <div className="home-courseBox">
        <h3>{searchTerm ? "Search Results" : "Recommended Courses"}</h3>
        <div className="home-course">
          {filteredCourses.length > 0 ? (
            filteredCourses.slice(0, 7).map((course, index) => {
              const matchedLessons =
                course.lessons?.filter((lesson) =>
                  lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            // <p>No courses or lessons found for "{searchTerm}"</p>
            <p>You have purchased all the Courses 😊</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
