import './App.css';

//Bootstrap imported
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

//react-router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Landingpage
import Landingpage from './LandingPage/Landingpage/Landingpage';
import Management from './LandingPage/Managements/Management';
import Brands from './LandingPage/Brands/Brands';
import Footer from './LandingPage/Footer/Footer';
import ContactUs from './LandingPage/ContactUs/ContactUs';
import FindPricing from './LandingPage/FindPricing/FindPricing';
import Partners from './LandingPage/Partners/Partners';
import Success from './LandingPage/Success/Success';
import Engage from './LandingPage/Engage/Engage'
// import Overlaycards from './LandingPage/Overlaycards/Overlaycards'

//Assessments
import Entrylevel from './Assessments/Entrylevel/Entrylevel';
import Closelevel from './Assessments/Closelevel/Closelevel';
import Assessmentsstart from './Assessments/Assessmentsstart/Assessmentsstart'
import Authentication from './Authentication/Authentication';

import Pricing from './FooterPage/Pricing';
import Feautures from './FooterPage/Features';
import Integrations from './FooterPage/Integrations';
import Events from './FooterPage/Events';
import Reviews from './FooterPage/Reviews';
import Helpdesk from './FooterPage/Helpdesk';
import Customersupport from './FooterPage/Customersupport';
import Professionalservice from './FooterPage/Professionalservice';

import Dashboard from './Dashboard/Dashboard';
import Home from './Dashboard/Components/Home/Home';
import Courses from './Dashboard/Components/Courses/Courses';
import CoursesLandingPage from './LandingPage/Courses/CoursesLandingPage';
import Profile from './Dashboard/Components/Profile/Profile';
import CourseContent from "./Dashboard/Components/CourseContent/CourseContent";
import CourseDetails from "./Dashboard/Components/CourseDetails/CourseDetails";
import Enrolled from "./Dashboard/Components/Enrolled/Enrolled";
import TestPage from "./Dashboard/Components/TestPage/TestPage";

import AllCourses from './Admin/components/courses/AllCourses';
import AddnewCourse from './Admin/components/courses/new-course/AddnewCourse';
import EditCourse from './Admin/components/courses/edit-course/EditCourse';
import Allusers from './Admin/components/userManagement/Allusers';
import PurchasesPage from './Admin/components/purchases/PurchasesPage';
import AllInstructors from './Admin/components/Instructors/AllInstructors';
import ELApage from "./Admin/components/ELA/ELApage";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from './Auth/components/auth/Auth';
import AdminLoginPage from './Auth/components/auth/AdminLoginPage';
import ResetPage from './Auth/components/auth/ResetPage';
import LinkedInAuth from './Auth/components/auth/LinkedInAuth';
import AuthContainer from './Auth';
import MoreDetails from './LandingPage/Managements/MoreDetails';
import CoursePreview from './LandingPage/Courses/CoursePreview';

function App() {
  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/"
            element={
              [<Landingpage />,
              <Management />,
              <Brands />,
              // <Success/>,
              // <Engage/>,
              <CoursesLandingPage />,
              // <Partners />,
              <FindPricing />,
              <ContactUs />,
              <Footer />
              ]
            }
          />
          <Route path="/management/details" index element={<MoreDetails />}></Route>
          <Route path='/authentication' element={<Auth />} />
          <Route path="/admin/login" element={<AdminLoginPage />} /> 
          <Route path='/course-preview' element={<CoursePreview />} />
          <Route path="reset-password" element={<ResetPage />} />
          <Route path="auth-linkedin-bridge" element={<LinkedInAuth />} />

          {/* <Route path="/authentication" element={<Authentication></Authentication>}></Route> */}
          <Route path="/quick-assessment" element={<Entrylevel />} />
          <Route path="/assessment-page" element={<Assessmentsstart />} />
          <Route path="/finish-assessment" element={<Closelevel />} />

          <Route path='/payment' element={<Pricing></Pricing>}></Route>

          <Route path='/home' element={<Dashboard />}>
            <Route path='' index element={<Home />}></Route>
            <Route path="courses" index element={<Courses />}></Route>
            <Route path="profile" index element={<Profile />}></Route>
            <Route path="enrolled" index element={<Enrolled />}></Route>
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
          </Route>

          <Route path='/admin' element={<AllCourses />} />
          <Route path="/admin/Courses/new" element={<AddnewCourse />} />
          <Route path="/admin/Course/edit" element={<EditCourse />} />
          <Route path="/admin/users" element={<Allusers />} />
          <Route path="/admin/purchases" element={<PurchasesPage />} />
          <Route path="admin/instructors" element={<AllInstructors />} />
          <Route path="admin/ela" element={<ELApage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
