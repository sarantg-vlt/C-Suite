import React, { useState, useEffect } from "react";
import "./TestCourseContent.css";
import { toast } from "react-toastify";
// import logoela from "../assets/brand-footer.png";
import logoela from "../asset/brand-footer.png";
// import questionData from './Questionsdata.json';
import { FaCheckCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//react-router
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import { Elacompleted, elaTestScore } from "../../api/baseapi";

// payload = {
//   degreeId,
//   userid,
//   subLessonId,
//   test,
//   answer
// }

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const userInfo = JSON.parse(localStorage.getItem("userdata"));

const TestCourseContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { test, courseId, userId, courseTitle, lessonTitle } = location.state;
  console.log(test);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 23 minutes and 46 seconds
  const [selectedUserDropdown, setSelectedUserDropdown] = useState(1);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState({});


  // var questionData = JSON.parse(localStorage.getItem("questionData"));
  // var questionData = test[0];
  var questionData = test || {};

  console.log(questionData);

  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    // setTimeLeft(localStorage.getItem("TimeLeft"));
    // const timer = setInterval(() => {
    //   setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    // }, 1000);setTimeLeft(localStorage.getItem("TimeLeft"));

    setTimeLeft(questionData.timeLimit);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   if (timeLeft <= 0) {
  //     localStorage.setItem("elacomplete", "true");
  //     testcomplete();
  //   }
  // });

  const handleBookmark = () => {
    // setBookmarkedQuestions((prev) =>
    //   prev.includes(currentQuestionIndex)
    //     ? prev.filter((index) => index !== currentQuestionIndex)
    //     : [...prev, currentQuestionIndex]
    // );
    setBookmarkedQuestions({
      ...bookmarkedQuestions,
      [`${currentSectionIndex}-${currentQuestionIndex}`]:
        bookmarkedQuestions[
          `${currentSectionIndex}-${currentQuestionIndex}`
        ] === "true"
          ? "false"
          : "true",
    });
  };

  const handleNavigation = (direction) => {
    // const currentSection = questionData.sections[currentSectionIndex];
    // const currentSectionQuestions = currentSection.questions.slice(0, 20);

    const currentSectionQuestions = questionData?.questions || [];

    if (
      direction === "next" &&
      currentQuestionIndex < currentSectionQuestions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === "previous" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  //  const handleNavigation = (direction) => {
  //    const currentSection = questionData.sections[currentSectionIndex];

  //    // Ensure currentSection and currentSectionQuestions are not undefined or empty
  //    if (!currentSection || !currentSection.questions) return;

  //    const currentSectionQuestions = currentSection.questions.slice(0, 20);

  //    if (
  //      direction === "next" &&
  //      currentQuestionIndex < currentSectionQuestions.length - 1
  //    ) {
  //      setCurrentQuestionIndex(currentQuestionIndex + 1);
  //    } else if (direction === "previous" && currentQuestionIndex > 0) {
  //      setCurrentQuestionIndex(currentQuestionIndex - 1);
  //    }
  //  };

  const handleOptionChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [`${currentSectionIndex}-${currentQuestionIndex}`]: event.target.value,
    });

    setScore({
      ...score,
      [`${currentSectionIndex}-${currentQuestionIndex}`]:
        currentQuestion.correctAnswer === event.target.value ? 1 : 0,
    });
  };

  const handleSelectChange = (event) => {
    const selectedSectionIndex = parseInt(event.target.value) - 1;
    setSelectedUserDropdown(event.target.value);
    setCurrentSectionIndex(selectedSectionIndex);
    setCurrentQuestionIndex(0);
  };

  // const handleFinishClick = () => {
  //   setTimeout(() => {
  //       navigate("/finish-assessment");
  //   }, 2000);
  // };

  const handleNextSection = () => {
    if (currentSectionIndex < questionData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    var timercolor = {};
    if (seconds <= 30) {
      timercolor = { color: "red" };
    }
    return (
      <div className="time-row">
        <div className="time-item">
          <p style={timercolor} className="para-one">
            {hours.toString().padStart(2, "0")}
          </p>
          <p className="para-two">Hours</p>
        </div>
        <div className="time-item">
          <p style={timercolor} className="para-one">
            {minutes.toString().padStart(2, "0")}
          </p>
          <p className="para-two">Minutes</p>
        </div>
        <div className="time-item">
          <p style={timercolor} className="para-one">
            {remainingSeconds.toString().padStart(2, "0")}
          </p>
          <p className="para-two">Seconds</p>
        </div>
      </div>
    );
  };

  const formatTimevalue = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    var time = "0";
    console.log(minutes);
    if (hours > 0) {
      time =
        hours.toString().padStart(2, "0") +
        " hours " +
        minutes.toString().padStart(2, "0") +
        " minutues " +
        remainingSeconds.toString().padStart(2, "0") +
        " seconds";
    } else if (minutes > 0) {
      time =
        minutes.toString().padStart(2, "0") +
        " minutues " +
        remainingSeconds.toString().padStart(2, "0") +
        " seconds";
    } else {
      time = remainingSeconds.toString().padStart(2, "0") + " seconds";
    }
    return time;
  };

  // const sections = questionData?.sections;
  // const currentSection = sections[currentSectionIndex];
  // const currentSectionQuestions = questionData?.questions?.slice(0, 20) || [];
  const currentSectionQuestions = questionData?.questions || [];
  // const currentSectionQuestions = questionData.questions || [];

  const currentQuestion = currentSectionQuestions[currentQuestionIndex] || null;
  // const currentQuestion = test?.questions[currentQuestionIndex] || null;

  // console.log("currentSection", currentSection);
  console.log(currentSectionQuestions);
  console.log("currentQuestion", currentQuestion);

  let [totalQuestions, settotalQuestions] = useState(0);
  // useEffect(() => {
  //   var total = 0;
  //   for (var index in sections) {
  //     total += sections[index].questions.length;
  //   }
  //   settotalQuestions(total);
  // }, [sections]);
  let totalQuestions1 = questionData?.questions?.length || 0;  // Ensure the total number of questions is correct

  const answeredCount = Object.keys(selectedOptions).length;
  const bookmarkedCount = Object.keys(bookmarkedQuestions).length;
  const notAnsweredCount = totalQuestions - answeredCount;

  const isCurrentSectionCompleted = currentSectionQuestions.every((_, index) =>
    selectedOptions.hasOwnProperty(`${currentSectionIndex}-${index}`)
  );

  // function logout() {
  //   confirmAlert({
  //     title: "You are about to Logout",
  //     message:
  //       "This will lead to loss of test progress, Do you wish to continue?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           localStorage.removeItem("isloggedin");
  //           localStorage.removeItem("linkedin");
  //           localStorage.removeItem("elacomplete");
  //           localStorage.removeItem("userid");
  //           localStorage.removeItem("email");
  //           localStorage.removeItem("name");
  //           navigate("../");
  //         },
  //       },
  //       {
  //         label: "No",
  //         onClick: () => console.log("Click No"),
  //       },
  //     ],
  //   });
  // }

  function finishtest() {
    if (notAnsweredCount > 0) {
      confirmAlert({
        title: "You have " + notAnsweredCount + " unanswered questions",
        message: "Do you wish to continue?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              // localStorage.setItem("elacomplete", "true");
              testcomplete();
            },
          },
          {
            label: "No",
            onClick: () => console.log("Click No"),
          },
        ],
      });
    } else {
      confirmAlert({
        title: "You have " + formatTimevalue(timeLeft) + " time left",
        message:
          "Make sure that your answer are correct. Do you wish to continue?",
        buttons: [
          {
            label: "Yes",
            onClick: () => testcomplete(),
          },
          {
            label: "No",
            onClick: () => console.log("Click No"),
          },
        ],
      });
    }
  }

  async function testcomplete() {
    // let sum = 0;
    // for (let i = 0; i < Object.values(score).length; i++) {
    //   sum += Object.values(score)[i];
    // }

    let testAnswers = currentSectionQuestions.map((question, index) => ({
      question: question.question,
      selectedAnswer:
        selectedOptions[`${currentSectionIndex}-${index}`] || null,
      correctAnswer: question.correctAnswer,
      // type: "MCQ",
      // marks:
      //   selectedOptions[${currentSectionIndex}-${index}] ===
      //   question.correctAnswer
      //     ? 1
      //     : 0,
    }));

    const sAns = [
      {
        subLessonId: questionData._id, // Assuming questionData._id holds the subLessonId
        testAnswers: testAnswers,
      },
    ];
    try {
      // const formData = new FormData();
      // formData.append("userId", courseTitle);
      // formData.append("courseId", courseId);
      // formData.append("courseTitle", courseTitle);
      // formData.append("lessonTitle", lessonTitle);
      // formData.append("answers", JSON.stringify(testAnswers));

      const payload = {
        userId: userId,
        courseId: courseId,
        courseTitle: courseTitle,
        lessonTitle: lessonTitle,
        answers: JSON.stringify(testAnswers),
      };

      const res = await axios.post(
        `${apiBaseUrl}/answers/submit-test`,
        // formData
        payload
      );
      toast.success(res.data.message);
      console.log("X",res.data);

      // navigate(-1);
      // const Id = localStorage.getItem("userid");
      // console.log(Id);
      // var res = await Elacompleted(Id, { testScore: sum, elaComplete: true });
      // console.log(res);
      // if (res) {
      //   setFinalScore(sum)
      //   localStorage.setItem("finalScore", sum);
      // }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>       <ToastContainer />

    <div className="assessment-head">
      <div className="assessment-inside">
        <div className="nav-content">
          <div className="brand-logo">
            <img src={logoela} alt="C-Suite Academy" height="40px" />
          </div>
          {/* <>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {localStorage.getItem("name")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </> */}
        <button
  className="button-finish"
  onClick={(e) => {
    e.preventDefault();
    finishtest();
  }}
  disabled={answeredCount !== totalQuestions1}  // Finish button enabled only if all questions are answered
>
  Finish
</button>

        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="w-75 h-100 left-side">
              <main className="quiz-main">
                <div className="first-content">
                  <p className="count-question">
                    {(currentQuestionIndex + 1).toString().padStart(2, "0")}
                    <span>/</span>
                    {currentSectionQuestions?.length}
                  </p>
                  {/* <select
                    className="change-selection"
                    value={selectedUserDropdown}
                    onChange={handleSelectChange}
                  >
                    {sections?.map((section, index) => (
                      <option key={index} value={index + 1}>{`Section - ${
                        index + 1
                      }`}</option>
                    ))}
                  </select> */}
                </div>

                <p className="question-style">{currentQuestion?.question}</p>

                <form>
                  {currentQuestion?.options?.map((option, index) => (
                    <div className="button-style-icons" key={index}>
                      <label>
                        <input
                          type="radio"
                          value={option}
                          checked={
                            selectedOptions[
                              `${currentSectionIndex}-${currentQuestionIndex}`
                            ] === option
                          }
                          onChange={handleOptionChange}
                        />
                        <FaCheckCircle className="icon-style" size="1.8rem" />
                        {` ${String.fromCharCode(65 + index)}. ${option}`}
                      </label>
                    </div>
                  ))}
                </form>

                <div className="navigation-button">
                  <button
                    className="button-previous"
                    onClick={() => handleNavigation("previous")}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="button-previous"
                    onClick={() => handleNavigation("next")}
                    disabled={
                      currentQuestionIndex ===
                      currentSectionQuestions.length - 1
                    }
                  >
                    next
                  </button>
                  {/* {!(
                    isCurrentSectionCompleted &&
                    currentSectionIndex < sections.length - 1
                  ) && (
                    <button
                      className="button-next"
                      onClick={() => handleNavigation("next")}
                      disabled={
                        currentQuestionIndex ===
                        currentSectionQuestions.length - 1
                      }>
                      Next
                    </button>
                  )} */}
                  {/* {isCurrentSectionCompleted &&
                    currentSectionIndex < sections.length - 1 && (
                      <button
                        className="button-next"
                        onClick={handleNextSection}>
                        Next Section
                      </button>
                    )} */}
                  {/* <button
                    className="button-bookmark"
                    onClick={handleBookmark}>{`${
                    bookmarkedQuestions[
                      ${currentSectionIndex}-${currentQuestionIndex}
                    ] === "true"
                      ? "Bookmarked"
                      : "Bookmark"
                  }`}</button> */}
                </div>
              </main>
            </div>
            <div className="w-25 h-100 right-side">
              <div className="w-100 right-side-component">
                <div className="timer">{formatTime(timeLeft)}</div>
                <div
                  className="questions-container"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  <div className="questions">
                    <p>Questions</p>
                  </div>
                  {/* <select
                    className="change-selection-two"
                    value={selectedUserDropdown}
                    onChange={handleSelectChange}>
                    {sections.map((section, index) => (
                      <option key={index} value={index + 1}>{`Section ${
                        index + 1
                      }`}</option>
                    ))}
                  </select> */}
                  <div
                    id="Test-marks-container"
                    style={{ width: "100%", paddingLeft: "2rem" }}
                  >
                    <div className="question-numbers">
                      {currentSectionQuestions.map((question, quesIndex) => (
                        <button
                          key={quesIndex}
                          className={`question-number ${
                            quesIndex === currentQuestionIndex ? "active" : ""
                          }
                          ${
                            selectedOptions[
                              `${currentSectionIndex}-${quesIndex}`
                            ]
                              ? "answered"
                              : ""
                          }
                          `}
                          onClick={() => setCurrentQuestionIndex(quesIndex)}
                        >
                          {/* {${(quesIndex + 1).toString().padStart(2, '0')}} <FontAwesomeIcon icon={faCheckCircle} style={{color:${!selectedOptions[${currentSectionIndex}-${quesIndex}] && bookmarkedQuestions[${currentSectionIndex}-${quesIndex}]=="true"? 'orange' : ''}}}  size='1rem'className='icon-check pl-4' /> */}
                          {`${(quesIndex + 1).toString().padStart(2, "0")}`}
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            size="1rem"
                            className={`icon-check pl-4 ${
                              bookmarkedQuestions[
                                `${currentSectionIndex}-${quesIndex}`
                              ] === "true"
                                ? "bookmarked"
                                : ""
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="test-checkup-field">
                  <div id="answered-txt">
                    Answered
                    <span>
                      {answeredCount}/{totalQuestions}
                    </span>
                  </div>
                  <div id="not-answered-txt">
                    Not Answered
                    <span>
                      {notAnsweredCount}/{totalQuestions}
                    </span>
                  </div>
                  <div id="bookmarked-txt">
                    Bookmarked <span>{bookmarkedCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TestCourseContent;
