import React, { useEffect, useState } from "react";
// import { addnewTest, getLessonTest, updateTest } from "../../../api/baseApi";
import { convertToUTC } from "../../../hooks/newCourseFunctions";

const AddTest = ({ testId, closeTest, addTest }) => {
  const initialState = {
    question: "",
    correctAnswer: null,
    options: [],
    questionNumber: null,
    updateIndex: null,
  };

  const [currentTest, setCurrentTest] = useState({
    title: "testing Exam",
    timeLimit: 11,
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState(initialState);
  const [dropDown, setDropDown] = useState(false);
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    // const getTest = async () => {
    //   if (testId?.length > 1) {
    //     const { data } = await getLessonTest(testId);
    //     setCurrentTest(data?.test);
    //     const time = convertToUTC(data?.test?.timeLimit);
    //     setDuration(time);
    //   }
    // };
    // getTest();
    if (testId) {
      setCurrentTest(testId);
    }
  }, [testId]);

  const handleChoiceSelect = (index, value) => {
    setDropDown(false);
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: currentQuestion?.options[index],
    });
  };

  const handleChoiceInput = (index, value) => {
    const newChoices = [...currentQuestion.options];
    newChoices[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newChoices });
  };

  const handleNext = () => {
    const updatedtest = [...currentTest.questions];
    if (currentQuestion.updateIndex === null) {
      updatedtest?.push(currentQuestion);
      setCurrentTest({ ...currentTest, questions: updatedtest });
      setCurrentQuestion(initialState);
    } else if (
      currentQuestion.updateIndex + 1 ===
      currentTest?.questions?.length
    ) {
      updatedtest[currentQuestion.updateIndex] = currentQuestion;
      setCurrentTest({ ...currentTest, questions: updatedtest });
      setCurrentQuestion(initialState);
    } else {
      updatedtest[currentQuestion.updateIndex] = currentQuestion;
      setCurrentTest({ ...currentTest, questions: updatedtest });
      setCurrentQuestion(
        currentTest?.questions?.[currentQuestion.updateIndex + 1]
      );
    }
  };

  const checkquestionMatch = (index) => {
    if (
      currentQuestion?.updateIndex === index ||
      currentTest?.questions?.indexOf(currentQuestion) === index
    )
      return "#8949ff";
    return "transparent";
  };

  const questionValidation = () => {
    if (
      currentQuestion?.question?.length > 5 &&
      currentQuestion?.correctAnswer &&
      currentQuestion?.options?.length === 4
    )
      return true;
    return false;
  };

  const handleAddTest = async () => {
    if (testId?.length > 5) {
      try {
        // const { data } = await updateTest(currentTest);
        // addTest(data?.test?._id);
        addTest(currentTest);
        closeTest();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // const { data } = await addnewTest(currentTest);
        // addTest(data?.test?._id);
        addTest(currentTest);
        closeTest();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (duration?.hours !== 0 || duration?.minutes !== 0) {
      const totalSeconds = duration?.hours * 60 * 60 + duration?.minutes * 60;
      if (totalSeconds !== undefined) {
        setCurrentTest((currentTest) => {
          return { ...currentTest, timeLimit: totalSeconds };
        });
      }
    }
  }, [duration]);

  console.log(currentTest);

  return (
    <div className="add-test-cnt">
      <div className="test-top-header">
        <div>
          {/* <p>Test for this lessons</p> */}
          <div className="lesson-name-cnt">
            <p>Lesson Title</p>
            <input
              type="text"
              name=""
              value={currentTest?.title}
              className="lesson-title-input test-title-input"
              onChange={(e) =>
                setCurrentTest({
                  ...currentTest,
                  title: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="ela-description-cnt">
          <p>Set Duration</p>
          <div className="ela-timer-input-cnt">
            <div className="ela-timer-cover">
              <input
                type="number"
                name=""
                value={duration?.hours}
                onChange={(e) =>
                  setDuration({ ...duration, hours: e.target.value })
                }
                className="ela-timer-input description-input "
              />
              <p>Hours</p>
            </div>
            <div className="ela-timer-cover">
              <input
                type="number"
                name=""
                value={duration?.minutes}
                onChange={(e) =>
                  setDuration({ ...duration, minutes: e.target.value })
                }
                className="ela-timer-input description-input "
              />
              <p>Minutes</p>
            </div>
          </div>
        </div>
      </div>
      <div className="questions-block-cnt">
        {currentTest?.questions?.map((test, index) => (
          <div
            className="question-block"
            style={{ background: checkquestionMatch(index) }}
            key={index}
            onClick={() => setCurrentQuestion({ ...test, updateIndex: index })}
          >
            <p
              key={index}
              className="question-number"
              style={{
                color: checkquestionMatch(index) === "transparent" && "#8949ff",
              }}
            >
              {index + 1}
            </p>
          </div>
        ))}
        <div
          className="question-block"
          style={{
            background: checkquestionMatch(null),
          }}
          onClick={() => setCurrentQuestion(initialState)}
        >
          <p
            className="question-number"
            style={{
              color: checkquestionMatch(null) === "transparent" && "#8949ff",
            }}
          >
            {currentTest?.questions?.length + 1}
          </p>
        </div>
      </div>
      <div className="question-inputs-cnt">
        <div className="question-input-cnt">
          <p>Question</p>
          <textarea
            className="question-input"
            value={currentQuestion?.question}
            onChange={(e) =>
              setCurrentQuestion({
                ...currentQuestion,
                question: e.target.value,
              })
            }
          />
        </div>
        <div className="choice-cnt">
          <div className="choice-header">
            <p>Choices</p>
            <div className="select-answer-cnt">
              <p>Select Answer</p>
              <div className="selected-choice-display">
                <p onClick={() => setDropDown(true)}>
                  {currentQuestion?.correctAnswer
                    ? currentQuestion?.correctAnswer
                    : "Not selected"}
                </p>
                {dropDown && (
                  <div className="drop-down-cnt">
                    <div
                      className="drop-down-choice"
                      onClick={() => handleChoiceSelect(0, "Choice one")}
                    >
                      <p>Choice one</p>
                    </div>
                    <div
                      className="drop-down-choice"
                      onClick={() => handleChoiceSelect(1, "Choice two")}
                    >
                      <p>Choice two</p>
                    </div>
                    <div
                      className="drop-down-choice"
                      onClick={() => handleChoiceSelect(2, "Choice three")}
                    >
                      <p>Choice three</p>
                    </div>
                    <div
                      className="drop-down-choice"
                      onClick={() => handleChoiceSelect(3, "Choice four")}
                    >
                      <p>Choice four</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="choice">
            <p>Choice one</p>
            <input
              type="text"
              name=""
              placeholder="Enter choice one"
              value={
                currentQuestion?.options[0] ? currentQuestion?.options[0] : ""
              }
              onChange={(e) => handleChoiceInput(0, e.target.value)}
            />
          </div>
          <div className="choice">
            <p>Choice two</p>
            <input
              type="text"
              name=""
              placeholder="Enter choice two"
              value={
                currentQuestion?.options[1] ? currentQuestion?.options[1] : ""
              }
              onChange={(e) => handleChoiceInput(1, e.target.value)}
            />
          </div>
          <div className="choice">
            <p>Choice three</p>
            <input
              type="text"
              name=""
              placeholder="Enter choice three"
              value={
                currentQuestion?.options[2] ? currentQuestion?.options[2] : ""
              }
              onChange={(e) => handleChoiceInput(2, e.target.value)}
            />
          </div>
          <div className="choice">
            <p>Choice four</p>
            <input
              type="text"
              name=""
              placeholder="Enter choice four"
              value={
                currentQuestion?.options[3] ? currentQuestion?.options[3] : ""
              }
              onChange={(e) => handleChoiceInput(3, e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="action-btns-cnt">
        <div
          className=" course-delete-btn cancel-test-btn"
          onClick={() => closeTest()}
        >
          Cancel
        </div>
        <div
          className=" course-delete-btn save-next "
          onClick={() => handleNext()}
          style={{
            background: !questionValidation() && "gray",
            pointerEvents: !questionValidation() && "none",
          }}
        >
          Save and Next
        </div>
        <div className="add-new-lesson-btn" onClick={() => handleAddTest()}>
          Add to Lesson
        </div>
      </div>
    </div>
  );
};

export default AddTest;
