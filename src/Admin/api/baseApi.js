import axios from "axios";

const API = axios.create({
  baseURL: "https://csuite-ui0f.onrender.com/api",
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

// User endpoints
export const addnewUser = (userdata) => API.post("/user", userdata);
export const allUsers = () => API.get("/user");
export const updateUser = (userdata, Id) => API.put(`/user/${Id}`, userdata);
export const deleteUser = (Id) => API.delete(`/user/${Id}`);

// Purchases endpoints
export const allPurchases = () => API.get(`/payment`);

// Courses endpoints
export const addnewCourse = (courseData) => {
  return API.post("/courseDetail/add", courseData);
};
export const getAllCourse = () => API.get("/courseDetail");
export const uploadVideo = (formdata) => 
  API.post("/uploadtovimeo", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const uploadDocument = (formdata) =>
  API.post("/uploadtodrive", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateCourse = (updatedData) =>
  API.put(`/courseDetail/edit/${updatedData?._id}`, updatedData);
export const deleteCourse = (courseId) =>
  API.delete(`/courseDetail/delete/${courseId}`);

// Test endpoints
export const addnewTest = (testData) => API.post("/tests", testData);
export const updateTest = (testData) => API.put(`/tests/${testData._id}`, testData);
export const getLessonTest = (testId) => API.get(`/tests/${testId}`);

// ELA endpoints
export const getEla = () => API.get(`question`);
export const addQuestion = (questionId, section, question) =>
  API.post(`question/${questionId}/sections/${section}/questions`, question);
export const updateQuestion = (questionId, section, index, questionData) =>
  API.put(`question/${questionId}/sections/${section}/questions/${index}`, questionData);
export const updateQuestionDetails = (questionId, questionDetails) =>
  API.put(`question/${questionId}`, questionDetails);
export const deleteQuestion = (questionId, section, index) =>
  API.delete(`question/${questionId}/sections/${section}/questions/${index}`);
export const deleteTestSection = (questionId, section) =>
  API.delete(`question/${questionId}/sections/${section}`);
export const addSectionToTest = (questionId, section) =>
  API.post(`question/${questionId}/sections`, section);

// hooks/newCourseFunctions.js
export const convertToCourseFormData = (courseData) => {
  const formData = new FormData();
  
  // Add basic course details
  formData.append("title", courseData.title);
  formData.append("description", courseData.description);
  formData.append("price", courseData.price);
  
  // Add thumbnail if exists
  if (courseData.thumbnail) {
    formData.append("thumbnail", courseData.thumbnail);
  }
  
  // Add overview points as JSON string
  if (courseData.overviewPoints && courseData.overviewPoints.length > 0) {
    formData.append("overviewPoints", JSON.stringify(courseData.overviewPoints));
  }
  
  // Add lessons as JSON string
  if (courseData.lessons && courseData.lessons.length > 0) {
    formData.append("lessons", JSON.stringify(courseData.lessons));
  }
  
  return formData;
};
