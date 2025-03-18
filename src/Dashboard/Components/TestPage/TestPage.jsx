import React, { useState, useEffect } from "react";
import "./TestPage.css";
import axios from "axios";
import Timer from "./Timer";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useParams, useNavigate } from "react-router-dom";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";

const TestPage = () => {
  const navigate = useNavigate();
  const { testId, userId } = useParams();

  // Datas
  const [lessonData, setLessonData] = useState({});
  const [userData, setUserData] = useState({});

  // Sending Data
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lessonID, setLessonID] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isUserAlreadyCompleted, setIsUserAlreadyCompleted] = useState(false);

  // Error
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // Time
  const [timeLimit, setTimeLimit] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [timeOver, setTimeOver] = useState(false);

  // Other
  const [viewedQuestions, setViewedQuestions] = useState([0]);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Data Fetching
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

        const response = await axios.get(
          `${apiBaseUrl}/tests/${testId}/user/${userId}`
        );

        setLessonData(response.data.testData);
        // setUserData(response.data.userTestData[0]);
        // console.log(response.data.userTestData);
        setUserData(response.data.userTestData);
        // console.log(response.data.userTestData);
        // setUserData(
        //   response.data.userTestData.find(
        //     (x) => x.userId === userId && x.testId === testId
        //   )
        // );
        setLessonID(response.data.testData.lessonId);
        // const firstMatch = response.data.userTestData.find(
        //   (x) => x.userId === userId && x.testId === testId
        // );
        const firstMatch = response.data.userTestData.isCompleted;
        setIsUserAlreadyCompleted(firstMatch);

        if (response.data.testData && response.data.testData.isTestAvailable) {
          setQuestions(response.data.testData.questions);
          setTimeLimit(response.data.testData.timeLimit);
        } else {
          setFetchError(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching test data:", error);
        setIsLoading(false);
        setFetchError(true);
      }
    };

    fetchTestData();
  }, [testId, userId, isUserAlreadyCompleted]);

  // Stoppin that timer when submitted
  useEffect(() => {
    if (submitted) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(intervalId);
            navigate(-1);
          }
          return prevCountdown - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [submitted, navigate]);

  const handleOptionChange = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
    setUnansweredQuestions(
      unansweredQuestions.filter((q) => q !== questionIndex)
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
    if (!viewedQuestions.includes(index)) {
      setViewedQuestions((prevViewed) => [...prevViewed, index]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const unanswered = questions
      .map((_, index) => index)
      .filter((index) => !(index in answers));

    if (unanswered.length > 0 && !timeOver) {
      setUnansweredQuestions(unanswered);
      alert("Please answer all questions before submitting.");
    } else {
      calculateScore();
      const submissionData = {
        userId,
        testId,
        // answers,
        isCompleted: true,
        score: score,
        // lessonId: lessonID,
        totalQuestions: questions.length,
      };

      console.log(submissionData, "submitted");

      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

        const response = await axios.post(
          `${apiBaseUrl}/tests/submittest`,
          submissionData
        );
        if (response.data.success) {
          // console.log("Test submitted successfully:", response.data);
          setIsLoading(false);
          setIsTestSubmitted(true);
        } else {
          setFetchError(true);
          console.error("Failed to submit test:", response.data.message);
        }
      } catch (error) {
        setFetchError(true);
        console.error("Error submitting test:", error);
      }
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (timeOver || submitted) {
      calculateScore();
      setSubmitted(true);
      setIsTestSubmitted(true);
    }
  }, [timeOver, submitted]);

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (getResult(question, index) === "Correct") {
        correctAnswers += 1;
      }
    });
    setPercentage((correctAnswers / questions.length) * 100);
    console.log(score, "score");
    setScore(correctAnswers);
  };

  const getResult = (question, index) => {
    return question.options.find((opt) =>
      opt.startsWith(question.correctAnswer)
    ) === answers[index]
      ? "Correct"
      : "Incorrect";
  };

  const getFullAnswer = (option, question) => {
    const optionLetter = option;
    const fullAnswer = question.options.find((opt) =>
      opt.startsWith(optionLetter)
    );
    return fullAnswer ? fullAnswer.substring(0, 33) : "";
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (fetchError) {
    return <ErrorDataFetchOverlay />;
  }

  if (isUserAlreadyCompleted) {
    return (
      <div className="testPageUserOverlay">
        <div className="testPageUserModal">
          <div className="testPageUserHeader">
            <h4>Lesson {lessonID}</h4>
          </div>
          <div className="testPageUserResultsContainer">
            <h3>You have already completed this test. </h3>
            <div className="testPageUserFinalScore">
              <div className="scoreDetails">
                <span>Your Score:</span>
                <span>
                  {userData?.score}/{userData?.totalQuestions}
                </span>
              </div>
              <div className="percentageDetails">
                <span>Percentage:</span>{" "}
                <span>
                  {((userData?.score / userData?.totalQuestions) * 100).toFixed(
                    2
                  )}
                  %
                </span>
              </div>
            </div>
            <button
              className="BackBtn"
              style={{ marginLeft: "auto" }}
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="testPage">
      <div className="testPageHeaderBox">
        <div className="testPageHeader">
          <h4>Lesson {lessonID}</h4>
        </div>
        <div className="testLimit">
          <Timer
            timeFromAPI={timeLimit}
            setTimeOver={setTimeOver}
            isRunning={!submitted}
          />
        </div>
        <div className="testPageHeaderTimerBox">
          <p>Timer : {timeLimit} Minutes</p>
          <p>Total Questions : {questions.length}</p>
        </div>
      </div>

      <div className="testPageMainContainer">
        <div className="testPageContent">
          {submitted ? (
            <div className="testPageResultsContainer">
              <h3>
                Results
                <div className="finalScore">
                  <div>
                    <span>Your Score:</span>
                    {score}/{questions.length}
                  </div>
                  <div>
                    <span>Percentage :</span>
                    <span>{percentage}%</span>
                  </div>
                </div>
              </h3>
              {questions.map((question, index) => (
                <div key={index} className="testPageResult">
                  <p className="question">{question.question}</p>
                  <div className="answerResult">
                    <div className="answerRow">
                      <span className="labels">Your answer:</span>
                      <span className="values">
                        {getFullAnswer(answers[index], question)}
                      </span>
                    </div>
                    <div className="answerRow">
                      <span className="labels">Result:</span>
                      <span
                        className={`values ${
                          getResult(question, index) === "Correct"
                            ? "test-correct"
                            : "test-incorrect"
                        }`}
                      >
                        {getResult(question, index)}
                      </span>
                    </div>
                    <div className="answerRow">
                      <span className="labels">Correct answer:</span>
                      <span className="values">
                        {getFullAnswer(question.correctAnswer, question)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="countdown">
                Redirecting in {countdown} seconds...
              </div>
            </div>
          ) : (
            <>
              <div className="testPageSidebar">
                <ul>
                  {questions.map((_, index) => (
                    <li
                      key={index}
                      className={`testPageSidebarItem ${
                        index === currentQuestionIndex
                          ? "selected"
                          : viewedQuestions.includes(index) &&
                            !(index in answers)
                          ? "testPageCodeRed"
                          : index in answers
                          ? "testPageCodeGreen"
                          : ""
                      }`}
                      onClick={() => handleQuestionSelect(index)}
                    >
                      {index + 1}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="testPageQuestionBox">
                <div className="testPageTotalQuestion">
                  Question No : {currentQuestionIndex + 1} / {questions.length}
                </div>
                <div className="testPageSpan">
                  <h4>Multi Choice Type Question</h4>
                  <p>{questions[currentQuestionIndex]?.question}</p>
                </div>

                <div className="testPageInfoBox">
                  <div className="testPageNegativeBox">
                    <div className="testPageNegative">Negative Marks : 0</div>
                  </div>
                  <div className="testPageCodeBox">
                    <div className="testPageCodeGreenBox">
                      <label>Answered</label>
                      <span>
                        {Object.keys(answers).length}/{questions.length}
                      </span>
                    </div>
                    <div className="testPageCodeRedBox">
                      <label>Skipped</label>
                      <span>
                        {viewedQuestions.length - Object.keys(answers).length}/
                        {questions.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="testPageRHS">
                <div className="testPageQuestionContainer">
                  <div className="testPageTotalQuestion testAnswerHere">
                    Answer here
                  </div>
                  {questions[currentQuestionIndex]?.options.map(
                    (option, optIndex) => (
                      <label
                        key={optIndex}
                        className={`testPageOptionLabel ${
                          answers[currentQuestionIndex] === option
                            ? "testPageChecked"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={option}
                          checked={answers[currentQuestionIndex] === option}
                          onChange={() =>
                            handleOptionChange(currentQuestionIndex, option)
                          }
                        />
                        {option}
                      </label>
                    )
                  )}
                </div>
                <div className="testPageNavigationButtons">
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      className="testPageNextButton"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="testPageSubmitButton">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
