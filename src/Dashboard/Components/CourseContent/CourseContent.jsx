import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./CourseContent.css";
import tick from "../Assets/SVG/tick.svg";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import Accordion from "react-bootstrap/Accordion";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
import ProgressBar from "../ProgressBar/ProgressBar";
import ReactPlayer from "react-player";
import { Button, Modal } from "react-bootstrap";
import CourseReview from "./CourseReview";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const CourseContent = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  // const iframeRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [courseData, setCourseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedID, setFetchedID] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [currentCourseData, setCurrentCourseData] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleShowModal = () => setShowReviewModal(true);
  const handleCloseModal = () => setShowReviewModal(false);



  // nxt btn
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);
  // const [totalSlides, setTotalSlides] = useState(null);
  // const [currentSlide, setCurrentSlide] = useState(1); // Track current slide
  // const [totalSlides, setTotalSlides] = useState(0); 

    // const [slideIndex, setSlideIndex] = useState(1); // State to track the current slide
    // const [currentUrl, setCurrentUrl] = useState(googleEmbedUrl); 
  
  
  // progress
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [watchedVideoTitles, setWatchedVideoTitles] = useState([]);

  // api data
  const [completedUserData, setCompletedUserData] = useState([]);


  console.log(courseData);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(
          `${apiBaseUrl}/courseDetail/${courseId}`
        );
        setCourseData(response.data);
        // console.log(response.data.course);

        const userInfo = localStorage.getItem("userid");
        // console.log(userInfo)
        if (userInfo) {
          const userID = userInfo;
          setUserId(userID);
        } else {
          setFetchError(true);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setIsLoading(false);
        setFetchError(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCompletedVideos = async () => {
      if (!userId) return;

      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

        const response = await axios.get(
          `${apiBaseUrl}/completevideo/${userId}/${courseId}`
        );

        const data = response.data.completedUserData;
        // console.log("Fetched data:", data[0].completedVideos);
        setCompletedUserData(data[0].completedVideos);

        if (data.length > 0) {
          const firstItem = data[0];
          const completedTitles = firstItem.completedVideos;

          // Initialize completedExercises
          const completedSet = new Set(
            firstItem.completedVideos.flatMap((videoTitle) =>
              courseData.lessons.flatMap((lesson, lessonIndex) =>
                lesson.chapter.flatMap((video, videoIndex) =>
                  video.title === videoTitle
                    ? [`${lessonIndex}-${videoIndex}`]
                    : []
                )
              )
            )
          );
          setCompletedExercises(completedSet);
          setFetchedID(firstItem._id);
          setWatchedVideoTitles(completedTitles);

          // console.log("Completed video titles:", completedTitles);
        } else {
          console.log("No completed videos found.");
          setCompletedUserData([]);
          setWatchedVideoTitles([]);
          setCompletedExercises(new Set());
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            // const message =
            //   err.response.data.message ||
            //   "No completed videos found. This might be normal.";
            // console.log(message);
            setCompletedUserData([]);
            setWatchedVideoTitles([]);
            setCompletedExercises(new Set());

            try {
              const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

              await axios.post(`${apiBaseUrl}/completevideo/`, {
                userId,
                courseId,
                completedVideos: [],
              });
              // alert("posting in effect");
              // console.log("New entry created with empty completed videos.");
            } catch (postErr) {
              console.error(
                "Error creating new completed video entry:",
                postErr
              );
            }
          } else {
            console.error(
              "Error fetching completed videos:",
              err.response.data.message || err.message || err
            );
          }
        } else {
          console.error("Error fetching completed videos:", err.message || err);
        }
      }
    };

    fetchCompletedVideos();
  }, [userId, courseId]);

  // posting progress data start
  const progress_data = async (lessonIndex, chapterIndex) => {
    // Calculate total exercises and progress percentage
    const totalExercises = courseData.lessons?.reduce(
      (total, lesson) => total + lesson.chapter?.length,
      0
    );

    const progress_percentage =
      totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

    const watchedPercentage = progress_percentage;

    // Ensure required data is available
    if (!userId || !courseId || watchedPercentage == null) {
      console.error("Missing required data for API request.");
      return;
    }

    try {
      // Endpoint URL
      const endpoint = `${apiBaseUrl}/user/progress/update`;

      // API request payload
      const payload = {
        userId,
        courseId,
        watchedPercentage,
        lessonIndex,
        chapterIndex,
      };

      // API request
      const response = await axios.post(endpoint, payload);

      console.log("Progress updated successfully:", response.data);
    } catch (err) {
      console.error(
        "Error updating progress:",
        err.message,
        err.response?.data || {}
      );
    }
  };

  const handleLessonComplete = (lessonIndex, chapterIndex) => {
    progress_data(lessonIndex, chapterIndex);
  };

  // Example: Call this function after a user completes a chapter
  handleLessonComplete(currentLessonIndex, currentVideoIndex);
  // console.log(handleLessonComplete);
  // posting progress data end

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? null : index);
    setActiveAccordion(index === activeLesson ? null : index);
  };

  const calculateTotalDuration = (videos) => {
    let totalSeconds = 0;
    videos?.forEach((video) => {
      if (video.duration) {
        const timeComponents = video.duration.split(":").map(Number);
        totalSeconds += timeComponents[0] * 60 + timeComponents[1];
      }
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
  };

  function convertToReadableDuration(duration) {
    if (!duration || duration === "0") {
      return "3mins+";
    }

    const [minutes, seconds] = duration.split(":");
    return `${parseInt(minutes, 10)}m ${parseInt(seconds, 10)}s`;
  }

  // const handleNext = async () => {
  //   if (courseData.lessons) {
  //     const currentLesson = courseData.lessons[currentLessonIndex];

  //     if (currentLessonIndex === 0 && currentVideoIndex === -1) {
  //       handleCurrentContent(currentLesson.chapter[0], currentLessonIndex, 0);
  //     } else if (currentVideoIndex < currentLesson.chapter.length - 1) {
  //       handleCurrentContent(
  //         currentLesson.chapter[currentVideoIndex + 1],
  //         currentLessonIndex,
  //         currentVideoIndex + 1
  //       );
  //     } else if (currentLessonIndex < courseData.lessons.length - 1) {
  //       const nextLesson = courseData.lessons[currentLessonIndex + 1];
  //       handleCurrentContent(nextLesson.chapter[0], currentLessonIndex + 1, 0);
  //     } else {
  //       const totalExercises = courseData.lessons.reduce(
  //         (total, lesson) => total + lesson.chapter.length,
  //         0
  //       );
  //       if (completedExercises.size === totalExercises) {
  //         alert("Congratulations! You have completed the course!");
  //       } else {
  //         alert("There are a few lessons you need to complete!");
  //       }
  //     }
  //   }
  // };



  const handleNext = async () => {
    if (courseData.lessons) {
      const currentLesson = courseData.lessons[currentLessonIndex];

      if (currentLessonIndex === 0 && currentVideoIndex === -1) {
        // If it's the first lesson and no video has been viewed yet, load the first video
        handleCurrentContent(currentLesson.chapter[0], currentLessonIndex, 0);
        // Update progress state
        setCurrentVideoIndex(0);
      } else if (currentVideoIndex < currentLesson.chapter.length - 1) {
        // If there are more videos in the current lesson, load the next video
        handleCurrentContent(
          currentLesson.chapter[currentVideoIndex + 1],
          currentLessonIndex,
          currentVideoIndex + 1
        );
        // Update progress state
        setCurrentVideoIndex(currentVideoIndex + 1);
      } else if (currentLessonIndex < courseData.lessons.length - 1) {
        // If this is the last video in the current lesson, move to the next lesson
        const nextLesson = courseData.lessons[currentLessonIndex + 1];
        handleCurrentContent(nextLesson.chapter[0], currentLessonIndex + 1, 0);
        // Update progress state
        setCurrentLessonIndex(currentLessonIndex + 1);
        setCurrentVideoIndex(0); // Reset to first video of the next lesson
      }
    }
  };

  const handleCurrentContent = async (data, lessonIndex, exerciseIndex) => {
    console.log("Selected Content Data:", data);

    // Prepare modified data for the current course content
    const modifiedData = {
      ...data,
      exerciseNo: exerciseIndex + 1,
      lessonNo: lessonIndex + 1,
      type: data.type,
      link: data.link,
      duration: data.duration,
    };

    // Update the current course data and UI state
    setCurrentCourseData(modifiedData);
    setCurrentLessonIndex(lessonIndex);
    setCurrentVideoIndex(exerciseIndex);
    setActiveAccordion(lessonIndex);

    // console.log("Current content set:", modifiedData);

    // Optional: Send progress update to the backend
    try {
      const videoAlreadyCompleted = completedUserData.includes(data.title);

      if (!videoAlreadyCompleted) {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

        await axios.put(
          `${apiBaseUrl}/completevideo/${fetchedID}/updatelesson`,
          { lesson: data.title }
        );
        console.log("Content completion updated on the server:", data.title);
      }
    } catch (err) {
      console.error("Error updating content progress:", err);
    }
  };

  // const handleMediaEnd = async (data, lessonIndex, exerciseIndex) => {
  //   const exerciseKey = `${lessonIndex}-${exerciseIndex}`;

  //   // const modifiedData = {
  //   //   ...data,
  //   //   // exerciseNo: exerciseIndex + 1,
  //   //   lessonNo: lessonIndex + 1,
  //   // };
  //   // setCurrentCourseData(modifiedData)
  //   // Update completed exercises
  //   setCompletedExercises((prev) => {
  //     const updatedSet = new Set(prev);
  //     updatedSet.add(exerciseKey);
  //     console.log("Updated completedExercises:", Array.from(updatedSet));
  //     return updatedSet;
  //   });

  //   // Update watched video titles
  //   setWatchedVideoTitles((prevTitles) => {
  //     const updatedTitles = new Set(prevTitles);
  //     updatedTitles.add(data?.title);
  //     console.log("Updated watchedVideoTitles:", Array.from(updatedTitles));
  //     return Array.from(updatedTitles);
  //   });

  //   console.log(`Media ended for: ${data?.title}, marked as completed.`);

  //   // // Optional: Send progress update to the backend
  //   // try {
  //   //   const videoAlreadyCompleted = completedUserData.includes(data.title);

  //   //   if (!videoAlreadyCompleted) {
  //   //     const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  //   //     await axios.put(
  //   //       `${apiBaseUrl}/completevideo/${fetchedID}/updatelesson`,
  //   //       { lesson: data.title }
  //   //     );
  //   //     console.log("Media end progress updated on the server:", data.title);
  //   //   }
  //   // } catch (err) {
  //   //   console.error("Error updating media end progress:", err);
  //   // }
  // };

  const handleMediaEnd = async () => {
    if (currentLessonIndex !== null && currentVideoIndex !== null) {
      const exerciseKey = `${currentLessonIndex}-${currentVideoIndex}`;
      setCompletedExercises((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.add(exerciseKey);
        return updatedSet;
      });

      const currentVideo =
        courseData.lessons[currentLessonIndex].chapter[currentVideoIndex];
      setWatchedVideoTitles((prevTitles) => {
        const updatedTitles = new Set(prevTitles);
        updatedTitles.add(currentVideo.title);
        return Array.from(updatedTitles);
      });

      progress_data(currentLessonIndex, currentVideoIndex);
    }
  };

  // const renderEmbeddedPPT = (link,data,lessonIndex,exerciseIndex) => {
  //   // console.log(link);

  //   const fileIdMatch = link.match(/\/d\/([^/]+)/);
  //   const fileId = fileIdMatch ? fileIdMatch[1] : null;

  //   if (!fileId) {
  //     return <p>Error: Invalid link format</p>;
  //   }

  //   const googleEmbedUrl = `https://docs.google.com/presentation/d/${fileId}/embed`;
  //   const officeEmbedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
  //     link
  //   )}`;

  //   return (
  //     <>
  //     <div>
  //       <iframe
  //         title="PPT Viewer"
  //         src={googleEmbedUrl}
  //         style={{ width: "100%", height: "100%", border: "none" }}
  //         allow="autoplay; encrypted-media"
  //         onError={(e) => {
  //           e.target.src = officeEmbedUrl;
  //         }}
  //         // onLoad={handleMediaEnd}
  //         />
  //       <p>
  //         If the viewer fails to load,{" "}
  //         <a href={link} target="_blank" rel="noopener noreferrer">
  //           download the PPT file
  //         </a>
  //         .
  //       </p>
  //     </div>
  //       {/* Mark as Completed button */}
  //       <button
  //         className="markCompletedButton mt-10"
  //         onClick={() =>
  //           // handleMediaEnd({ title: "PPT Slide" }, lessonIndex, exerciseIndex)
  //           handleMediaEnd({title:`${data?.title}`},lessonIndex, exerciseIndex)
  //         }
  //         >
  //         Mark as Completed
  //       </button>
  //         </>
  //   );
  // };

  // const renderEmbeddedPPT = (link, data, lessonIndex, exerciseIndex) => {
  //   const fileIdMatch = link.match(/\/d\/([^/]+)/);
  //   const fileId = fileIdMatch ? fileIdMatch[1] : null;

  //   if (!fileId) {
  //     return <p>Error: Invalid link format</p>;
  //   }

  //   const googleEmbedUrl = `https://docs.google.com/presentation/d/${fileId}/embed?start=false&loop=false&delayms=3000`;
  //   const officeEmbedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
  //     link
  //   )}`;

  //   let iframeRef = null; // Reference to iframe

  //   const navigateSlides = (direction) => {
  //     if (iframeRef && iframeRef.contentWindow) {
  //       const message = direction === "next" ? "NEXT" : "PREV";
  //       iframeRef.contentWindow.postMessage({ type: message }, "*");
  //     }
  //   };

  //   return (
  //     <>
  //       <div>
  //         <iframe
  //           title="PPT Viewer"
  //           ref={(ref) => (iframeRef = ref)}
  //           src={googleEmbedUrl}
  //           style={{ width: "100%", height: "500px", border: "none" }}
  //           allow="autoplay; encrypted-media"
  //           onError={(e) => {
  //             e.target.src = officeEmbedUrl;
  //           }}
  //         />
  //         <p>
  //           If the viewer fails to load,{" "}
  //           <a href={link} target="_blank" rel="noopener noreferrer">
  //             download the PPT file
  //           </a>
  //           .
  //         </p>
  //       </div>
  //       {/* Controls and Mark as Completed button */}
  //       <div className="controls mt-10">
  //         <button
  //           className="controlButton"
  //           onClick={() => navigateSlides("prev")}
  //         >
  //           Left
  //         </button>
  //         <button
  //           className="controlButton"
  //           onClick={() => navigateSlides("next")}
  //         >
  //           Right
  //         </button>
  //         <button
  //           className="markCompletedButton"
  //           onClick={() =>
  //             handleMediaEnd(
  //               { title: `${data?.title}` },
  //               lessonIndex,
  //               exerciseIndex
  //             )
  //           }
  //         >
  //           Mark as Completed
  //         </button>
  //       </div>
  //     </>
  //   );
  // };

//  const renderEmbeddedPPT = (link, data, lessonIndex, exerciseIndex) => {
//    const fileIdMatch = link.match(/\/d\/([^/]+)/);
//    const fileId = fileIdMatch ? fileIdMatch[1] : null;

//    if (!fileId) {
//      return <p>Error: Invalid link format</p>;
//    }

//   //  const [currentSlide, setCurrentSlide] = useState(1);
//   //  const [totalSlides, setTotalSlides] = useState(null); // Dynamically calculate total slides
//   //  const iframeRef = useRef(null);

//    const googleEmbedUrl = `https://docs.google.com/presentation/d/${fileId}/embed?start=false&loop=false&slide=${currentSlide}`;

//    const navigateSlides = (direction) => {
//      // Update the slide count only when navigating forward
//      setCurrentSlide((prevSlide) => {
//        const newSlide = prevSlide + direction;

//        if (newSlide < 1) {
//          alert("This is the first slide!");
//          return 1;
//        }

//        if (totalSlides !== null && newSlide > totalSlides) {
//          alert("You have reached the end of the slides!");
//          return prevSlide;
//        }

//        // Calculate total slides dynamically when navigating beyond known slides
//        if (direction > 0 && totalSlides === null) {
//          calculateTotalSlides(newSlide);
//        }

//        return newSlide;
//      });
//    };

//    const calculateTotalSlides = (startSlide) => {
//      const iframe = iframeRef.current;
//      if (!iframe) return;

//     //  const interval = setInterval(() => {
//     //    const iframeSrc = iframe.src;
//     //    if (!iframeSrc.includes(`slide=${startSlide}`)) {
//     //      // Slide exists; increment slide count
//     //      startSlide++;
//     //      iframe.src = `https://docs.google.com/presentation/d/${fileId}/embed?start=false&loop=false&slide=${startSlide}`;
//     //    } else {
//     //      // No more slides; stop counting
//     //      clearInterval(interval);
//     //      setTotalSlides(startSlide - 1);
//     //    }
//     //  }, 10); // Adjust interval time if necessary
//    };

//    if (totalSlides === null && currentSlide === 1) {
//      calculateTotalSlides(currentSlide);
//    }

//    return (
//      <>
//        <div>
//          <iframe
//            ref={iframeRef}
//            title="PPT Viewer"
//            src={googleEmbedUrl}
//            style={{ width: "100%", height: "500px", border: "none" }}
//            allow="autoplay; encrypted-media"
//          />
//          <p>
//            If the viewer fails to load,{" "}
//            <a href={link} target="_blank" rel="noopener noreferrer">
//              download the PPT file
//            </a>
//            .
//          </p>
//        </div>
//        <div className="controls mt-10">
//          <button
//            className="controlButton"
//            onClick={() => navigateSlides(-1)}
//            disabled={currentSlide === 1}
//          >
//            Previous
//          </button>
//          <button className="controlButton" onClick={() => navigateSlides(1)}>
//            Next
//          </button>
//          <button
//            className="markCompletedButton"
//            onClick={() =>
//              handleMediaEnd(
//                { title: `${data?.title}` },
//                lessonIndex,
//                exerciseIndex
//              )
//            }
//          >
//            Mark as Completed
//          </button>
//          <p>
//            Slide {currentSlide} of {totalSlides || "Calculating..."}
//          </p>
//        </div>
//      </>
//    );
  //  };
  


// const renderEmbeddedPPT = ({
//   link,
//   data,
//   lessonIndex,
//   exerciseIndex,
//   totalSlides = 10,
// }) => {
//   const fileIdMatch = link.match(/\/d\/([^/]+)/);
//   const fileId = fileIdMatch ? fileIdMatch[1] : null;

//   if (!fileId) {
//     return <p>Error: Invalid link format</p>;
//   }

//   // const [currentSlide, setCurrentSlide] = useState(1); // State to track the current slide
//     const googleEmbedUrl = `https://docs.google.com/presentation/d/${fileId}/embed`;

//   // const googleEmbedUrl = `https://docs.google.com/presentation/d/${fileId}/embed?start=false&loop=false&slide=${currentSlide}`;
//   const officeEmbedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
//     link
//   )}`;

//   const navigateSlides = (direction) => {
//     setCurrentSlide((prevSlide) => {
//       let newSlide = prevSlide + direction;
//       if (newSlide < 1) newSlide = 1; // Prevent going before the first slide
//       if (newSlide > totalSlides) newSlide = totalSlides; // Prevent exceeding total slides
//       return newSlide;
//     });
//   };

//   return (
//     <>
//       <div>
//         <iframe
//           title="PPT Viewer"
//           src={googleEmbedUrl}
//           style={{ width: "100%", height: "500px", border: "none" }}
//           allow="autoplay; encrypted-media"
//           onError={(e) => {
//             e.target.src = officeEmbedUrl;
//           }}
//         />
//         <p>
//           If the viewer fails to load,{" "}
//           <a href={link} target="_blank" rel="noopener noreferrer">
//             download the PPT file
//           </a>
//           .
//         </p>
//       </div>
//       {/* Controls and Mark as Completed button */}
//       <div className="controls mt-3 d-flex align-items-center justify-content-between">
//         <div>
//           <button
//             className="btn btn-secondary me-2"
//             onClick={() => navigateSlides(-1)}
//             disabled={currentSlide === 1}
//           >
//             Previous
//           </button>
//           <button
//             className="btn btn-secondary"
//             onClick={() => navigateSlides(1)}
//             disabled={currentSlide === totalSlides}
//           >
//             Next
//           </button>
//         </div>
//         {totalSlides && (
//           <span className="slide-count">
//             Slide {currentSlide} of {totalSlides}
//           </span>
//         )}
//         <button
//           className="btn btn-success"
//           onClick={() =>
//             handleMediaEnd(
//               { title: `${data?.title}` },
//               lessonIndex,
//               exerciseIndex
//             )
//           }
//         >
//           Mark as Completed
//         </button>
//       </div>
//     </>
//   );
// };


  // const renderEmbeddedPPT = ({
  //   link,
  //   data,
  //   lessonIndex,
  //   exerciseIndex,
  //   // totalSlides = 10,
  // }) => {
  //   if (typeof link !== "string" || !link.trim()) {
  //     return <p>Error: Invalid or missing link</p>;
  //   }

  //   const fileIdMatch = link.match(/\/d\/([^/]+)/);
  //   const fileId = fileIdMatch ? fileIdMatch[1] : null;

  //   if (!fileId) {
  //     return <p>Error: Unable to extract file ID from the link</p>;
  //   }

  //   const [currentSlide, setCurrentSlide] = useState(1); // State to track the current slide

  //   const googleEmbedUrl = `https://docs.google.com/presentation/d/${fileId}/embed?start=false&loop=false&slide=${currentSlide}`;
  //   const officeEmbedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
  //     link
  //   )}`;

  //   const navigateSlides = (direction) => {
  //     setCurrentSlide((prevSlide) => {
  //       let newSlide = prevSlide + direction;
  //       if (newSlide < 1) newSlide = 1; // Prevent going before the first slide
  //       if (newSlide > totalSlides) newSlide = totalSlides; // Prevent exceeding total slides
  //       return newSlide;
  //     });
  //   };

  //   return (
  //     <>
  //       <div>
  //         <iframe
  //           title="PPT Viewer"
  //           src={googleEmbedUrl}
  //           style={{ width: "100%", height: "500px", border: "none" }}
  //           allow="autoplay; encrypted-media"
  //           onError={(e) => {
  //             e.target.src = officeEmbedUrl;
  //           }}
  //         />
  //         <p>
  //           If the viewer fails to load,{" "}
  //           <a href={link} target="_blank" rel="noopener noreferrer">
  //             download the PPT file
  //           </a>
  //           .
  //         </p>
  //       </div>
  //       {/* Controls and Mark as Completed button */}
  //       <div className="controls mt-3 d-flex align-items-center justify-content-between">
  //         <div>
  //           <button
  //             className="btn btn-secondary me-2"
  //             onClick={() => navigateSlides(-1)}
  //             disabled={currentSlide === 1}
  //           >
  //             Previous
  //           </button>
  //           <button
  //             className="btn btn-secondary"
  //             onClick={() => navigateSlides(1)}
  //             disabled={currentSlide === totalSlides}
  //           >
  //             Next
  //           </button>
  //         </div>
  //         {totalSlides && (
  //           <span className="slide-count">
  //             Slide {currentSlide} of {totalSlides}
  //           </span>
  //         )}
  //         <button
  //           className="btn btn-success"
  //           onClick={() =>
  //             handleMediaEnd(
  //               { title: `${data?.title}` },
  //               lessonIndex,
  //               exerciseIndex
  //             )
  //           }
  //         >
  //           Mark as Completed
  //         </button>
  //       </div>
  //     </>
  //   );
  // };



const renderEmbeddedPPT = (link, data, lessonIndex, exerciseIndex) => {
  const fileIdMatch = link.match(/\/d\/([^/]+)/);
  const fileId = fileIdMatch ? fileIdMatch[1] : null;

  if (!fileId) {
    return <p>Error: Invalid link format</p>;
  }

  // const [currentSlide, setCurrentSlide] = useState(1); // State to track the current slide
  
  // const googleEmbedUrl = `https://docs.google.com/presentation/d/${fileId}/embed?rm=minimal&start=false&loop=false&slide=${currentSlide}`;
  // const officeEmbedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
  //   link
  // )}`;

  const googleEmbedUrl = `https://docs.google.com/presentation/d/${fileId}/embed?rm=minimal&start=false&loop=false&slide=${currentSlide}`;
  const officeEmbedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(link)}`;

  // const fetchSlideCount = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://slides.googleapis.com/v1/presentations/${fileId}`,
  //       {
  //         headers: {
  //           // Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with your access token
  //           Authorization: `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`, // Replace with your access token
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
      
  //     setTotalSlides(data.slides.length);
  //   } catch (error) {
  //     console.error("Error fetching slide count:", error);
  //   }
  // };

  // fetchSlideCount();
  const totalSlides = 10; // Replace with the actual total number of slides in your presentation
  
  const navigateSlides = (direction) => {
    setCurrentSlide((prevSlide) => {
      let newSlide = prevSlide + direction;
      if (newSlide < 1) newSlide = 1; // Prevent going before the first slide
      if (newSlide > totalSlides) newSlide = totalSlides; // Prevent exceeding total slides
      return newSlide;
    });
  };

  return (
    <>
      <div>
        <iframe
          title="PPT Viewer"
          src={googleEmbedUrl}
          style={{ width: "100%", height: "500px", border: "none" }}
          allow="autoplay; encrypted-media"
          onError={(e) => {
            e.target.src = officeEmbedUrl;
          }}
        />
        {/* <p>
          If the viewer fails to load,{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            download the PPT file
          </a>
          .
        </p> */}
      </div>
      {/* Controls and Mark as Completed button */}
      <div className="controls mt-10">
        {/* <button
          className="controlButton"
          onClick={() => navigateSlides(-1)}
          // disabled={currentSlide === 1}
        >
          Previous
        </button>
        <button
          className="controlButton"
          onClick={() => navigateSlides(1)}
          // disabled={currentSlide === totalSlides}
        >
          Next
        </button> */}
        <button
          className="markCompletedButton NextBtn"
          onClick={() =>
            handleMediaEnd(
              { title: `${data?.title}` },
              lessonIndex,
              exerciseIndex
            )
          }
        >
          Mark as Completed
        </button>
      </div>
    </>
  );
};





  const renderContent = (
    link,
    typeManual,
    data,
    lessonIndex,
    exerciseIndex
  ) => {
    if (typeManual === "video") {
      return (
        <div className="">
          <div className="embed-responsive-item">
            {/* <iframe
            title={currentCourseData.title || "Video Title"}
            className="embed-responsive-item"
            sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
            src={`https://player.vimeo.com/video/${link.split("/").pop()}`}
            style={{ width: "100%", height: "100%" }}
            allow="autoplay; encrypted-media"
            ></iframe> */}

            <ReactPlayer
              title={currentCourseData.title || "Video Title"}
              // className="embed-responsive-item"
              url={`https://player.vimeo.com/video/${link.split("/").pop()}`}
              // style={{ width: "100%", height: "100%" }}
              onEnded={() => {
                handleMediaEnd(data, lessonIndex, exerciseIndex);
              }}
              controls
            />
          </div>
        </div>
      );
    } else if (typeManual === "ppt") {
      // const fileId = link.split("/d/")[1].split("/")[0];
      // const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      // return (
      //   <div>
      //     <iframe
      //       title="PPT"
      //       className="embed-responsive-item"
      //       src={embedUrl}
      //       style={{ width: "100%", height: "100%" }}
      //       allow="autoplay; encrypted-media"
      //     ></iframe>
      //   </div>
      // );
      return renderEmbeddedPPT(link);
    }
  };

  const calculateProgress = () => {
    const totalExercises = courseData.lessons?.reduce(
      (total, lesson) => total + lesson.chapter?.length,
      0
    );
    const progress =
      totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

    localStorage.setItem(`courseProgress-${courseId}`, progress);

    return progress;
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (fetchError) {
    return <ErrorDataFetchOverlay />;
  }

  return (
    <div className="courseContentContainer">
      <div className="row firstRow g-0">
        <div className="courseContentHeader">
          <button className="BackBtn" onClick={() => navigate(-1)}>
            Back
          </button>
          <div className="courseHeading">
            {truncateText(courseData.title, 45)}
          </div>
          <button className="NextBtn" onClick={() => handleNext()}>
            Next
          </button>
        </div>
        <div className="courseContentProgressBar">
          <ProgressBar progress={calculateProgress()} />
        </div>{" "}
      </div>
      <div className="row secondRow">
      {/* <div className="col-md-8 pdy">
      <div className="videoBox">
        <div className="embed-responsive embed-responsive-16by9">
          {courseData?.lessons.length > 0 &&
            renderContent(
              !currentCourseData.link
                ? courseData.videoUrl
                : currentCourseData.link,
              !currentCourseData.link ? "video" : currentCourseData.type
            )}
        </div>
        <div>
          <div className="infoBox">
            <h1>{courseData.title}</h1>
            {courseData.lessons && courseData.lessons.length > 0 && (
              <div className="lessonDescriptionBox">
                <h3 className="lessonDescriptionBoxTitle">
                  {!currentCourseData.title
                    ? ""
                    : `${currentCourseData.lessonNo}.${currentCourseData.excerciseNo}`}{" "}
                  {!currentCourseData.title
                    ? courseData.lessons[0].title
                    : currentCourseData.title}
                </h3>
                <p className="lessonDescriptionBoxDescription">
                  {!currentCourseData.notes
                    ? courseData.lessons[0].description
                    : currentCourseData.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleShowModal}>
          Review
        </button>
      </div>
    </div> */}
      <CourseReview courseData={courseData} currentCourseData={currentCourseData} renderContent={renderContent} />

        <div className="col-md-4 CCaccordianBox">
          <Accordion activeKey={activeAccordion} onSelect={handleLessonClick}>
            {courseData?.lessons &&
              courseData.lessons?.map((lesson, index) => {
                const lessonCompleted = lesson.chapter?.every((_, vidIndex) =>
                  completedExercises.has(`${index}-${vidIndex}`)
                );

                return (
                  <Accordion.Item key={index} eventKey={index}>
                    <Accordion.Header
                      onClick={() => handleLessonClick(index)}
                      className={
                        !currentCourseData.title
                          ? ""
                          : `${
                              currentCourseData.lessonNo === index + 1
                                ? "accr-btn-active"
                                : ""
                            }`
                      }
                    >
                      <div className="CClesson-meta">
                        <div className="CClesson-title">
                          <div>
                            {index + 1}&nbsp;.&nbsp;{lesson.title}
                          </div>

                          {lessonCompleted && (
                            <img
                              className="content-watched"
                              src={tick}
                              alt="watched"
                            />
                          )}
                        </div>
                        <span className="lesson-duration">
                          Duration : {calculateTotalDuration(lesson?.chapter)}{" "}
                          &nbsp; /&nbsp;
                        </span>

                        <span>Total Content : {lesson.chapter?.length}</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <ul className="list-group">
                          {lesson.chapter?.map((video, vidIndex) => (
                            <li
                              key={vidIndex}
                              className={`list-group-item
             ${
               currentCourseData.title === video.title
                 ? "list-group-item-active"
                 : ""
             }
                  ${
                    completedExercises.has(`${index}-${vidIndex}`)
                      ? "completedLesson"
                      : ""
                  }`}
                              onClick={() =>
                                handleCurrentContent(video, index, vidIndex)
                              }
                            >
                              <span className="video-number">
                                {/* <a href={video.link}>
                                  {`${index + 1}.${vidIndex + 1}`}&nbsp;
                                  {video.title}
                                </a> */}
                                <div>
                                  {`${index + 1}.${vidIndex + 1}`}&nbsp;
                                  {video.title}
                                </div>

                                {completedExercises.has(
                                  `${index}-${vidIndex}`
                                ) && (
                                  <img
                                    className="content-watched"
                                    src={tick}
                                    alt="watched"
                                  />
                                )}
                              </span>
                              {video?.type === "video" ? (
                                <span className="lesson-duration">
                                  Duration :{" "}
                                  {convertToReadableDuration(video.duration)}
                                </span>
                              ) : (
                                <span className="lesson-duration">
                                  Type : {video?.type}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                        {lesson.testId && (
                          <div className="testButtonBox">
                            <div className="testButtonInr">
                              <div className="testButtonTxt">
                                Take a Test to Confirm Your Understanding
                              </div>

                              <button
                                className="testButton"
                                onClick={() =>
                                  navigate(
                                    `/home/tests/${lesson.testId}/user/${userId}`
                                  )
                                }
                              >
                                Take Test
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
