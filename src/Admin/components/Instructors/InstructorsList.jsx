import React, { useEffect, useRef, useState } from "react";
// import { allUsers } from "../../api/baseApi";
// import searchIcon from "../Assets/Images/potrate-1.jpg";
// import moreIcon from "../Assets/Images/more.png";
// import EditInstructor from "./editinstructors/EditInstructor";

const InstructorsList = ({ editAction, instructors }) => {

  if (!instructors || instructors.length === 0) {
    return <p className="no-data-message">No instructors available</p>;
  }

  // const Instructors = instructors

  // const [editInstructor, setEditInstructor] = useState({
  //   open: false,
  //   data: null,
  // });
  // const [instructorsList, setInstructorsList] = useState(null);
  // const wrapperRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       setEditInstructor(false);
  //     }
  //   }

  //   if (editInstructor) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [editInstructor]);

  // useEffect(() => {
  //   const getInstructors = async () => {
  //     try {
  //       const { data } = await allUsers();

  //       setInstructorsList(data.user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getInstructors();
  // }, [editAction]);

  return (
    // <div className="users-list-cnt">
    //   <div className="users-details-header">
    //     <p className="user-name-cnt ">name</p>
    //     <p className="user-name-cnt">Degree</p>
    //     <p className="user-name-cnt">Classes</p>
    //     <p className="user-date-cnt">Joined date</p>
    //     <p style={{ width: ".5rem" }}></p>
    //   </div>
    //   {instructorsList &&
    //     instructorsList?.map((instructor, index) => (
    //       <div className="user-details-cnt" key={instructor._id}>
    //         <div className="user-name-cnt">
    //           <img
    //             src={searchIcon}
    //             alt="profile-icon"
    //             className="profile-img"
    //           />
    //           <div className="name-cnt">
    //             <h3>{instructor?.name}</h3>
    //             <p>{instructor?.email}</p>
    //           </div>
    //         </div>
    //         <p className="user-name-cnt details-text">{instructor?.position}</p>
    //         <p className="details-text user-name-cnt">
    //           {instructor?.companyname}
    //         </p>
    //         <p className="details-text user-date-cnt">july 4, 2023</p>
    //         <img
    //           src={moreIcon}
    //           alt="more"
    //           className="more-icon"
    //           onClick={() =>
    //             setEditInstructor({ open: true, data: instructor })
    //           }
    //         />
    //       </div>
    //     ))}
    //   <div ref={wrapperRef}>
    //     <EditInstructor
    //       open={editInstructor}
    //       openEdit={editAction}
    //       data={editInstructor.data}
    //     />
    //   </div>
    // </div>
    <>
      <div className="users-list-cnt">
        <div className="users-details-header">
          <p className="user-name-cnt ">email</p>
          <p style={{ width: ".5rem" }}></p>
        </div>
        {instructors &&
          instructors?.map((instruct) => (
            <div className="user-details-cnt" key={instruct?._id}>
              <p className="user-name-cnt">{instruct.email}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default InstructorsList;
