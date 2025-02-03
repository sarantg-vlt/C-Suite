import "./CourseDetails.css";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Tabs, Tab, Accordion } from "react-bootstrap";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
import { fetchUserData } from "../../../api/baseapi";
import settingsSVG from "../Assets/SVG/settings.svg";
import lightningSVG from "../Assets/SVG/lightning.svg";
import tickIconSVG from "../Assets/SVG/tickIcon.svg";
import { loadStripe } from "@stripe/stripe-js";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLesson, setActiveLesson] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [courseContentDetailsData, setCourseContentDetailsData] = useState({});
  const [fetchError, setFetchError] = useState(false);
  const courseDetailIcon = ["📘", "👥", "⏰", "🎓", "🌐", "🔑"];

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const status = params.get("status");
  const userDataString = localStorage.getItem("userDataUpdated");
  const userData = JSON.parse(userDataString);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    // Commented out the strip
    // setPaymentSuccess(status === "success" ? true : false || false);

    const fetchData = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

        const response = await axios.get(
          `${apiBaseUrl}/courseDetail/${courseId}`
        );
        setCourseContentDetailsData(response.data);
        // console.log(response.data.price);
        setIsLoading(false);
        setFetchError(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setIsLoading(false);
        setFetchError(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const icons = [settingsSVG, lightningSVG];
    const randomIndex = Math.floor(Math.random() * icons.length);
    setSelectedIcon(icons[randomIndex]);
  }, []);

  let navigate = useNavigate();

  // commentedout the stripe
  // const makepayment = async (name, id, price) => {
  //   if (localStorage.getItem("isloggedin") === "true") {
  //     const stripe = await loadStripe(
  //       "pk_test_51PUVZZRrG0ZkGYrr3y8s7r35TsoywTtRefCFB64KvnZNuuU2kotNOBp8AOZMPfyejU5Ah1DG4vXjwyig9AZXFmNv00Etljhki6"
  //     );
  //     let data = { name: name, id: id, price: price };

  //     const response = await axios.post(
  //       "https://csuite-production.up.railway.app/api/payment/create-checkout-session",
  //       data,
  //       {
  //         headers: { "Content-Type": "application/json" }, // Set Content-Type header
  //       }
  //     );

  //     // console.log(response)

  //     const result = stripe.redirectToCheckout({
  //       sessionId: response.data.id,
  //     });

  //     if (result.error) {
  //       console.log(result.error);
  //     }
  //     setPaymentSuccess(true);

  //   } else {
  //     navigate("../Authentication");
  //   }
  // };

  const makepayment = async (courseName, courseId, userId) => {
    if (localStorage.getItem("isloggedin") === "true") {
      try {
        const response = await axios.put(
          `${apiBaseUrl}/user/updatecourse/${userId}`,
          { courseId, courseName }
        );

        if (response.data.success) {
          setPaymentSuccess(true);
          fetchData(userId);
        } else {
          console.error("Failed to update course:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating the course:", error);
      }
    } else {
      navigate("../Authentication");
    }
  };

  async function fetchData(id) {
    try {
      const res = await fetchUserData(id);
      // console.log(res.data.user.coursePurchased);

      const userDataUpdated =
        JSON.parse(localStorage.getItem("userDataUpdated")) || {};

      userDataUpdated.coursePurchased = res.data.user.coursePurchased || [];

      localStorage.setItem("userDataUpdated", JSON.stringify(userDataUpdated));
    } catch (error) {
      console.log(error);
    }
  }

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? "" : index);
  };

  const calculateTotalDuration = (videos) => {
    let totalSeconds = 0;
    videos?.forEach((video) => {
      if (video.duration) {
        const timeComponents = video.duration.split(":").map(Number);
        totalSeconds += timeComponents[0] * 60 + timeComponents[1];
      }
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
  };

  function convertToReadableDuration(duration) {
    if (!duration || duration === "0") {
      return "3mins+";
    }

    const [minutes, seconds] = duration.split(":");
    return `${parseInt(minutes, 10)}m ${parseInt(seconds, 10)}s`;
  }

  // const resolveSVGPath = (relativePath) => {
  //  return require(`../Assets/SVG/${relativePath}`);
  // };

  // const resolveSVGPath = () => {
  //   const icons = [lightningSVG, settingsSVG];
  //   const randomIndex = Math.floor(Math.random() * icons.length);
  //   return icons[randomIndex];
  // };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (fetchError) {
    return <ErrorDataFetchOverlay />;
  }

  return (
    <>
      {paymentSuccess && (
        <>
          <PaymentSuccess
            userName={userData.name}
            courseId={courseId}
            price={courseContentDetailsData.price}
            courseTitle={courseContentDetailsData.title}
          />
        </>
      )}
      <div className="courseDetailsBox">
        <div className="row CDHeader g-0">
          <div className="CDHeaderIntroVideo">
            <div className="embed-responsive-16by9">
              
              <iframe
                title={courseContentDetailsData.title || "Intro Video Title"}
                className="embed-responsive-item"
                // src={courseContentDetailsData?.videoUrl}
                src={`https://player.vimeo.com/video/${courseContentDetailsData?.videoUrl
                  .split("/")
                  .pop()}`}
                // src={
                //   courseContentDetailsData?.videoUrl === "http://yourvideo.url"
                //     ? // ? "https://www.youtube.com/embed/9DccPRe6-I8?autoplay=1&start=15"
                //       "https://player.vimeo.com/video/988747921?title=0&byline=0&portrait=0&sidedock=0"
                //     : courseContentDetailsData?.videoUrl
                // }
                allow="autoplay"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row CDBody g-0">
          <div className="CDLHS">
            <div className="CDvideoBox">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="intro video title 2"
                  className="embed-responsive-item"
                  // src={
                  //   courseContentDetailsData?.videoUrl ||
                  //   "https://www.youtube.com/embed/9DccPRe6-I8?autoplay=1&start=15"
                  // }
                  src={`https://player.vimeo.com/video/${courseContentDetailsData?.videoUrl
                    .split("/")
                    .pop()}`}
                  allow="autoplay"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="CDWhoIsThisFor">
              <h5>Who is this course for</h5>
              <div className="CDLightningBox">
                {courseContentDetailsData?.whoIsThisFor &&
                  courseContentDetailsData.whoIsThisFor.map((item, index) => (
                    <div key={index}>
                      <div className="CDLightningTxt">
                        {item?.text}
                        {/* <img className="CDLightningSVG" src={resolveSVGPath(item?.icon)} alt={item?.text} /> */}
                        <img
                          className="CDLightningSVG"
                          src={selectedIcon}
                          alt={item?.text}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="CDWhatYouGet">
              <h5>What you'll get out of this</h5>
              {courseContentDetailsData?.whatYouGet &&
                courseContentDetailsData.whatYouGet.map((item, index) => (
                  <div className="CDWhatBoxContent" key={index}>
                    {/* <img src={resolveSVGPath(item?.icon)}
                     alt={item.title} /> */}
                    <img
                      src={tickIconSVG}
                      alt={item?.title ? item.title : item}
                    />
                    <div>
                      <div className="CDItemTitle">
                        {item?.title ? item.title : item}
                      </div>
                      <span>{item?.description ? item.description : ""}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="CDMHS">
            <div className="CDtabBox">
              <Tabs
                id="course-content-tabs"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
              >
                <Tab
                  eventKey="description"
                  title="Description"
                  className="CDtabBoxDesc"
                >
                  <h4 className="">{courseContentDetailsData?.title}</h4>
                  <p className="">
                    {isExpanded
                      ? courseContentDetailsData?.description
                      : courseContentDetailsData?.description
                          ?.split("\n")
                          .slice(0, 1)
                          .join(" ")}

                    {courseContentDetailsData?.description?.split("\n").length >
                      1 &&
                      !isExpanded && (
                        <span
                          className="read-more-link text-primary px-1"
                          onClick={toggleDescription}
                          style={{ cursor: "pointer" }}
                        >
                          Read More
                        </span>
                      )}
                    {isExpanded && (
                      <span
                        className="read-more-link text-primary px-1"
                        style={{ cursor: "pointer" }}
                        onClick={toggleDescription}
                      >
                        Read Less
                      </span>
                    )}
                  </p>

                  <h4 className="">
                    {" "}
                    What you will gain after completion of the course
                  </h4>
                  <div className="CDOverviewPills">
                    {courseContentDetailsData?.overviewPoints.map(
                      (point, index) => (
                        <span key={index} className="overview-button">
                          {point?.heading}
                        </span>
                      )
                    )}
                  </div>
                </Tab>
                <Tab eventKey="lessons" title="Lessons">
                  <div className="CDAccordianBox">
                    <Accordion
                      activeKey={activeLesson}
                      onSelect={handleLessonClick}
                    >
                      {courseContentDetailsData?.lessons &&
                        courseContentDetailsData.lessons.map(
                          (lesson, index) => (
                            <Accordion.Item key={index} eventKey={index}>
                              <Accordion.Header>
                                <div className="CDlesson-meta">
                                  <div className="CDlesson-title">
                                    {index + 1}. {lesson?.title}
                                  </div>
                                  <span className="CDlesson-duration">
                                    Duration:{" "}
                                    {calculateTotalDuration(lesson?.chapter)}
                                  </span>
                                  <span className="">
                                    &nbsp;/&nbsp; Total Content:{" "}
                                    {lesson?.chapter?.length}
                                  </span>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="CDAccodrionBody">
                                  <ul className="list-group">
                                    {lesson.chapter?.map((video, vidIndex) => (
                                      <li
                                        key={vidIndex}
                                        className="list-group-item"
                                      >
                                        <span className="video-number">
                                          <div>
                                            {`${index + 1}.${vidIndex + 1}`}{" "}
                                            {video?.title}
                                          </div>
                                          {/* <a href={video?.link}>
                                            {`${index + 1}.${vidIndex + 1}`}{" "}
                                            {video?.title}
                                          </a> */}
                                        </span>
                                        {/* <span className="CDlesson-duration">
                                          Duration: {video?.duration}
                                        </span> */}


                                         {video?.type === "video" ? (
                                          <span className="CDlesson-duration">
                                            Duration :{" "}
                                            {convertToReadableDuration(
                                              video.duration
                                            )}
                                          </span> 
                                        ) : (
                                          <span className="CDlesson-duration">
                                            Type : {video?.type}
                                          </span>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          )
                        )}
                    </Accordion>
                  </div>
                </Tab>
                <Tab
                  eventKey="overview"
                  title="Overview"
                  className="CDtabBoxOverV"
                >
                  {courseContentDetailsData?.overviewPoints &&
                    courseContentDetailsData.overviewPoints.map(
                      (point, index) => (
                        <div key={index}>
                          <h5>{point?.heading}</h5>
                          <p>{point?.content}</p>
                        </div>
                      )
                    )}
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="CDRHS">
            <div className="CDPriceBox">
              <h3>₹ {courseContentDetailsData?.price}</h3>
              <div className="CDOffer">
                <div className="CDStrike">
                  ₹ {courseContentDetailsData?.price * 2}
                </div>
                <span>50%</span>
              </div>
              {/* <button className="CDCartBtn">Add to Cart</button> */}
              <button
                onClick={() =>
                  makepayment(
                    courseContentDetailsData.title,
                    courseId,
                    userData._id
                  )
                }
                className="CDBuyBtn"
              >
                Buy Now
              </button>
            </div>
            <div className="CDCourseDetails">
              <h4>Course Details</h4>
              <div>
                {courseContentDetailsData?.courseDetails?.map(
                  (detail, index) => (
                    <div key={index} className="CDCourseDetailRow">
                      {/* <span className="detailIcon">{detail.icon}</span> */}
                      <span className="detailIcon">
                        {/* {courseDetailIcon[index]} */}
                        {courseDetailIcon[index % courseDetailIcon.length]}
                      </span>
                      {detail.text}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
