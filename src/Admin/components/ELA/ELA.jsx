import React, {useEffect, useState } from "react";
import { getEla } from "../../api/baseApi";
import { useNavigate } from "react-router-dom"; 
import {
  addNewQuestion,
  addSection,
  deleteSingleQuestion,
  deleteSingleSection,
  editQuestionDetails,
  editQuestions,
  secondsToUtc,
  UTCtoSeconds,
} from "../../hooks/ElaFunctions";

const ELA = () => {
  const navigate = useNavigate(); 
  const initialState =
   {
    question: "",
    answer: null,
    options: [],
    questionNumber: null,
    updateIndex: null,
  };

  const defaultTest = {
    sections: [initialState],
    time: 0,
    difficulty: null,
    tags: [],
    description: "",
  };

  const [currentTest, setCurrentTest] = useState([defaultTest]);
  const [currentQuestion, setCurrentQuestion] = useState(initialState);
  const [dropDown, setDropDown] = useState(false);
  const [difficultyDropDown, setDifficultyDropDown] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [TestId, setTestId] = useState(null);
  const [time, setTime] = useState({ hour: 0, minute: 0 });
  const apiBaseurl = process.env.REACT_APP_API_BASE_URL;

  const handleChoiceSelect = (index) => {
    setDropDown(false);
    setCurrentQuestion({
      ...currentQuestion,
      answer: currentQuestion?.options[index],
    });
  };

  const handleChoiceInput = (index, value) => {
    const newChoices = [...currentQuestion.options];
    newChoices[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newChoices });
  };

  const handleNext = async () => {
    const updateIndex = currentQuestion?.updateIndex;
    const sectionCopy =[...currentTest.sections]
    if (updateIndex === null) {
      console.log("executing");
      const updatedQuestions = await addNewQuestion(
        TestId,
        currentSection + 1,
        currentQuestion
      );
      setCurrentTest(updatedQuestions);
      setCurrentQuestion(initialState);
      console.log("added", updatedQuestions);
    } else if (
      updateIndex + 1 ===
      sectionCopy[currentSection]?.questions?.length
    ) {
      const updatedQuestions = await editQuestions(
        TestId,
        currentSection + 1,
        currentQuestion?.updateIndex,
        currentQuestion
      );
      setCurrentTest(updatedQuestions);
      setCurrentQuestion(initialState)
      console.log("updated-last", updatedQuestions);
    } else {
      let nextIndex = currentQuestion.updateIndex+1
      const updatedQuestions = await editQuestions(
        TestId,
        currentSection + 1,
        currentQuestion?.updateIndex,
        currentQuestion
      );
      if(updatedQuestions) setCurrentTest(updatedQuestions)
      if(updatedQuestions) setCurrentQuestion({...updatedQuestions?.sections[currentSection]?.questions[nextIndex],updateIndex:nextIndex});
    }
  };

  const checkquestionMatch = (index, section) => {
    if (currentQuestion?.updateIndex === index && currentSection === section)
      return "#8949ff";
    return "transparent";
  };

  const questionValidation = () => {
    if (
      currentQuestion?.question?.length > 5 &&
      currentQuestion?.answer &&
      currentQuestion?.options?.length === 4
    )
      return true;
    return false;
  };

  useEffect(() => {
    const fetchEla = async () => {
      const { data } = await getEla();
      setTestId(data[0]?._id);
      setCurrentTest(data[0]);
      setTime(secondsToUtc(data[0]?.time))
    };
    fetchEla();
  }, []);

  useEffect(() => {
    const getTimeInSeconds = () => {
      const seconds = UTCtoSeconds(time);
      setCurrentTest(prevTest => {
        let currentData = { ...prevTest };
        currentData.time = seconds;
        return currentData;
      });
    };
    getTimeInSeconds();
  }, [time]); 
  

  const changeDifficulty = (difficulty) => {
    let currentData = {...currentTest};
    currentData.difficulty = difficulty;
    setCurrentTest(currentData);
  };

  const updateTags = (value) => {
    let currentData = {...currentTest};
    const tagsArray = value?.split(",");
    currentData.tags = tagsArray;
    setCurrentTest(currentData);
  };

  const updateSectionDetails = async () => {
    if (!Array.isArray(currentTest.tags))
      updateTags(currentTest.tags);
    let questionDetails = {
      time: currentTest.time,
      difficulty: currentTest.difficulty,
      tags: currentTest.tags,
      description: currentTest.description,
    };
    const data = await editQuestionDetails(
      TestId,
      questionDetails
    );
    if(data) setCurrentTest(data);
  };

  const deleteQuestionByIndex = async () => {
    console.log(currentSection)
    if (currentQuestion.updateIndex !== null) {
      const res = await deleteSingleQuestion(
        TestId,
        currentTest?.sections[currentSection].section,
        currentQuestion.updateIndex
      );
     if(res) setCurrentTest(res);
    }
  };

  const deleteSection = async () => {
    console.log( currentTest)
    const res = await deleteSingleSection(
      TestId,
      currentTest?.sections[currentSection]?.section
    );
    setCurrentTest(res);
    if (res) setCurrentTest(res);
  };

  const addNewSection = async () => {
    const res = await addSection(TestId, {
      section: currentTest?.sections?.length + 1,
    });
   if(res) setCurrentTest(res);
  };

  console.log(currentQuestion,currentSection)
  return (
    <div className="ela-test-page">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}  // Navigates back
      >
        Back
      </button>
      <p className="ela-title">Create or Edit your ELA assessment</p>
      <div className="questions-block-cnt justify-section-cnt">
        {currentTest?.sections?.length > 0 &&
          currentTest?.sections?.map((section, sectionIndex) => (
            <div
              className="section-cnt"
              onClick={() => setCurrentSection(sectionIndex)}
              style={{ background: currentSection === sectionIndex && "#FFA500" }}
              key={sectionIndex}
            >
              <div className="section-indicator">
                <p>{`Section-${sectionIndex + 1}`}</p>
              </div>
              <div className="questions-block-cover">
                {section?.questions?.map((test, index) => (
                  <div
                    className="question-block"
                    style={{
                      background: checkquestionMatch(
                        index,
                        sectionIndex
                      ),
                    }}
                    key={index}
                    onClick={() =>
                      setCurrentQuestion({
                        ...test,
                        updateIndex:
                          test.updateIndex !== undefined
                            ? test.updateIndex
                            : index,
                      })
                    }
                  >
                    <p
                      key={index}
                      className="question-number"
                      style={{
                        color:
                          checkquestionMatch(index, sectionIndex) ===
                            "transparent" && "#8949ff",
                      }}
                    >
                      {index + 1}
                    </p>
                  </div>
                ))}
                <div
                  className="question-block"
                  style={{
                    background: checkquestionMatch(null, sectionIndex),
                  }}
                  onClick={() => setCurrentQuestion(initialState)}
                >
                  <p
                    className="question-number"
                    a
                    style={{
                      color:
                        checkquestionMatch(null, sectionIndex) ===
                          "transparent" && "#8949ff",
                    }}
                  >
                    {section?.questions?.length + 1}
                  </p>
                </div>
              </div>
            </div>
          ))}
        <div className="ela-new-section-btn" onClick={() => addNewSection()}>
          <div className="new-section-btn-text">
            <p>Add Section</p>
          </div>
        </div>
      </div>
      <div className="ela-inputs-cnt">
        <div className="ela-question-input-cnt">
          <div>
            <p>Question</p>
            <textarea
              className="question-input ela-question-input"
              value={currentQuestion?.question}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  question: e.target.value,
                })
              }
            />
          </div>
          <div className="ela-choice-input-cover">
            <div className="choice-header">
              <p>Choices</p>
              <div className="select-answer-cnt">
                <p>Select Answer</p>
                <div className="selected-choice-display">
                  <p onClick={() => setDropDown(true)}>
                    {currentQuestion?.answer
                      ? currentQuestion?.answer
                      : "Not selected"}
                  </p>
                  {dropDown && (
                    <div className="drop-down-cnt">
                      <div
                        className="drop-down-choice"
                        onClick={() => handleChoiceSelect(0)}
                      >
                        <p>Choice one</p>
                      </div>
                      <div
                        className="drop-down-choice"
                        onClick={() => handleChoiceSelect(1)}
                      >
                        <p>Choice two</p>
                      </div>
                      <div
                        className="drop-down-choice"
                        onClick={() => handleChoiceSelect(2)}
                      >
                        <p>Choice three</p>
                      </div>
                      <div
                        className="drop-down-choice"
                        onClick={() => handleChoiceSelect(3)}
                      >
                        <p>Choice four</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="choice-cnt ela-choice-cnt">
              <div className="choice ela-choice">
                <p>Choice one</p>
                <input
                  type="text"
                  placeholder="Enter choice one"
                  value={
                    currentQuestion?.options[0]
                      ? currentQuestion?.options[0]
                      : ""
                  }
                  onChange={(e) => handleChoiceInput(0, e.target.value)}
                />
              </div>
              <div className="choice ela-choice">
                <p>Choice two</p>
                <input
                  type="text"
                  placeholder="Enter choice two"
                  value={
                    currentQuestion?.options[1]
                      ? currentQuestion?.options[1]
                      : ""
                  }
                  onChange={(e) => handleChoiceInput(1, e.target.value)}
                />
              </div>
              <div className="choice ela-choice">
                <p>Choice three</p>
                <input
                  type="text"
                  placeholder="Enter choice three"
                  value={
                    currentQuestion?.options[2]
                      ? currentQuestion?.options[2]
                      : ""
                  }
                  onChange={(e) => handleChoiceInput(2, e.target.value)}
                />
              </div>
              <div className="choice ela-choice">
                <p>Choice four</p>
                <input
                  type="text"
                  placeholder="Enter choice four"
                  value={
                    currentQuestion?.options[3]
                      ? currentQuestion?.options[3]
                      : ""
                  }
                  onChange={(e) => handleChoiceInput(3, e.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            className=" course-delete-btn save-next-mobile "
            onClick={() => handleNext()}
            style={{
              background: !questionValidation() && "gray",
              pointerEvents: !questionValidation() && "none",
            }}
          >
            Save and Next
          </div>
        </div>
        <div className="ela-question-info-cnt">
          <div className="ela-description-cnt">
            <p>Set Duration</p>
            <div className="ela-timer-input-cnt">
              <div className="ela-timer-cover">
                <input
                  type="text"
                  value={time?.hour}
                  className="ela-timer-input description-input "
                  onChange={(e) => setTime({ ...time, hour: e.target.value })}
                />
                <p>Hours</p>
              </div>
              <div className="ela-timer-cover">
                <input
                  type="text"
                  value={time?.minute}
                  onChange={(e) => setTime({ ...time, minute: e.target.value })}
                  className="ela-timer-input description-input "
                />
                <p>Minutes</p>
              </div>
            </div>
          </div>
          <div className="ela-description-cnt">
            <p>Describe the test</p>
            <textarea
              type="text"
              value={currentTest?.description}
              onChange={(e) => {
                setCurrentTest({...currentTest,description:e.target.value});
              }}
              className="ela-description description-input "
            />
          </div>
          <div className="ela-description-cnt">
            <p>Select Test Difficulty</p>
            <div
              className="ela-dropdown-box"
              onClick={() => setDifficultyDropDown(!difficultyDropDown)}
            >
              <p>
                {currentTest?.difficulty
                  ? currentTest?.difficulty
                  : "Choose"}
              </p>
              {difficultyDropDown && (
                <div className="ela-dropdown-cnt">
                  <div
                    className="ela-dropdown-element"
                    onClick={() => changeDifficulty("Easy")}
                  >
                    <p style={{ color: "green" }}>Easy</p>
                  </div>
                  <div
                    className="ela-dropdown-element"
                    onClick={() => changeDifficulty("Medium")}
                  >
                    <p style={{ color: "orange" }}>Medium</p>
                  </div>
                  <div
                    className="ela-dropdown-element"
                    onClick={() => changeDifficulty("Hard")}
                  >
                    <p style={{ color: "red" }}>Hard</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="ela-description-cnt">
            <p>Tags (separated by coma ',')</p>
            <input
              type="text"
              value={
                Array.isArray(currentTest?.tags)
                  ? currentTest?.tags.join(", ")
                  : currentTest?.tags || ""
              }
              onChange={(e) => {
                setCurrentTest({...currentTest,tags:e.target.value});
              }}
              className="ela-tags description-input "
            />
          </div>
          <div
            className="ela-update-btn"
            onClick={() => updateSectionDetails()}
          >
            <p> Save Section Details</p>
          </div>
        </div>
      </div>
      <div className="action-btns-cnt ela-actions-btn-cnt">
        <div
          className=" course-delete-btn cancel-test-btn"
          onClick={() => deleteQuestionByIndex()}
        >
          Delete question
        </div>
        <div
          className=" course-delete-btn cancel-test-btn"
          onClick={() => deleteSection()}
        >
          Delete Entire Section
        </div>
        <div
          className=" course-delete-btn save-next"
          onClick={() => handleNext()}
          style={{
            background: !questionValidation() && "gray",
            pointerEvents: !questionValidation() && "none",
          }}
        >
          Save and Next
        </div>
      </div>
    </div>
  );
};

export default ELA;
