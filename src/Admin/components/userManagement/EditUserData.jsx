import React, { useEffect, useState } from "react";
import { updateUser } from "../../api/baseApi";

const EditUserData = ({ closeEditUser, currentData }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(currentData);
  }, [currentData]);

  const handleValueChange = (type, value) => {
    setUserData({ ...userData, [type]: value });
  };

  const updateData = async () => {
    const formData = new FormData();
    formData.append("name", userData?.name);
    formData.append("email", userData?.email);
    formData.append("companyname", userData?.companyname);
    formData.append("position", userData?.position);
    formData.append("gender", userData?.gender);
    formData.append("profilePic", userData?.profilePic);
    formData.append("password", userData?.password);
    try {
      console.log(currentData?._id);
      const response = await updateUser(formData, currentData?._id);
      if (response) closeEditUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-new-user-cover">
      <div className="add-new-user-cnt">
        <>
          <h2>Edit User </h2>
          <p>Update User Details</p>
        </>
        <form className="user-details-from">
          <div className="course-name-cnt user-input">
            <p>Name</p>
            <input
              type="text"
              name=""
              value={userData?.name}
              id=""
              className="name-input "
              onChange={(e) => handleValueChange("name", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Email</p>
            <input
              type="text"
              name=""
              value={userData?.email}
              id=""
              className="name-input "
              onChange={(e) => handleValueChange("email", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Company</p>
            <input
              type="text"
              name=""
              value={userData?.companyname}
              id=""
              className="name-input "
              onChange={(e) => handleValueChange("companyname", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Position</p>
            <input
              type="text"
              name=""
              value={userData?.position}
              id=""
              className="name-input "
              onChange={(e) => handleValueChange("position", e.target.value)}
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Geneder</p>
            <input
              type="text"
              name=""
              value={userData?.gender}
              id=""
              className="name-input "
              onChange={(e) => handleValueChange("gender", e.target.value)}
            />
          </div>
          <div
            className="course-name-cnt name-input user-input "
            style={{ position: "relative" }}
          >
            <p className="file-upload ">Upload Profile</p>
            <input
              type="file"
              name=""
              id=""
              className="name-input file-input-hide "
              placeholder="upload"
              onChange={(e) =>
                setUserData({ ...userData, profilePic: e.target.files[0] })
              }
            />
          </div>
          <div className="course-name-cnt user-input">
            <p>Password</p>
            <input
              type="text"
              name=""
              value={userData?.password}
              id=""
              className="name-input "
              onChange={(e) => handleValueChange("password", e.target.value)}
            />
          </div>
          {/* <div className="course-name-cnt user-input">
            <p>Geneder</p>
            <input
              type="text"
              name=""
              value={userData?.gender}
              id=""
              className="name-input "
              onChange={(e) => handleValueChange("gender", e.target.value)}
            />
          </div> */}
        </form>
        <div className="bottom-btn-cnt">
          <div className=" course-delete-btn " onClick={() => closeEditUser()}>
            Cancel
          </div>
          <div className="add-new-lesson-btn" onClick={() => updateData()}>
            Add User
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserData;
