import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const CourseReview = ({ courseData, currentCourseData, renderContent }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

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
      console.error("Error submitting review:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to submit review. Please try again.");
    }
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
      <div>
        <button className="btn review-btn" onClick={handleShowModal}>
          Review
        </button>
      </div>

      <Modal show={showReviewModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
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
