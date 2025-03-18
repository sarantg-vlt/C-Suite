import React, { useState, useEffect } from "react";
import axios from "axios";
import './PricingPlans.css';
import { Link } from "react-router-dom";

const PricingPlans = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/courseDetail/`);
        const allCourses = response.data;

        // filtering purchased course
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setCoursesData(allCourses);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setFetchError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="background">
      <div className="container my-5 py-5">
        <div className="d-flex justify-content-between align-items-start">
          <div className="text-left">
            <h2 className="font-weight-bold  plan-title">Choose your Course</h2>
          </div>
        </div>
        <div className="cousres-price-container">
            {coursesData.map((course) => (
              <div className="two-custom-card" key={course._id}>
                <h4>{course.title}</h4>
                <p>Price : <span className="span-price">₹  {course.price}</span></p>
                <Link to='/authentication'>
                 <button>Buy Course</button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
