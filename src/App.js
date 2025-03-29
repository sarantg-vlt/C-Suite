// import './App.css';

// //Bootstrap imported
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';

// //react-router
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// //Landingpage
// import Landingpage from './LandingPage/Landingpage/Landingpage';
// import Management from './LandingPage/Managements/Management';
// import Brands from './LandingPage/Brands/Brands';
// import Footer from './LandingPage/Footer/Footer';
// import ContactUs from './LandingPage/ContactUs/ContactUs';
// import FindPricing from './LandingPage/FindPricing/FindPricing';
// import Partners from './LandingPage/Partners/Partners';
// import Success from './LandingPage/Success/Success';
// import Engage from './LandingPage/Engage/Engage'
// // import Overlaycards from './LandingPage/Overlaycards/Overlaycards'

// //Assessments
// import Entrylevel from './Assessments/Entrylevel/Entrylevel';
// import Closelevel from './Assessments/Closelevel/Closelevel';
// import Assessmentsstart from './Assessments/Assessmentsstart/Assessmentsstart'
// import Authentication from './Authentication/Authentication';

// import Dashboard from './Dashboard/Dashboard';
// import Home from './Dashboard/Components/Home/Home';
// import Courses from './Dashboard/Components/Courses/Courses';
// import CoursesLandingPage from './LandingPage/Courses/CoursesLandingPage';
// import Profile from './Dashboard/Components/Profile/Profile';
// import CourseContent from "./Dashboard/Components/CourseContent/CourseContent";
// import CourseDetails from "./Dashboard/Components/CourseDetails/CourseDetails";
// import Enrolled from "./Dashboard/Components/Enrolled/Enrolled";
// import TestPage from "./Dashboard/Components/TestPage/TestPage";

// import AllCourses from './Admin/components/courses/AllCourses';
// import AddnewCourse from './Admin/components/courses/new-course/AddnewCourse';
// import EditCourse from './Admin/components/courses/edit-course/EditCourse';
// import Allusers from './Admin/components/userManagement/Allusers';
// import PurchasesPage from './Admin/components/purchases/PurchasesPage';
// import AllInstructors from './Admin/components/Instructors/AllInstructors';
// import ELApage from "./Admin/components/ELA/ELApage";
// import Notification from "./Admin/components/Notification/Notification";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Auth from './Auth/components/auth/Auth';
// import AdminLoginPage from './Auth/components/auth/AdminLoginPage';
// import ResetPage from './Auth/components/auth/ResetPage';
// import LinkedInAuth from './Auth/components/auth/LinkedInAuth';
// import AuthContainer from './Auth';
// import MoreDetails from './LandingPage/Managements/MoreDetails';
// import CoursePreview from './LandingPage/Courses/CoursePreview';

// //footer start

// // about LMS  start
// import Features from './LandingPage/Footer/AboutLMS/Features/Features';
// import Pricing from './LandingPage/Footer/AboutLMS/Pricing/Pricing';
// import Integrations from './LandingPage/Footer/AboutLMS/Integrations/Integrations';
// import Reviews from './LandingPage/Footer/AboutLMS/Reviews/Reviews';
// import Events from './LandingPage/Footer/AboutLMS/Events/Events';
// // about LMS end

// // Supports start
// import CustomerSupport from './LandingPage/Footer/Support/CustomerSupport/CustomerSupport'
// import HelpDesk from './LandingPage/Footer/Support/HelpDesk/HelpDesk'
// import ProfessionalServices from './LandingPage/Footer/Support/ProfessionalServices/ProfessionalServices'
// import ContactManagement from './Admin/components/Contact/ContactManagement';
// import ReviewManagement from './Admin/components/Review/ReviewManagement';
// // Supports end

// //bottom footer start
// import RefoundPolicy from './LandingPage/Footer/BottomFooter/RefoundPolicy/RefoundPolicy';
// import PrivacyPolicy from './LandingPage/Footer/BottomFooter/PrivacyPolicy/PrivacyPolicy';
// import TermsAndConditions from './LandingPage/Footer/BottomFooter/TermsAndConditions/TermsAndConditions';
// import EventPage from './Admin/components/Events/EventPage';
// import { useEffect } from 'react';
// // import EditEvent from './Admin/components/Events/EditEvent';
// //bottom footer end
// //footer end

// function App() {
//   // useEffect(() => {
//   //   // Block right-click functionality
//   //   const handleRightClick = (e) => {
//   //     e.preventDefault(); // Prevent the context menu
//   //   };
//   //   document.addEventListener("contextmenu", handleRightClick);

//   //   // Block common DevTools shortcuts
//   //   const handleKeyDown = (e) => {
//   //     // Disable F12, Ctrl+Shift+I, and Ctrl+Shift+J
//   //     if (
//   //       (e.key === 'F12') ||
//   //       (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))
//   //     ) {
//   //       e.preventDefault();
//   //     }
//   //   };
//   //   document.addEventListener("keydown", handleKeyDown);

//   //   // Detect if DevTools is open and take actions (e.g., block access)
//   //   const detectDevTools = () => {
//   //     const widthThreshold = 160;  // Width when DevTools is opened
//   //     const devToolsOpened = window.outerWidth - window.innerWidth > widthThreshold;
//   //     if (devToolsOpened) {
//   //       alert("Developer Tools are disabled on this site.");
//   //       // You can redirect or take other actions here, like logging the user out
//   //     }
//   //   };

//   //   setInterval(detectDevTools, 1000); // Check every second

//   //   return () => {
//   //     document.removeEventListener("contextmenu", handleRightClick);
//   //     document.removeEventListener("keydown", handleKeyDown);
//   //   };
//   // }, []);
//   return (
//     <div style={{ width: "100vw", overflow: "hidden" }}>
//       <Router>
//         <ToastContainer />
//         <Routes>
//           <Route
//             path="/"
//             element={[
//               <Landingpage />,
//               <Management />,
//               <Brands />,
//               // <Success/>,
//               // <Engage/>,
//               <CoursesLandingPage />,
//               // <Partners />,
//               <FindPricing />,
//               <ContactUs />,
//               <Footer />,
//             ]}
//           />
//           <Route
//             path="/management/details"
//             index
//             element={<MoreDetails />}
//           ></Route>
//           <Route path="/authentication" element={<Auth />} />
//           <Route path="/admin/login" element={<AdminLoginPage />} />
//           <Route path="/course-preview" element={<CoursePreview />} />
//           {/* <Route path="/reset-password" element={<ResetPage />} /> */}
//           <Route path="/reset-password" element={<ResetPage />} />
//           <Route path="auth-linkedin-bridge" element={<LinkedInAuth />} />

//           {/* <Route path="/authentication" element={<Authentication></Authentication>}></Route> */}
//           <Route path="/quick-assessment" element={<Entrylevel />} />
//           <Route path="/assessment-page" element={<Assessmentsstart />} />
//           <Route path="/finish-assessment" element={<Closelevel />} />

//           {/* footer start */}
//           <Route path="/payment" element={<Pricing />}></Route>
//           <Route path="/features" element={<Features />}></Route>
//           <Route path="/integrations" element={<Integrations />}></Route>
//           <Route path="/events" element={<Events />}></Route>
//           <Route path="/reviews" element={<Reviews />}></Route>

//           <Route path="/customersupport" element={<CustomerSupport />} />
//           <Route path="/helpdesk" element={<HelpDesk />} />
//           <Route
//             path="/profressionalservices"
//             element={<ProfessionalServices />}
//           />

//           <Route path="/terms" element={<TermsAndConditions />} />
//           <Route path="/privacy" element={<PrivacyPolicy />} />
//           <Route path="/refund" element={<RefoundPolicy />} />
//           {/* footer end */}

//           <Route path="/home" element={<Dashboard />}>
//             <Route path="" index element={<Home />}></Route>
//             <Route path="courses" index element={<Courses />}></Route>
//             <Route path="profile" index element={<Profile />}></Route>
//             <Route path="enrolled" index element={<Enrolled />}></Route>
//             {/* <Route path="test/:lessonId" index element={<TestPage />} /> */}
//             <Route
//               path="tests/:testId/user/:userId"
//               // path="test/:courseTitle/:courseId/:lessonId"
//               element={<TestPage />}
//             />
//             {/* <Route
//               path="courseContent"
//               index
//               element={<CourseContent />}
//             ></Route>
//             <Route
//               path="courseDetails"
//               index
//               element={<CourseDetails />}
//             ></Route> */}
//             <Route path="courseContent/:courseId" element={<CourseContent />} />
//             <Route path="courseDetails/:courseId" element={<CourseDetails />} />
//           </Route>

//           <Route path="/admin" element={<AllCourses />} />
//           <Route path="/admin/Courses/new" element={<AddnewCourse />} />
//           <Route path="/admin/Course/edit/:id" element={<EditCourse />} />
//           <Route path="/admin/users" element={<Allusers />} />
//           <Route path="/admin/events" element={<EventPage />} />
//           {/* <Route path='/admin/events/:id' element={<EditEvent/>} /> */}
//           <Route path="/admin/purchases" element={<PurchasesPage />} />
//           {/* <Route path="admin/instructors" element={<AllInstructors />} /> */}
//           <Route path="admin/Review" element={<ReviewManagement />} />
//           <Route path="admin/ela" element={<ELApage />} />
//           <Route path="admin/contactus" element={<ContactManagement />} />
//           <Route path="admin/notification" element={<Notification />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import "./App.css";

//Bootstrap imported
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

//react-router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Landingpage
import Landingpage from "./LandingPage/Landingpage/Landingpage";
import Management from "./LandingPage/Managements/Management";
import Brands from "./LandingPage/Brands/Brands";
import Footer from "./LandingPage/Footer/Footer";
import ContactUs from "./LandingPage/ContactUs/ContactUs";
import FindPricing from "./LandingPage/FindPricing/FindPricing";
import Partners from "./LandingPage/Partners/Partners";
import Success from "./LandingPage/Success/Success";
import Engage from "./LandingPage/Engage/Engage";
// import Overlaycards from './LandingPage/Overlaycards/Overlaycards'

//Assessments
import Entrylevel from "./Assessments/Entrylevel/Entrylevel";
import Closelevel from "./Assessments/Closelevel/Closelevel";
import Assessmentsstart from "./Assessments/Assessmentsstart/Assessmentsstart";
import Authentication from "./Authentication/Authentication";

import Dashboard from "./Dashboard/Dashboard";
import Home from "./Dashboard/Components/Home/Home";
import Courses from "./Dashboard/Components/Courses/Courses";
import CoursesLandingPage from "./LandingPage/Courses/CoursesLandingPage";
import Profile from "./Dashboard/Components/Profile/Profile";
import CourseContent from "./Dashboard/Components/CourseContent/CourseContent";
import CourseDetails from "./Dashboard/Components/CourseDetails/CourseDetails";
import Enrolled from "./Dashboard/Components/Enrolled/Enrolled";
import TestPage from "./Dashboard/Components/TestPage/TestPage";
import Marks from "./Dashboard/Components/Marks/Marks";

import AllCourses from "./Admin/components/courses/AllCourses";
import AddnewCourse from "./Admin/components/courses/new-course/AddnewCourse";
import EditCourse from "./Admin/components/courses/edit-course/EditCourse";
import Allusers from "./Admin/components/userManagement/Allusers";
import PurchasesPage from "./Admin/components/purchases/PurchasesPage";
import AllInstructors from "./Admin/components/Instructors/AllInstructors";
import ELApage from "./Admin/components/ELA/ELApage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./Auth/components/auth/Auth";
import AdminLoginPage from "./Auth/components/auth/AdminLoginPage";
import ResetPage from "./Auth/components/auth/ResetPage";
import LinkedInAuth from "./Auth/components/auth/LinkedInAuth";
import AuthContainer from "./Auth";
import MoreDetails from "./LandingPage/Managements/MoreDetails";
import CoursePreview from "./LandingPage/Courses/CoursePreview";

//footer start

// about LMS  start
import Features from "./LandingPage/Footer/AboutLMS/Features/Features";
import Pricing from "./LandingPage/Footer/AboutLMS/Pricing/Pricing";
import Integrations from "./LandingPage/Footer/AboutLMS/Integrations/Integrations";
import Reviews from "./LandingPage/Footer/AboutLMS/Reviews/Reviews";
import Events from "./LandingPage/Footer/AboutLMS/Events/Events";
// about LMS end

// Supports start
import CustomerSupport from "./LandingPage/Footer/Support/CustomerSupport/CustomerSupport";
import HelpDesk from "./LandingPage/Footer/Support/HelpDesk/HelpDesk";
import ProfessionalServices from "./LandingPage/Footer/Support/ProfessionalServices/ProfessionalServices";
import ContactManagement from "./Admin/components/Contact/ContactManagement";
import Notification from "./Admin/components/Notification/Notification";
import ReviewManagement from "./Admin/components/Review/ReviewManagement";
// Supports end

//bottom footer start
import RefoundPolicy from "./LandingPage/Footer/BottomFooter/RefoundPolicy/RefoundPolicy";
import PrivacyPolicy from "./LandingPage/Footer/BottomFooter/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./LandingPage/Footer/BottomFooter/TermsAndConditions/TermsAndConditions";
import EventPage from "./Admin/components/Events/EventPage";
import { useEffect } from "react";
// import EditEvent from './Admin/components/Events/EditEvent';
//bottom footer end
//footer end

import Request from "./Dashboard/Components/Request/Request";

import Appointments from "./Admin/components/Appointments/Appointments";
import TestCourseContent from "./Dashboard/Components/CourseContent/TestCourseContent/TestCourseContent";
import Header from "./LandingPage/Header/Header";

function App() {
  // useEffect(() => {
  //   // Block right-click functionality
  //   const handleRightClick = (e) => {
  //     e.preventDefault(); // Prevent the context menu
  //   };
  //   document.addEventListener("contextmenu", handleRightClick);

  //   // Block common DevTools shortcuts
  //   const handleKeyDown = (e) => {
  //     // Disable F12, Ctrl+Shift+I, and Ctrl+Shift+J
  //     if (
  //       (e.key === 'F12') ||
  //       (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))
  //     ) {
  //       e.preventDefault();
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);

  //   // Detect if DevTools is open and take actions (e.g., block access)
  //   const detectDevTools = () => {
  //     const widthThreshold = 160;  // Width when DevTools is opened
  //     const devToolsOpened = window.outerWidth - window.innerWidth > widthThreshold;
  //     if (devToolsOpened) {
  //       alert("Developer Tools are disabled on this site.");
  //       // You can redirect or take other actions here, like logging the user out
  //     }
  //   };

  //   setInterval(detectDevTools, 1000); // Check every second

  //   return () => {
  //     document.removeEventListener("contextmenu", handleRightClick);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);
  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={[
              <Header />,
              <Landingpage />,
              <Management />,
              <Brands />,
              // <Success/>,
              // <Engage/>,
              <CoursesLandingPage />,
              // <Partners />,
              <FindPricing />,
              <ContactUs />,
              <Footer />,
            ]}
          />
          <Route
            path="/management/details"
            index
            element={<MoreDetails />}
          ></Route>
          <Route path="/authentication" element={<Auth />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/course-preview" element={<CoursePreview />} />
          {/* <Route path="/reset-password" element={<ResetPage />} /> */}
          <Route path="/reset-password" element={<ResetPage />} />
          <Route path="auth-linkedin-bridge" element={<LinkedInAuth />} />

          {/* <Route path="/authentication" element={<Authentication></Authentication>}></Route> */}
          <Route path="/quick-assessment" element={<Entrylevel />} />
          <Route path="/assessment-page" element={<Assessmentsstart />} />
          <Route path="/finish-assessment" element={<Closelevel />} />

          {/* footer start */}
          <Route path="/payment" element={<Pricing />}></Route>
          <Route path="/features" element={<Features />}></Route>
          <Route path="/integrations" element={<Integrations />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/reviews" element={<Reviews />}></Route>

          <Route path="/customersupport" element={<CustomerSupport />} />
          <Route path="/helpdesk" element={<HelpDesk />} />
          <Route
            path="/profressionalservices"
            element={<ProfessionalServices />}
          />

          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefoundPolicy />} />
          {/* footer end */}

          <Route path="/home" element={<Dashboard />}>
            <Route path="" index element={<Home />}></Route>
            <Route path="courses" index element={<Courses />}></Route>
            <Route path="profile" index element={<Profile />}></Route>
            <Route path="enrolled" index element={<Enrolled />}></Route>
            <Route path="marks" index element={<Marks />}></Route>

            <Route path="request" index element={<Request />}></Route>
            {/* <Route path="test/:lessonId" index element={<TestPage />} /> */}
            <Route
              path="tests/:testId/user/:userId"
              // path="test/:courseTitle/:courseId/:lessonId"
              element={<TestPage />}
            />
            {/* <Route
              path="courseContent"
              index
              element={<CourseContent />}
            ></Route>
            <Route
              path="courseDetails"
              index
              element={<CourseDetails />}
            ></Route> */}
            <Route path="courseContent/:courseId" element={<CourseContent />} />
            <Route path="courseDetails/:courseId" element={<CourseDetails />} />
            <Route
              path="courseContent/:courseId/test"
              element={<TestCourseContent />}
            />
          </Route>

          <Route path="/admin" element={<AllCourses />} />
          <Route path="/admin/Courses/new" element={<AddnewCourse />} />
          <Route path="/admin/Course/edit/:id" element={<EditCourse />} />
          <Route path="/admin/users" element={<Allusers />} />
          <Route path="/admin/events" element={<EventPage />} />
          {/* <Route path='/admin/events/:id' element={<EditEvent/>} /> */}
          <Route path="/admin/purchases" element={<PurchasesPage />} />
          {/* <Route path="admin/instructors" element={<AllInstructors />} /> */}
          <Route path="admin/Review" element={<ReviewManagement />} />
          <Route path="admin/ela" element={<ELApage />} />
          <Route path="admin/contactus" element={<ContactManagement />} />
          <Route path="admin/Notification" element={<Notification />} />
          <Route path="admin/Appointents" element={<Appointments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
