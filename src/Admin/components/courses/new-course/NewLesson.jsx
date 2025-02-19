import React, { useEffect, useState } from "react";
import Trash from "../../Assets/Images/trash.png";
import Edit from "../../Assets/Images/edit.png";
import Test from "../../Assets/Images/exam.png";
import AddTest from "./AddTest";
import { uploadDocument, uploadVideo } from "../../../api/baseApi"; // Ensure the correct function name is imported

import { findFileType } from "../../../hooks/newCourseFunctions";
import BackIcon from "../../Assets/Images/left-arrow.png";

const NewLesson = ({ addLesson, cancel, editData, removeThisLesson }) => {
  const [openTest, setOpenTest] = useState({ open: false, data: null });
  const [errors, setErrors] = useState({});
  const [uploadingFile, setUploadingFile] = useState(false);

  const [currentLesson, setCurrentLesson] = useState({
    title: null,
    chapter: [],
    test: null,
    updateIndex: null,
    description: "test-description",
  });

  const [currentSublesson, setCurrentSublesson] = useState({
    title: "",
    duration: "",
    link: "#",
    updateIndex: null,
    type: null,
  });

  const [sublessonFile, setSublessonFile] = useState(null);

  useEffect(() => {
    if (editData) setCurrentLesson(editData);
  }, [editData]);

  const handleAddFile = (file) => {
    const filetype = findFileType(file);
    setSublessonFile(file);
    setCurrentSublesson({ ...currentSublesson, type: filetype });
    setErrors((prev) => ({ ...prev, file: null }));
  };

  const handleSubLessonsInput = (type, value) => {
    setCurrentSublesson({ ...currentSublesson, [type]: value });
    setErrors((prev) => ({ ...prev, [type]: null }));
  };

  const uploadFile = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append(type === "video" ? "video" : "document", file);

      const { data, error } = await (type === "video"
        ? uploadVideo(formData)
        : uploadDocument(formData));

      if (error) throw new Error(error);

      return data.url || data.videoUrl;
    } catch (error) {
      throw new Error(`Failed to upload ${type}: ${error.message}`);
    }
  };

  const addSublessons = async () => {
    try {
      setUploadingFile(true);
      setErrors({});

      // Validate inputs
      if (!currentSublesson.title) {
        setErrors((prev) => ({ ...prev, title: "Title is required" }));
        return;
      }
      if (!currentSublesson.duration) {
        setErrors((prev) => ({ ...prev, duration: "Duration is required" }));
        return;
      }
      if (!sublessonFile && currentSublesson.link === "#") {
        setErrors((prev) => ({ ...prev, file: "File is required" }));
        return;
      }

      const newLessons = [...currentLesson.chapter];

      if (sublessonFile) {
        const Link = await uploadFile(
          sublessonFile,
          currentSublesson.type === "video" ? "video" : "document"
        );

        if (currentSublesson.updateIndex === null) {
          newLessons.push({ ...currentSublesson, link: Link });
        } else {
          newLessons[currentSublesson.updateIndex] = {
            ...currentSublesson,
            link: Link,
          };
        }
      } else if (currentSublesson.link !== "#") {
        newLessons[currentSublesson.updateIndex] = currentSublesson;
      }

      setCurrentLesson({ ...currentLesson, chapter: newLessons });
      setSublessonFile(null);
      setCurrentSublesson({
        title: "",
        duration: "",
        link: "#",
        updateIndex: null,
        type: null,
      });
    } catch (error) {
      setErrors((prev) => ({ ...prev, submit: error.message }));
    } finally {
      setUploadingFile(false);
    }
  };

  const validateAndUpdateLesson = () => {
    if (currentLesson.title && currentLesson.chapter.length > 0) {
      addLesson(currentLesson);
    }
  };

  const setEditSublesson = (chapter, index) => {
    setCurrentSublesson({ ...chapter, updateIndex: index });
  };

  const handleRemoveSublesson = (index) => {
    const newsubLessons = [...currentLesson.chapter];
    newsubLessons.splice(index, 1);
    setCurrentLesson({ ...currentLesson, chapter: newsubLessons });
  };

  console.log(editData);

  useEffect(() => {
    if (editData) setCurrentLesson(editData);
  }, [editData]);

  const handleDelete = () => {
    const confirm = window.confirm(
      "Confirm to delete this lesson, all subLessons will be deleted"
    );
    console.log(editData?.title);
    if (confirm) {
      removeThisLesson(editData);
      cancel();
    }
  };

  return (
    <div className="lesson-popup-cnt">
      <div className="lesson-new-cnt">
        {openTest.open && (
          <AddTest
            testId={currentLesson?.test}
            addTest={(data) => {
              setCurrentLesson({ ...currentLesson, test: data });
            }}
            closeTest={() => setOpenTest({ open: false })}
          />
        )}
        <div className="form-right-header">
          <div className="back-btn" onClick={() => cancel()}>
            <img src={BackIcon} alt="back" className="back-icon-img" />
          </div>
          <div className="top-btn-cnt">
            {editData && (
              <div
                className="add-new-lesson-btn cancel-btn"
                onClick={() => handleDelete()}
              >
                Delete Lesson
              </div>
            )}
            <div
              className="add-new-lesson-btn"
              onClick={() => validateAndUpdateLesson()}
            >
              {editData?.updateIndex ? "Add to Course" : " Update Course"}
            </div>
          </div>
        </div>
        <h3 className="course-new-title form-right-heading">
          Create New Lesson
        </h3>
        <div className="new-lesson-top">
          <div className="lesson-name-cnt">
            <p>Lesson Title</p>
            <input
              type="text"
              name=""
              id=""
              value={currentLesson.title}
              className="lesson-title-input"
              onChange={(e) =>
                setCurrentLesson({
                  ...currentLesson,
                  title: e.target.value,
                })
              }
            />
            <div
              className="lesson-test-overview-cnt"
              onClick={() =>
                setOpenTest({ open: true, data: currentLesson.testId })
              }
            >
              <img src={Test} alt="test" className="test" />
              <p>
                {!currentLesson?.testId?.length > 3
                  ? "No Tests has been created for this lesson"
                  : `Test click to update`}
              </p>
              <div className="lesson-test-overview-btn"></div>
            </div>
          </div>
          <div className="lesson-content-input-cnt">
            <div className="sublesson-name-cnt">
              <p>Sub lesson Title</p>
              <input
                type="text"
                name=""
                id=""
                value={currentSublesson.title}
                className="sublesson-title-input"
                onChange={(e) => handleSubLessonsInput("title", e.target.value)}
              />
            </div>
            <div className="sublesson-content-cover">
              <div className="input-cnt">
                <p>Duration</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="sublesson-duration-input sublesson-title-input "
                  value={currentSublesson.duration}
                  onChange={(e) =>
                    handleSubLessonsInput("duration", e.target.value)
                  }
                />
              </div>
              <div className="input-cnt add-sublesson-btn">
                <div className="sublesson-title-input center-media">
                  <p>{sublessonFile?.name || "upload-media"}</p>
                  <input
                    type="file"
                    name="video-upload"
                    accept="video/*,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    style={{ position: "absolute" }}
                    id=""
                    className="file-title-input"
                    onChange={(e) => handleAddFile(e.target.files[0])}
                  />
                </div>
              </div>
              <div
                className="add-new-lesson-btn add-sublesson-btn"
                onClick={() => addSublessons()}
              >
                {uploadingFile ? "uploading.." : " Add"}
              </div>
            </div>
          </div>
        </div>
        <div className="content-list">
          {currentLesson?.chapter?.map((sublesson, index) => (
            <div
              className="lesson-content-input-cnt sublesson"
              key={index}
              style={{
                background:
                  currentSublesson.updateIndex === index ? "#eaeaea" : null,
              }}
            >
              <div className="sublesson-name-cnt">
                <p className="sublesson-title-txt">Sub lesson Title</p>
                <input
                  type="text"
                  name=""
                  id=""
                  value={sublesson?.title}
                  className="sublesson-title-input sublesson-card-input"
                />
              </div>
              <div className="sublesson-content-cover">
                <div className="input-cnt sublesson-title-txt">
                  <p>Duration</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={sublesson?.duration}
                    className="sublesson-duration-input sublesson-title-input sublesson-card-input"
                  />
                </div>
                <div className="input-cnt add-sublesson-btn">
                  <div
                    className="sublesson-title-input center-media sublesson-card-input"
                    onClick={() => window.open(sublesson?.link)}
                  >
                    <p className="sublesson-title-txt">{`open ${sublesson.type}`}</p>
                  </div>
                </div>
                <div
                  className="add-new-lesson-btn add-sublesson-btn edit-sublesson-btn"
                  //   onClick={() => setPopupOpen(false)}
                >
                  <div className="delete-btn">
                    <img
                      src={Trash}
                      alt="delete"
                      className="action-btn-img"
                      onClick={() => handleRemoveSublesson(index)}
                    />
                  </div>
                  <div className="delete-btn">
                    <img
                      src={Edit}
                      alt="edit"
                      className="action-btn-img"
                      onClick={() => setEditSublesson(sublesson, index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewLesson;
