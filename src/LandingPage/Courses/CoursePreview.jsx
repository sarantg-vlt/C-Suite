import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Book from '../Assets/Images/book.png'
import CheckMark from '../Assets/Images/check.png'
import VideoIcon from '../Assets/Images/online-video.png'
import logo from "../Assets/Images/logo.png"


const CoursePreview = () => {
    const courseData = useLocation().state?.course
    console.log(courseData);
    
    const [fullDescription, setFullDescription] = useState(false)
    const navigate = useNavigate()
    // console.log(`https://vimeo.com/video${courseData?.videoUrl?.slice(17,)}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`)
    return (
      <div className="preview-page">
        <div className="course-info-cnt">
          {/* <a data-aos="fade-right" class="navbar-brand ml-5 text-light" href="#"><img src={logo} alt="" height={"50px"} /></a> */}
          <h1 className="course-title">{courseData?.title}</h1>
          <div className="lesson-count-cnt">
            <img src={Book} alt="book" className="lesson-icon" />
            <p>Lessons {courseData?.lessons?.length}</p>
          </div>
          <iframe
            src={`https://player.vimeo.com/video/${courseData?.videoUrl
              ?.split("/")
              ?.pop()}`}
            allow="autoplay; fullscreen;"
            title="video"
            sandbox="allow-scripts allow-presentation allow-same-origin"
            // referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="lessons-video-cnt"
          ></iframe>
          <div className="course-about-cnt">
            <h2 className="preview-header">About This Course</h2>
            <p>{courseData.description}</p>
            {/* {console.log(courseData.overviewPoints)} */}
            {/* {
                        fullDescription && courseData?.overviewPoints.map((Overview) => (
                            <div key={Overview.heading}>
                                <p>{Overview.heading}</p>
                                {console.log(Overview.heading)}
                            </div>
                        ))
                    } */}
          </div>

          {/* <div className='course-about-cnt' style={{ margin: 0 }}>
                    <h2 className='preview-header'>Eligibility</h2>
                    <p>{courseData?.Eligibility}</p>
                </div> */}

          {/* <div className='course-outcome-cnt' style={{ background: ' #F8F8FD' }}>
                    <h2 className='preview-header'>After Completing This Course You Will Be Able To</h2>
                    <div className='outcome-list'>
                        {courseData?.Learning_Outcomes
                            ?.map((outcome, index) => (
                                <div className='outcome-item' key={index}>
                                    <img src={CheckMark} alt="checkmark" className='lesson-icon' />
                                    <div>
                                        <p>{outcome}</p>
                                    <h6 className='outcome-description'>{outcome?.description}</h6>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div> */}

          <div
            className="course-outcome-cnt"
            style={{ background: " #F8F8FD" }}
          >
            <h2 className="preview-header">This Course Is For</h2>
            <div className="outcome-list">
              {courseData?.whoIsThisFor?.map((focus, index) => (
                <div className="outcome-item" key={index}>
                  <img
                    src={CheckMark}
                    alt="checkmark"
                    className="lesson-icon"
                  />
                  <div>
                    <p>{focus?.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="course-outcome-cnt"
            style={{ background: " #F8F8FD" }}
          >
            <h2 className="preview-header">
              Hot Topics Covered In This Course
            </h2>
            <div className="outcome-list">
              {courseData?.lessons?.map((lesson, index) => (
                <div className="outcome-item" key={lesson.title}>
                  <img
                    src={VideoIcon}
                    alt="checkmark"
                    className="lesson-icon"
                  />
                  <div>
                    <p>{lesson.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className='course-amount-cnt-phone'> */}
          <div
            className="course-price-info-cnt"
            style={{ minHeight: "fit-content" }}
          >
            <h2
              className="preview-header"
              style={{ marginBottom: "1rem", fontSize: "25px" }}
            >
              Pricing
            </h2>
            <div className="outcome-list">
              <div className="outcome-item">
                <p style={{ fontSize: "20px" }}>
                  <b>Duration :</b>
                </p>
                <div>
                  <p className="text-icon">
                    {courseData?.Course_Duration || 0}
                  </p>
                </div>
              </div>
              {/* {courseData?.courseDetails
                            ?.map((lesson, index) => (
                                <div className='outcome-item' key={index}>
                                    <p className='text-icon'>{lesson?.icon}</p>
                                    <div>
                                        <p>{lesson?.text}</p>
                                    </div>
                                </div>
                            ))} */}
            </div>
            <div className="price-display-cnt">
              <p className="price-text">Price : ₹ {courseData?.price}</p>
            </div>
            <div
              className="enroll-btn"
              onClick={() => navigate("/authentication")}
            >
              <h3 className="white-text">{`Enroll Now >>`}</h3>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* <div className='course-amount-cnt'>
                <div className='course-price-info-cnt'>
                    <div className='outcome-list'>
                        <div className='outcome-item'>
                            <p >duration :</p>
                            <div>
                                <p className='text-icon'>{courseData?.Course_Duration}</p>
                            </div>
                        </div>
                        {courseData?.courseDetails
                            ?.map((lesson, index) => (
                                <div className='outcome-item' key={index}>
                                    <p className='text-icon'>{lesson?.icon}</p>
                                    <div>
                                        <p>{lesson?.text}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className='price-display-cnt'>
                        <p className='price-text'>Price : ₹ {courseData?.Price}</p>
                    </div>
                    <div className='enroll-btn' onClick={() => navigate('/authentication')}>
                        <h3 className='white-text'>{`Enroll Now >>`}</h3>
                    </div>
                </div>
            </div> */}
      </div>
    );
}

export default CoursePreview    