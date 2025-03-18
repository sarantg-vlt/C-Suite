import React, { useState } from "react";
import { addnewUser } from "../../api/baseApi";
import { hasNullField } from "../../hooks/newCourseFunctions";

const AddnewUser = ({ closeNewUser }) => {
  const [newUserData, setNewUserData] = useState({
    name: null,
    email: null,
    companyname: null,
    position: null,
    gender: null,
    profileImg: null,
    password: null,
  });

  const handleChnageData = (type, value) => {
    setNewUserData({ ...newUserData, [type]: value });
  };

  const createNewUser = async () => {
    if (!hasNullField(newUserData)) {
      const formData = new FormData();
      formData.append("name", newUserData.name);
      formData.append("email", newUserData.email);
      formData.append("companyname", newUserData.companyname);
      formData.append("position", newUserData.position);
      formData.append("gender", newUserData.gender);
      formData.append("profilePic", newUserData.profileImg);
      formData.append("password", newUserData.password);
      try {
        const res = await addnewUser(formData);
        console.log(res);
        if (res) closeNewUser()
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please fill all fields")
    }
  };

  console.log(newUserData)

  return (
    <div className="add-new-user-cover">
      <div className="add-new-user-cnt">
        <>
          <h2>New User </h2>
          <p>Enter New User Details</p>
        </>
        <form className="user-details-from">
          <div className="course-name-cnt user-input">
            <p>Enter user Name</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input "
              onChange={(e) => handleChnageData("name", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Enter user email</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input "
              onChange={(e) => handleChnageData("email", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Enter user company</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input "
              onChange={(e) => handleChnageData("companyname", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Enter user position</p>
            <input
              type="text"
              name=""
              id=""
              className="name-input "
              onChange={(e) => handleChnageData("position", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Enter user geneder</p>
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
            <p className="file-upload ">{newUserData?.profileImg?.name ? newUserData?.profileImg?.name.slice(0, 20) : "Upload profile image"}</p>
            <input
              type="file"
              name=""
              id=""
              // value=
              className="name-input file-input-hide "
              onChange={(e) =>
                setNewUserData({
                  ...newUserData,
                  profileImg: e.target.files[0],
                })
              }
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Enter user password</p>
            <input
              type="password"
              name=""
              id=""
              value={newUserData?.password || ''}
              className="name-input "
              onChange={(e) => handleChnageData("password", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>confirm password</p>
            <input
              type="password"
              name=""
              id=""
              className="name-input "
            // onChange={(e) => handleChnageData("gender", e.target.value)}
            />
          </div>
        </form>
        <div className="bottom-btn-cnt">
          <div className=" course-delete-btn " onClick={() => closeNewUser()}>
            Cancel
          </div>
          <div className="add-new-lesson-btn" onClick={() => createNewUser()}>
            Add User
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddnewUser;
