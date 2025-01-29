import { Delete, Trash2 } from "lucide-react";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";


 const apiBaseUri = process.env.REACT_APP_API_BASE_URL;

const AllReviewList = ({ review }) => {


  

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(date));
  };


  // useEffect(() => {
  //    const handledelete = async (id) => {
  //      const response = await axios.delete(`${apiBaseUri}/review/${id}`);
  //    };
  
  // }, [id, handledelete])
  

  const handledelete = async (id) => {
    const response = await axios.delete(`${apiBaseUri}/review/${id}`);
    window.location.reload()
}
  
  
  return (
    <>
      <div className="users-list-cnt">
        <div className="users-details-header">
          <p className="user-name-cnt ">User name</p>
          <p className="user-name-cnt">Course name</p>
          <p className="user-name-cnt">rating</p>
          <p className="user-name-cnt">description </p>
          <p className="user-name-cnt">Created At</p>
          <p style={{ width: ".5rem" }}></p>
        </div>
        {review &&
          review?.map((review) => (
            <div className="user-details-cnt" key={review._id}>
              <div className="user-name-cnt">{review.username}</div>
              <div className="user-name-cnt">{review.coursename}</div>
              <div className="user-name-cnt">{review.rating}</div>
              <div className="user-name-cnt">{review.description}</div>
              <div className="user-name-cnt">
                {formatDate(review.createdAt)}
              </div>
              <div className="user-name-cnt">
                <button
                  className="btn btn-danger"
                  onClick={() => handledelete(review._id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        {/* {instructorsList &&
      instructorsList?.map((instructor, index) => (
        <div className="user-details-cnt" key={index}>
          <div className="user-name-cnt">
            <img
              src={searchIcon}
              alt="profile-icon"
              className="profile-img"
            />
            <div className="name-cnt">
              <h3>{instructor?.name}</h3>
              <p>{instructor?.email}</p>
            </div>
          </div>
          <p className="user-name-cnt details-text">{instructor?.position}</p>
          <p className="details-text user-name-cnt">
            {instructor?.companyname}
          </p>
          <p className="details-text user-date-cnt">july 4, 2023</p>
          <img
            src={moreIcon}
            alt="more"
            className="more-icon"
            onClick={() =>
              // setEditInstructor({ open: true, data: instructor })
            }
          />
        </div>
      ))} */}

        {/* <div ref={wrapperRef}>
      <EditInstructor
        open={editInstructor}
        openEdit={editAction}
        data={editInstructor.data}
      />
    </div> */}
      </div>
    </>
  );
}

export default AllReviewList




// import { useState } from "react";

// const AllReviewList = ({ initialReviews }) => {
//   const [reviews, setReviews] = useState(initialReviews);

//   const formatDate = (date) => {
//     return new Intl.DateTimeFormat("en-US", {
//       id: 1,
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     }).format(new Date(date));
//   };

//   const handleEdit = (id) => {
//     console.log("Edit review with ID:", id);
//     // Implement edit logic here
//   };

//   const handleDelete = (id) => {
//     setReviews(reviews.filter((review) => review._id !== id));
//   };

//   return (
//     <>
//       <div className="users-list-cnt">
//         <div className="users-details-header">
//           <p className="user-name-cnt ">User name</p>
//           <p className="user-name-cnt">Course name</p>
//           <p className="user-name-cnt">Rating</p>
//           <p className="user-name-cnt">Description</p>
//           <p className="user-name-cnt">Created At</p>
//           <p style={{ width: ".5rem" }}></p>
//         </div>
//         {reviews &&
//           reviews.map((review) => (
//             <div className="user-details-cnt" key={review._id}>
//               <div className="user-name-cnt">{review.username}</div>
//               <div className="user-name-cnt">{review.coursename}</div>
//               <div className="user-name-cnt">{review.rating}</div>
//               <div className="user-name-cnt">{review.description}</div>
//               <div className="user-name-cnt">
//                 {formatDate(review.createdAt)}
//               </div>
//               <div className="user-name-cnt">
//                 <button onClick={() => handleEdit(review._id)}>Edit</button>
//                 <button onClick={() => handleDelete(review._id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default AllReviewList;



