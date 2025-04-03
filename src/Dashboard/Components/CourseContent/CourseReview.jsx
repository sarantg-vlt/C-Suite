import React, { useEffect, useState } from "react";
import { Modal, Button, Accordion, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Star, StarIcon } from "lucide-react";

const CourseReview = ({ courseData, currentCourseData, renderContent }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [View, setView] = useState([]);
  const [overAllReview, setOverAllReview] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);


  const handleShowModal = () => setShowReviewModal(true);
  const handleCloseModal = () => {
    setShowReviewModal(false);
    setRating(0);
    setReviewText("");
  };

  const userInfo = localStorage.getItem("userDataUpdated");
  const currentUserData = JSON.parse(userInfo);

  const handleStarClick = (index) => setRating(index + 1);

  const handleSubmitReview = async () => {
    if (!rating || !reviewText.trim()) {
      alert("Please provide a rating and a review.");
      return;
    }

    const reviewData = {
      username: currentUserData.name,
      coursename: courseData.title,
      rating,
      description: reviewText,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/review`,
        reviewData
      );
      alert(response.data.message || "Review submitted successfully!");
      handleCloseModal();
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to submit review. Please try again."
      );
    }
  };

  useEffect(() => {

    const fetchReview = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/review/${courseData?.title}/rating`
      );
      // const data = await res.data
      console.log(data);

      setView(data);
    };
    const fetchOverAllReview = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/review/${courseData?.title}`
      );
      setOverAllReview(data);
    };
    fetchOverAllReview();
    fetchReview();
  }, []);


  const handleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };


  return (
    <div className="col-md-8 pdy">
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

      {/* Review Summary */}
      <div className="d-flex align-items-center mr-3">
        <button
          className="btn review-btn d-flex gap-2"
          onClick={handleShowModal}
        >
          Review
        </button>
        <span className="d-flex align-items-center justify-content-center">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${ overAllReview?.course?.averageRating>0 &&
                overAllReview?.course?.averageRating > index ? "filled" : ""
              }`}
            >
              <FaStar />
            </span>
          ))}
          {View.length}+ <span onClick={handleShowAllReviews}>Reviews</span>
        </span>
      </div>

        {/* Accordion for Reviews */}
        {showAllReviews && (
         <div className="d-flex flex-column">
        {View.length>0 && View.map((v) => (
          <div
            className=" bg-white d-flex justify-content-between mt-3 p-3 rounded-lg"
            key={v._id}
          >
            <div className="">
              <p className="text-primary h5">{v.username}</p>
              <p className="text-body">{v.description}</p>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-between">
              <p className="">
                {/* <FaStar /> */}
                {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${
                v.rating > index ? "filled" : ""
              }`}
            >
              <FaStar />
            </span>
          ))}
                {v.rating}
              </p>
              <p>{v.createdAt}</p>
            </div>
          </div>
        ))}
      </div> 
      )}

      <Modal show={showReviewModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Submit Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 d-flex flex-row ">
            <label>Rate the course:</label>
            <div className="star-rating ">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${rating > index ? "filled" : ""}`}
                  onClick={() => handleStarClick(index)}
                >
                  <FaStar />
                </span>
              ))}
            </div>
          </div>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CourseReview;
