import React, { useState } from "react";
import { addnewUser } from "../../../api/baseApi";

const AddInstructor = ({ closeNewData }) => {
  const [newInstructorData, setNewInstructorData] = useState({
    name: null,
    email: null,
    degree: null,
    position: null,
    gender: null,
    password: null,
  });

  const handleChnageData = (type, value) => {
    setNewInstructorData({ ...newInstructorData, [type]: value });
  };

  const createNewInstructor = async () => {
    try {
      const res = await addnewUser(newInstructorData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-new-user-cover">
      <div className="add-new-user-cnt">
        <>
          <h2>New Instructor </h2>
          <p>Enter New Instructor Details</p>
        </>
        <form className="user-details-from">
          <div className="course-name-cnt user-input">
            <p>Enter Instructor Name</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input "
              onChange={(e) => handleChnageData("name", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Enter Instructor email</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input "
              onChange={(e) => handleChnageData("email", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Enter Instructor company</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input "
              onChange={(e) => handleChnageData("companyname", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Enter Instructor Degree</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input "
              onChange={(e) => handleChnageData("degree", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Enter Instructor geneder</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input "
              onChange={(e) => handleChnageData("gender", e.target.value)}
            />
          </div>
          <div
            className="course-name-cnt name-input user-input "
            style={{ position: "relative" }}
          >
            <p className="file-upload ">Upload Instructor Profile</p>
            <input
              type="file"
              name=""
              id=""
              className="name-input file-input-hide "
              placeholder="upload"
            />
          </div>
        </form>
        <div className="bottom-btn-cnt">
          <div className=" course-delete-btn " onClick={() => closeNewData()}>
            Cancel
          </div>
          <div
            className="add-new-lesson-btn"
            onClick={() => createNewInstructor()}
          >
            Add Instructor
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstructor;
