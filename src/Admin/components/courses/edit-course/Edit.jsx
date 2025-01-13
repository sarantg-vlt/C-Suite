import React, { useEffect, useState } from "react";
// import Nolesson from "../../Assets/Images/no-lesson-illustration.svg";
import Trash from "../../Assets/Images/trash.png";
import EditImg from "../../Assets/Images/edit.png";
// import TestData from "../../Assets/Data/courseContent.json";
import Nolesson from "../../Assets/Images/no-lesson-illustration.svg";
import BackIcon from "../../Assets/Images/left-arrow.png";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCourse, updateCourse } from "../../../api/baseApi";
import NewLesson from "../new-course/NewLesson";
import { convertToCourseFormData } from "../../../hooks/newCourseFunctions";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const Edit = ({ courseDetails }) => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [popupOpen, setPopupOpen] = useState({ open: false, data: null });
  const [editCourse, setEditCourse] = useState(false);
  const [currentOverview, setCurrentOverview] = useState({
    heading: "",
    content: "",
    updateIndex: null,
  });

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: null,
    thumbnail: null,
    overviewPoints: [],
    lessons: [],
  });

  useEffect(() => {
    if (popupOpen) window.scrollTo(0, 0);
  }, [popupOpen]);

  useEffect(() => {
    setCourseData(courseDetails);
  }, [courseDetails]);

  const handledirectInput = (type, value) => {
    if (type === "price") {
      // Ensure price is stored as a number
      const numericValue = parseFloat(value);
      setCourseData({ ...courseData, [type]: isNaN(numericValue) ? "" : numericValue });
    } else {
      setCourseData({ ...courseData, [type]: value });
    }
  };
  const handleOverviewInput = (type, value) => {
    setCurrentOverview({ ...currentOverview, [type]: value });
  };

  const addNewOverview = () => {
    if (currentOverview.heading && currentOverview.content) {
      const newOverview = courseData.overviewPoints;
      if (
        currentOverview.updateIndex === null ||
        currentOverview.updateIndex === undefined
      ) {
        newOverview.push({
          ...currentOverview,
          updateIndex: newOverview.length > 0 ? newOverview?.length : 0,
        });
        setCourseData({ ...courseData, overviewPoints: newOverview });
      } else {
        newOverview[currentOverview?.updateIndex] = currentOverview;
        setCourseData({ ...courseData, overviewPoints: newOverview });
      }
      setCurrentOverview({
        heading: "",
        content: "",
        updateIndex: null,
      });
    }
  };
  
  const addLessontoCourse = (lesson) => {
    console.log("lesson", lesson);
    const newLessons = [...courseData.lessons];
    if (lesson?.updateIndex === null || lesson?.updateIndex === undefined) {
      newLessons.push({
        ...lesson,
        updateIndex: newLessons?.length > 0 ? newLessons?.length : 0,
      });
      setCourseData({ ...courseData, lessons: newLessons });
    } else {
      newLessons[lesson.updateIndex] = lesson;
      setCourseData({ ...courseData, lessons: newLessons });
    }
    setPopupOpen({ open: false });
  };

  const uploadCourse = async () => {
    // if (
  // // //     // courseData.title &&
  // // //     // courseData.description &&
  // // //     // courseData.lessons.length > 0 &&
  // // //     // courseData.price &&
  // // //     // courseData.thumbnail
  //     courseData.title &&
  // courseData.description &&
  // courseData.lessons.length > 0 &&
  // // courseData.price !== null && 
  // courseData.price &&
  // // (courseData.price !== null && !isNaN(courseData.price)) &&
  // courseData.thumbnail
  //   ) {
      try {
        const courseFormData = convertToCourseFormData(courseData);
        // const data = await updateCourse(id, { courseFormData });
        // const {data} = await axios()
        const data = await axios.put(
          `${apiBaseUrl}/courseDetail/edit/${id}`,
          courseFormData
        );
        console.log(data);
        navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    // } else {
    //   window.alert(
    //     "This course is not valid add at least on lesson and fill other details"
    //   );
    // }
  };

  console.log(courseData);
  

  const deleteThisCourse = async () => {
    const confirm = window.confirm(
      "Confirm to delete this course. All lessons associated will be lost."
    );
    if (confirm) {
      try {
        const res = await deleteCourse(courseDetails._id);
        if (res) {
          // Navigate only after a successful deletion
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  const handleRemoveOverview = (index) => {
    const newOverviews = [...courseData?.overviewPoints];
    newOverviews.splice(index, 1);
    setCourseData({ ...courseData, overviewPoints: newOverviews });
  };

  const removeLessonFromCourse = (lesson) => {
    const newLessons = [...courseData.lessons];
    newLessons.splice(lesson.updateIndex, 1);
    console.log(newLessons)
    setCourseData({...courseData, lessons: newLessons });
  }

  const openEditLesson = (lesson, index) => {
    lesson.updateIndex = index;
    setPopupOpen({ open: true, data: lesson });
  };

  const setEditValues = (overview, index) => {
    overview.updateIndex = index;
    setCurrentOverview(overview);
  };

  console.log(courseData);
  return (
    <div
      className="course-list-cnt new-course"
      style={{
        // height:  popupOpen ? "100vh" :"auto",
        overflow: popupOpen ? "hidden" : "scroll",
      }}
    >
      <div className="top-header-cnt">
        <div className="back-btn" onClick={() => navigate("/admin")}>
          <img src={BackIcon} alt="back" className="back-icon-img" />
        </div>
        {editCourse ? (
          <div className="top-btn-cnt">
            <div
              className=" course-delete-btn "
              onClick={() => setEditCourse(false)}
            >
              Cancel Edit
            </div>
            <div className="add-new-lesson-btn" onClick={uploadCourse}>
              Update Course
            </div>
          </div>
        ) : (
          <div className="top-btn-cnt">
            <div
              className=" course-delete-btn "
              onClick={() => deleteThisCourse()}
            >
              Delete Course
            </div>
            <div
              className="add-new-lesson-btn"
              onClick={() => setEditCourse(true)}
            >
              Edit Course
            </div>
          </div>
        )}
      </div>
      <div className="top-header-cnt">
        <div>
          <h3 className="course-new-title">Course Details</h3>
          <p className="course-new-discription">Edit course and publish</p>
        </div>
        {/* <div className="top-btn-cnt">
          <div className=" course-delete-btn " onClick={() => navigate("/")}>
            Cancel
          </div>
          <div className="add-new-lesson-btn" onClick={() => uploadCourse()}>
            Save Course
          </div>
        </div> */}
      </div>
      <div className="input-split-cover">
        <form className="left-form">
          <div className="course-name-cnt">
            <p>Enter course Name</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input"
              value={courseData.title}
              readOnly={editCourse ? false : true}
              onChange={(e) => handledirectInput("title", e.target.value)}
            />
          </div>

          <div className="course-description-cnt">
            <p>Describe course</p>
            <textarea
              type="text"
              name=""
              id=""
              className="description-input"
              readOnly={editCourse ? false : true}
              value={courseData.description}
              onChange={(e) => handledirectInput("description", e.target.value)}
            />
          </div>
          <div className="flex-input">
            <div className="course-name-cnt responsive-input">
              <p>Enter course price</p>
              <input
                type="number"
                name=""
                id=""
                readOnly={editCourse ? false : true}
                // value={courseData.price !== null && !isNaN(courseData.price) ? courseData.price : ""}
                // value={courseData.price !== null ? courseData.price : ""}
                value={courseData.price || ""}
                className="name-input price-input"
                placeholder="₹"
                onChange={(e) => handledirectInput("price", e.target.value)}
              />
            </div>
            <div className="course-name-cnt">
              <p>Upload course thumbnail</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setCourseData({ ...courseData, thumbnail: e.target.files[0] })
                }
                className="styled-input"
              />
            </div>
          </div>
          <div className="course-description-cnt">
            <p>OverviewPoints</p>
            {editCourse && (
              <div className="overview-input-cnt">
                <input
                  type="text"
                  name=""
                  id=""
                  className="name-input"
                  readOnly={editCourse ? false : true}
                  value={currentOverview.heading}
                  placeholder="Heading"
                  onChange={(e) =>
                    handleOverviewInput("heading", e.target.value)
                  }
                />
                <textarea
                  type="text"
                  name=""
                  id=""
                  className=" overview-input name-input"
                  placeholder="Description"
                  readOnly={editCourse ? false : true}
                  value={currentOverview.content}
                  onChange={(e) =>
                    handleOverviewInput("content", e.target.value)
                  }
                />
                <div
                  className="overview-add-btn"
                  onClick={() => addNewOverview()}
                >
                  <p>Add</p>
                </div>
              </div>
            )}
            {courseData?.overviewPoints?.map((overview, index) => (
              <div className="overviewPoint-cnt" key={index}>
                <div className="overview-head-cnt">
                  <p className="overviewPoint-heading">{overview?.heading}</p>
                  {editCourse && (
                    <div className="action-btn-cnt-overview">
                      <img
                        src={Trash}
                        alt="delete"
                        className="action-img-overview"
                        onClick={() => handleRemoveOverview(index)}
                      />
                      <img
                        src={EditImg}
                        alt="edit"
                        className="action-img-overview"
                        onClick={() => setEditValues(overview, index)}
                        // onClick={() => openEdit()}
                      />
                    </div>
                  )}
                </div>
                <p className="overviewPoint-content">{overview?.content}</p>
              </div>
            ))}
          </div>
        </form>
        <form className="form-right">
          <div className="form-right-header">
            <h3 className="course-new-title form-right-heading">
              List The Lessons
            </h3>
            {editCourse && (
              <div
                className="add-new-lesson-btn"
                onClick={() => setPopupOpen({ open: true, data: null })}
              >
                Add new lesson{" "}
              </div>
            )}
          </div>
          <div className="lesson-list-cnt">
            {courseData.lessons?.length > 0 ? (
              courseData?.lessons?.map((lesson, index) => (
                <div
                  className="lesson"
                  style={{ pointerEvents: editCourse ? "all" : "none" }}
                  onClick={() => openEditLesson(lesson, index)}
                >
                  <h1 className="lesson-number">{index + 1}</h1>
                  <div className="lesson-title-cnt">
                    <h3 className="lesson-title">{lesson?.title}</h3>
                  </div>
                  <ul className="lesson-subtitle-cnt">
                    {lesson?.chapter?.map((video) => (
                      <li>
                        <p className="lesson-subtitle">{video?.title}</p>
                        <p className="lesson-duration-txt">
                          duration : {video?.duration}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="no-lesson-cnt">
                <img
                  src={Nolesson}
                  alt="no-lesson"
                  className="empty-lesson-img"
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {popupOpen.open && (
        <NewLesson
          addLesson={(lesson) => addLessontoCourse(lesson)}
          editData={popupOpen?.data}
          cancel={() => setPopupOpen({ open: false, data: null })}
          removeThisLesson={(lesson) => removeLessonFromCourse(lesson)}
        />
      )}
    </div>
  );
};

export default Edit;




// import React, { useEffect, useState } from "react";
// import Trash from "../../Assets/Images/trash.png";
// import EditImg from "../../Assets/Images/edit.png";
// import Nolesson from "../../Assets/Images/no-lesson-illustration.svg";
// import BackIcon from "../../Assets/Images/left-arrow.png";
// import { useNavigate, useParams } from "react-router-dom";
// import { deleteCourse, updateCourse } from "../../../api/baseApi";
// import NewLesson from "../new-course/NewLesson";
// import { convertToCourseFormData } from "../../../hooks/newCourseFunctions";

// const Edit = ({ courseDetails }) => {
//   const { id } = useParams()
//   console.log(id);
  
//   const [popupOpen, setPopupOpen] = useState({ open: false, data: null });
//   const [editCourse, setEditCourse] = useState(false);
//   const [currentOverview, setCurrentOverview] = useState({
//     heading: "",
//     content: "",
//     updateIndex: null,
//   });
//   const [courseData, setCourseData] = useState({
//     title: "",
//     description: "",
//     price: null,
//     thumbnail: null,
//     overviewPoints: [],
//     lessons: [],
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (popupOpen.open) window.scrollTo(0, 0);
//   }, [popupOpen]);

//   useEffect(() => {
//     setCourseData(courseDetails);
//   }, [courseDetails]);

//   const handledirectInput = (type, value) => {
//     setCourseData({ ...courseData, [type]: value });
//   };

//   const handleOverviewInput = (type, value) => {
//     setCurrentOverview({ ...currentOverview, [type]: value });
//   };

//   const addNewOverview = () => {
//     if (currentOverview.heading && currentOverview.content) {
//       const updatedOverviews = [...courseData.overviewPoints];
//       if (currentOverview.updateIndex === null) {
//         updatedOverviews.push({
//           ...currentOverview,
//           updateIndex: updatedOverviews.length,
//         });
//       } else {
//         updatedOverviews[currentOverview.updateIndex] = currentOverview;
//       }
//       setCourseData({ ...courseData, overviewPoints: updatedOverviews });
//       setCurrentOverview({ heading: "", content: "", updateIndex: null });
//     }
//   };

//   const addLessontoCourse = (lesson) => {
//     const updatedLessons = [...courseData.lessons];
//     if (lesson.updateIndex === null) {
//       updatedLessons.push({ ...lesson, updateIndex: updatedLessons.length });
//     } else {
//       updatedLessons[lesson.updateIndex] = lesson;
//     }
//     setCourseData({ ...courseData, lessons: updatedLessons });
//     setPopupOpen({ open: false });
//   };

//   const uploadCourse = async () => {
//     if (
//       courseData.title &&
//       courseData.description &&
//       courseData.lessons.length > 0 &&
//       courseData.price &&
//       courseData.thumbnail
//     ) {
//       try {
//         const courseFormData = convertToCourseFormData(courseData);
//         const response = await updateCourse(courseFormData);
//         console.log(response);
//         navigate("/admin");
//       } catch (error) {
//         console.error("Error updating course:", error);
//       }
//     } else {
//       alert("Please fill in all details and add at least one lesson.");
//     }
//   };

//   const deleteThisCourse = async () => {
//     if (
//       window.confirm("Confirm to delete this course. All lessons will be lost.")
//     ) {
//       try {
//         const response = await deleteCourse(courseDetails._id);
//         if (response) navigate("/admin");
//       } catch (error) {
//         console.error("Error deleting course:", error);
//       }
//     }
//   };

//   const handleRemoveOverview = (index) => {
//     const updatedOverviews = courseData.overviewPoints.filter(
//       (_, i) => i !== index
//     );
//     setCourseData({ ...courseData, overviewPoints: updatedOverviews });
//   };

//   const removeLessonFromCourse = (lesson) => {
//     const updatedLessons = courseData.lessons.filter(
//       (_, i) => i !== lesson.updateIndex
//     );
//     setCourseData({ ...courseData, lessons: updatedLessons });
//   };

//   const openEditLesson = (lesson, index) => {
//     setPopupOpen({ open: true, data: { ...lesson, updateIndex: index } });
//   };

//   const setEditValues = (overview, index) => {
//     setCurrentOverview({ ...overview, updateIndex: index });
//   };

//   return (
//     <div
//       className="course-list-cnt new-course"
//       style={{ overflow: popupOpen.open ? "hidden" : "scroll" }}
//     >
//       <div className="top-header-cnt">
//         <div className="back-btn" onClick={() => navigate("/admin")}>
//           <img src={BackIcon} alt="Back" className="back-icon-img" />
//         </div>
//         <div className="top-btn-cnt">
//           {editCourse ? (
//             <>
//               <div
//                 className="course-delete-btn"
//                 onClick={() => setEditCourse(false)}
//               >
//                 Cancel Edit
//               </div>
//               <div className="add-new-lesson-btn" onClick={uploadCourse}>
//                 Update Course
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="course-delete-btn" onClick={deleteThisCourse}>
//                 Delete Course
//               </div>
//               <div
//                 className="add-new-lesson-btn"
//                 onClick={() => setEditCourse(true)}
//               >
//                 Edit Course
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="input-split-cover">
//         <form className="left-form">
//           {/* Course Details */}
//           <div className="course-name-cnt">
//             <p>Course Name</p>
//             <input
//               type="text"
//               value={courseData.title}
//               className="name-input"
//               readOnly={!editCourse}
//               onChange={(e) => handledirectInput("title", e.target.value)}
//             />
//           </div>

//           <div className="course-description-cnt">
//             <p>Course Description</p>
//             <textarea
//               value={courseData.description}
//               className="description-input"
//               readOnly={!editCourse}
//               onChange={(e) => handledirectInput("description", e.target.value)}
//             />
//           </div>

//           <div className="flex-input">
//             <div className="course-name-cnt responsive-input">
//               <p>Course Price (₹)</p>
//               <input
//                 type="number"
//                 value={courseData.price || ""}
//                 className="name-input price-input"
//                 placeholder="₹"
//                 readOnly={!editCourse}
//                 onChange={(e) => handledirectInput("price", e.target.value)}
//               />
//             </div>
//             <div className="course-name-cnt">
//               <p>Thumbnail</p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="styled-input"
//                 onChange={(e) =>
//                   setCourseData({ ...courseData, thumbnail: e.target.files[0] })
//                 }
//               />
//             </div>
//           </div>

//           {/* Overview Points */}
//           <div className="course-description-cnt">
//             <p>Overview Points</p>
//             {editCourse && (
//               <div className="overview-input-cnt">
//                 <input
//                   type="text"
//                   placeholder="Heading"
//                   className="name-input"
//                   value={currentOverview.heading}
//                   onChange={(e) =>
//                     handleOverviewInput("heading", e.target.value)
//                   }
//                 />
//                 <textarea
//                   placeholder="Description"
//                   className="overview-input name-input"
//                   value={currentOverview.content}
//                   onChange={(e) =>
//                     handleOverviewInput("content", e.target.value)
//                   }
//                 />
//                 <div className="overview-add-btn" onClick={addNewOverview}>
//                   Add
//                 </div>
//               </div>
//             )}
//             {courseData.overviewPoints.map((overview, index) => (
//               <div className="overviewPoint-cnt" key={index}>
//                 <div className="overview-head-cnt">
//                   <p className="overviewPoint-heading">{overview.heading}</p>
//                   {editCourse && (
//                     <div className="action-btn-cnt-overview">
//                       <img
//                         src={Trash}
//                         alt="Delete"
//                         className="action-img-overview"
//                         onClick={() => handleRemoveOverview(index)}
//                       />
//                       <img
//                         src={EditImg}
//                         alt="Edit"
//                         className="action-img-overview"
//                         onClick={() => setEditValues(overview, index)}
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <p className="overviewPoint-content">{overview.content}</p>
//               </div>
//             ))}
//           </div>
//         </form>

//         {/* Lesson Section */}
//         <form className="form-right">
//           <div className="form-right-header">
//             <h3 className="course-new-title form-right-heading">
//               List The Lessons
//             </h3>
//             {editCourse && (
//               <div
//                 className="add-new-lesson-btn"
//                 onClick={() => setPopupOpen({ open: true, data: null })}
//               >
//                 Add New Lesson
//               </div>
//             )}
//           </div>
//           <div className="lesson-list-cnt">
//             {courseData.lessons.length > 0 ? (
//               courseData.lessons.map((lesson, index) => (
//                 <div
//                   key={index}
//                   className="lesson"
//                   style={{ pointerEvents: editCourse ? "all" : "none" }}
//                   onClick={() => openEditLesson(lesson, index)}
//                 >
//                   <h1 className="lesson-number">{index + 1}</h1>
//                   <div className="lesson-title-cnt">
//                     <h3 className="lesson-title">{lesson.title}</h3>
//                   </div>
//                   <ul className="lesson-subtitle-cnt">
//                     {lesson.chapter.map((video, idx) => (
//                       <li key={idx}>
//                         <p className="lesson-subtitle">{video.title}</p>
//                         <p className="lesson-duration-txt">
//                           Duration: {video.duration}
//                         </p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))
//             ) : (
//               <div className="no-lesson-cnt">
//                 <img
//                   src={Nolesson}
//                   alt="No Lessons"
//                   className="empty-lesson-img"
//                 />
//               </div>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Lesson Popup */}
//       {popupOpen.open && (
//         <NewLesson
//           addLesson={addLessontoCourse}
//           editData={popupOpen.data}
//           cancel={() => setPopupOpen({ open: false, data: null })}
//           removeThisLesson={removeLessonFromCourse}
//         />
//       )}
//     </div>
//   );
// };

// export default Edit;
