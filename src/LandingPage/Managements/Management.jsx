import React, { useState, useEffect } from "react";
import "./managements.css";
import {
  MdOutlineAssessment,
  MdOutlineUnsubscribe,
  MdDashboard,
} from "react-icons/md";
import MembersData from "../Assets/Data/Members.json";
import { LiaUniversitySolid } from "react-icons/lia";
import Aos from "aos";
import "aos/dist/aos.css";
import p1 from "./Asset/panchimam.jpeg";
import p2 from "./Asset/selvaraj.jpg";
import p3 from "./Asset/mrm.jpg";
import p4 from "./Asset/col.jpg";
import { useNavigate } from "react-router-dom";
import ManagementCard from "./ManagementCard";
import LearningJourney from "./LearningJourney/LearningJourney";

const contentData = {
  Assessment: {
    title: "ABOUT US",
    content: [
      {
        title:
          "The core purpose of C-Suite is to groom High Performing Executives and help them make it to the boardroom decades earlier than usual.",
        text: "• High-performing executives with great potential in strategic leadership spend decades to reach positions where they can steer the course of their companies.",
      },
      {
        text: "• Many make it to CXO positions in the twilight years of their careers and do not have enough time to contribute real value.",
      },
      {
        title:
          "C-Suite will help you climb the corporate ladder faster, giving you enough time to meaningfully contribute.",
        text: "• For your training and grooming C-Suite Academy has assembled a team of CXOs who have not only made it to the boardroom early in their careers, but have also made pioneering contributions to their industry.",
      },
      {
        // text: "• C-Suite Academy is a Govt of India DIPP-recognized startup",
      },
    ],
    imageClass: "card-image",
  },
  Subscribe: {
    title: "Management",
    content: MembersData["teamMembers"],
    // imageClass: "card-image-subscribe",
  },

  Dashboard: {
    title: "Expert",
    content: MembersData["expertPanel"],
  },
  Learning: {
    title: "Learning",
    content: [
      {
        title: "Interactive Courses",
        text: "Engage in interactive courses designed to cater to various learning styles. Access video lectures, quizzes, assignments, and interactive simulations to reinforce your understanding of key concepts.",
      },
      {
        title: "Expert Instructors",
        text: "Learn from industry experts and experienced educators who provide valuable insights and guidance throughout your learning journey. Benefit from their expertise and practical knowledge.",
      },
      {
        title: "Self-Paced Learning",
        text: "Enjoy the flexibility of self-paced learning, allowing you to study at your own convenience and progress through the courses at a pace that suits your schedule and learning preferences.",
      },
    ],
    imageClass: "card-image-learning",
  },
};

const Management = () => {
  const [selectedContent, setSelectedContent] = useState("Assessment");
  const navigate = useNavigate();

  const handleButtonClick = (content) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    const content = contentData[selectedContent];
    let classname = "";
    if (content.title === "Learning") {
      classname = "col-md-12";
    } else if (content.title === "ABOUT US") {
      classname = "col-md-4";
    } else {
      classname = "col-md-0";
    }
    if (!content) return null;
    return (
      <div className="container-fluid">
        {content.title !== "Learning" ? (
          <div className="row ">
            <div
              className={
                content.title === "Management" || content.title === "Expert"
                  ? "col-md-12"
                  : "col-lg-8"
              }
            >
              <div data-aos="fade-right" className="changes-head">
                <h1 className="content-title">{content.title}</h1>
                <div className="total-content">
                  {content?.title === "Management" ||
                  content?.title === "Expert" ? (
                    <div className="custom-cards-container">
                      {content?.content.map((memberData, index) => (
                        <ManagementCard data={memberData} key={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="container-para">
                      {content.content.map((item, index) => (
                        <div key={index}>
                          <strong className="item-title">{item.title}</strong>
                          {item.text && <p className="pt-1">{item.text}</p>}
                          {item.component && <item.component />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={classname}>
              <div data-aos="fade-left" className="image-sytle">
                <div className={content.imageClass}></div>
              </div>
            </div>
          </div>
        ) : (
          <LearningJourney />
        )}
      </div>
    );
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <div className="container-fluid" id="what">
        <div className="container-lms-head">
          <div className="heading-lms" data-aos="fade-up">
            <div>Why C-suite Academy?</div>
            <div>
              So, you aced your performance review again. <br /> Yet, you do not
              see a clear career progression to the C-suite.
            </div>
            <div>
              There is only one quality that paves your way to upper management,
              Irreplaceable Dependence
              <br />
              <p id="para3">C-suite Academy will help you cultivate this.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-read">
        <div className="buttons-all">
          <button
            data-aos="fade-right"
            className="txt-access"
            onClick={() => handleButtonClick("Assessment")}
          >
            <MdOutlineAssessment
              className="text-primary-color mr-2"
              size="1.5rem"
            />
            <span>ABOUT US</span>
          </button>
          <button
            data-aos="fade-right"
            className="txt-access"
            onClick={() => handleButtonClick("Subscribe")}
          >
            <MdOutlineUnsubscribe
              className="text-primary-color mr-2"
              size="1.5rem"
            />
            <span>MANAGEMENT</span>
          </button>
          <button
            data-aos="fade-left"
            className="txt-access"
            onClick={() => handleButtonClick("Dashboard")}
          >
            <MdDashboard className="text-primary-color mr-2" size="1.5rem" />
            <span>EXPERTS</span>
          </button>
          <button
            data-aos="fade-left"
            className="txt-access"
            onClick={() => handleButtonClick("Learning")}
          >
            <LiaUniversitySolid
              className="text-primary-color mr-2"
              size="1.5rem"
            />
            <span>LEARNING JOURNEY</span>
          </button>
        </div>
      </div>

      {renderContent()}
    </>
  );
};

export default Management;
