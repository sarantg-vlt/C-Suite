import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/LeftBar";
import AllReviewList from "./AllReviewList";
import axios from "axios";
import Reviewpage from "./Reviewpage";

const ReviewManagement = () => {
  const [review, setReview] = useState([]);
  const apiBaseUri = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(`${apiBaseUri}/review`);
        setReview(res.data); // Assuming the API response is structured as { data: [...] }
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchReview();
  }, [apiBaseUri]);

  return (
    <div className="">
      <Sidebar />
      <div className="user-page">
      <Reviewpage reviews={review} />
        <AllReviewList review={review} />
      </div>
    </div>
  );
};

export default ReviewManagement;
