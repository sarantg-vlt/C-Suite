import React from "react";
import potrate from "../../Assets/Images/potrate-1.jpg";
import Trash from "../../Assets/Images/trash.png";
import Edit from "../../Assets/Images/edit.png";
import { deleteUser } from "../../../api/baseApi";

const EditInstructor = ({ open, openEdit, data }) => {
  const deleteAction = async () => {
    try {
      const res = await deleteUser(data?._id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="edit-user-cnt"
      style={{ right: open?.open ? "1rem" : " -28rem" }}
    >
      <div className="profile-details-cnt">
        <img src={potrate} alt="potrate" className="profile-details-img" />
        <h4>{data?.name}</h4>
        <div className="action-btn-cnt">
          <img
            src={Trash}
            alt="delete"
            className="action-img"
            onClick={() => deleteAction()}
          />
          <img
            src={Edit}
            alt="edit"
            className="action-img"
            onClick={() => openEdit(data)}
          />
        </div>
      </div>
      <div className="user-ofiicial-details-cnt">
        <div className="ofiicial-detail">
          <h3 className="details-text">Email</h3>
          <p>{data?.email}</p>
        </div>
        <div className="ofiicial-detail">
          <h3 className="details-text">Gende</h3>
          <p>{data?.gender}</p>
        </div>
        <div className="ofiicial-detail">
          <h3 className="details-text">company</h3>
          <p>{data?.companyname}</p>
        </div>
        <div className="ofiicial-detail">
          <h3 className="details-text">position</h3>
          <p>{data?.position}</p>
        </div>
      </div>
      <div className="courses-history">
        <div className="courses-history-header">
          <h5>Course</h5>
          <h5>status</h5>
        </div>
        <div className="courses-history-content courses-history-header">
          <h5>AI in hiring assisatance</h5>
          <h6>Attending</h6>
        </div>
        <div className="courses-history-content courses-history-header">
          <h5>AI in hiring assisatance</h5>
          <h6>Attending</h6>
        </div>
        <div className="courses-history-content courses-history-header">
          <h5>AI in hiring assisatance</h5>
          <h6>Attending</h6>
        </div>
      </div>
    </div>
  );
};

export default EditInstructor;
