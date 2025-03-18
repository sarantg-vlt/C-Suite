import {
  addQuestion,
  addSectionToTest,
  deleteQuestion,
  deleteTestSection,
  updateQuestion,
  updateQuestionDetails,
} from "../api/baseApi";

export const addNewQuestion = async (testId, section, question) => {
  console.log(testId, section, question);
  try {
    const { data } = await addQuestion(testId, section, question);
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editQuestions = async (testId, section, questionIndex, questionData) => {
  console.log(testId, section, questionIndex, questionData);
  try {
    const { data } = await updateQuestion(testId, section, questionIndex, questionData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editQuestionDetails = async (testId, sectionData) => {
  console.log(testId, sectionData);
  try {
    const { data } = await updateQuestionDetails(testId, sectionData);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error updating section:", error.message);
  }
};

export const deleteSingleQuestion = async (testId, section, questionIndex) => {
  console.log(testId, section, questionIndex);
  try {
    const { data } = await deleteQuestion(testId, section, questionIndex);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error updating section:", error);
  }
};
export const deleteSingleSection = async (testId, section) => {
  console.log(testId, section);
  try {
    const { data } = await deleteTestSection(testId, section);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error updating section:", error);
  }
};

export const addSection = async (testId, sectionData) => {
  console.log(testId, sectionData);
  try {
    const { data } = await addSectionToTest(testId, sectionData);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error updating section:", error);
  }
};

export const UTCtoSeconds = (timeObj) => {
  let { hour, minute } = timeObj;
  minute += hour * 60;
  return minute * 60;
};

export const secondsToUtc = (seconds) => {
  console.log(seconds)
  let minute = Math.floor(seconds / 60);
  let hour = Math.floor(minute / 60);
  minute -= hour * 60;
  return { hour, minute };
};
