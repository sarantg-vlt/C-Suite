import React, { useEffect, useState } from "react";

import Trash from "../../Assets/Images/trash.png";
import EditImg from "../../Assets/Images/edit.png";

import Nolesson from "../../Assets/Images/no-lesson-illustration.svg";
import BackIcon from "../../Assets/Images/left-arrow.png";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCourse, updateCourse } from "../../../api/baseApi";
import NewLesson from "../new-course/NewLesson";
import { convertToCourseFormData } from "../../../hooks/newCourseFunctions";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const Edit = ({ courseDetails }) => {
    // State for "What You Get" section
const [currentWhatYouGet, setWhatYouGet] = useState([]);
const [currentGet, setCurrentGet] = useState({ title: "", description: "" });
const [editIndexGet, setEditIndexGet] = useState(null);

// State for "Who Is This For" section
const [whoIsThisFor, setWhoIsThisFor] = useState([]);
const [currentWho, setCurrentWho] = useState({ text: "" });
const [editIndexWho, setEditIndexWho] = useState(null);

// Handle input change for "What You Get"
const handleWhatYouGetInput = (key, value) => {
  setCurrentGet({ ...currentGet, [key]: value });
};

// Handle input change for "Who Is This For"
const handleWhoIsThisForInput = (value) => {
  setCurrentWho({ text: value });
};

const handleAddWhoIsThisFor = (event) => {
  event.preventDefault();
  if (currentWho.text) {
    const newWhoIsThisFor = [...courseData.whoIsThisFor]; // Clone existing array

    if (editIndexWho !== null) {
      newWhoIsThisFor[editIndexWho] = { text: currentWho.text };
    } else {
      newWhoIsThisFor.push({ text: currentWho.text });
    }

    setCourseData({ ...courseData, whoIsThisFor: newWhoIsThisFor }); // Update state

    setCurrentWho({ text: "" });
    setEditIndexWho(null);
  }
};

// Remove "What You Get"
const handleRemoveWhatYouGet = (index) => {
  setWhatYouGet(currentWhatYouGet.filter((_, i) => i !== index));
};

const handleRemoveWhoIsThisFor = (index) => {
  const updatedList = courseData.whoIsThisFor.filter((_, i) => i !== index);
  setCourseData({ ...courseData, whoIsThisFor: updatedList });
};


// Set edit values for "What You Get"
const setEditValuesGet = (item, index) => {
  setCurrentGet(item);
  setEditIndexGet(index);
};

// Set edit values for "Who Is This For"
const setEditValuesWho = (item, index) => {
  setCurrentWho(item);
  setEditIndexWho(index);
};

const addNewWhatYouGet = () => {
  if (currentGet.title && currentGet.description) {
    const newWhatYouGet = [...courseData.whatYouGet]; // Clone the existing array

    if (editIndexGet === null) {
      newWhatYouGet.push({
        title: currentGet.title,
        description: currentGet.description,
      });
    } else {
      newWhatYouGet[editIndexGet] = {
        title: currentGet.title,
        description: currentGet.description,
      };
    }

    setCourseData({ ...courseData, whatYouGet: newWhatYouGet });

    setCurrentGet({ title: "", description: "" });
    setEditIndexGet(null);
  }
};

const addNewWhoIsThisFor = () => {
  if (currentWho.text) {
    const newWhoIsThisFor = [...courseData.whoIsThisFor]; // Clone the existing array

    if (editIndexWho === null) {
      newWhoIsThisFor.push({
        text: currentWho.text,
      });
    } else {
      newWhoIsThisFor[editIndexWho] = {
        text: currentWho.text,
      };
    }

    setCourseData({ ...courseData, whoIsThisFor: newWhoIsThisFor });

    setCurrentWho({ text: "" });
    setEditIndexWho(null);
  }
};
;
      
     
      
    

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
   
      try {
        const courseFormData = convertToCourseFormData(courseData);
        const data = await axios.put(
          `${apiBaseUrl}/courseDetail/edit/${id}`,
          courseFormData
        );
        console.log(data);
        navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    
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

                {/* new */}
                {/* new  */}

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

<div className="course-description-cnt">
  <p>What You Get?</p>
  {editCourse && (
    <div className="overview-input-cnt">
      <input
        type="text"
        className="name-input"
        readOnly={!editCourse}
        value={currentGet.title}
        placeholder="Title"
        onChange={(e) => handleWhatYouGetInput("title", e.target.value)}
      />
      <textarea
        className="overview-input name-input"
        placeholder="Description"
        readOnly={!editCourse}
        value={currentGet.description}
        onChange={(e) => handleWhatYouGetInput("description", e.target.value)}
      />
      <div className="overview-add-btn" onClick={() => addNewWhatYouGet()}>
        <p>Add</p>
      </div>
    </div>
  )}
  {courseData?.whatYouGet?.map((whatYouGet, index) => (
    <div className="overviewPoint-cnt" key={index}>
      <div className="overview-head-cnt">
        <p className="overviewPoint-heading">{whatYouGet?.title}</p>
        {editCourse && (
          <div className="action-btn-cnt-overview">
            <img
              src={Trash}
              alt="delete"
              className="action-img-overview"
              onClick={() => handleRemoveWhatYouGet(index)}
            />
            <img
              src={EditImg}
              alt="edit"
              className="action-img-overview"
              onClick={() => setEditValuesGet(whatYouGet, index)}
            />
          </div>
        )}
      </div>
      <p className="overviewPoint-content">{whatYouGet?.description}</p>
    </div>
  ))}
</div>

<div className="course-description-cnt">
    <p>Who Is This For?</p>
    {editCourse && (
      <div className="overview-input-cnt">
        <input
          type="text"
          className="name-input"
          readOnly={!editCourse}
          value={currentWho.text}
          placeholder="Enter content"
          onChange={(e) => handleWhoIsThisForInput(e.target.value)}
        />
        <div className="overview-add-btn" onClick={handleAddWhoIsThisFor}>
          <p>Add</p>
        </div>
      </div>
    )}
   {courseData?.whoIsThisFor?.map((who, index) => (
  <div className="overviewPoint-cnt" key={index}>
    <div className="overview-head-cnt">
      <p className="overviewPoint-heading">{who.text}</p>
      {editCourse && (
        <div className="action-btn-cnt-overview">
          <img
            src={Trash}
            alt="delete"
            className="action-img-overview"
            onClick={() => handleRemoveWhoIsThisFor(index)}
          />
          <img
            src={EditImg}
            alt="edit"
            className="action-img-overview"
            onClick={() => setEditValuesWho(who, index)}
          />
        </div>
      )}
    </div>
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








