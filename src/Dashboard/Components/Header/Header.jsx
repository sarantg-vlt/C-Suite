// // src/components/Header.js
// import React from "react";
// import "./Header.css";
// import { Link } from 'react-router-dom';

// const Header = () => {
//   const user = localStorage.getItem("name") || "";

//   return (
//     <header1 className="header1">
//       <div className="welcome-message">
//         <h1>Welcome Back, {user}!</h1>
//         <p>
//           There are many variations of passages of Lorem Ipsum available, but
//           the majority have suffered alteration
//         </p>
//         <Link to={'./Courses'}>
//         <button>Get Started</button>
//         </Link>
//       </div>
//     </header1>
//   );
// };

// export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";
import './Header.css'
import { MoveUpRight } from "lucide-react";
const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("./Courses");
  };
  const user = localStorage.getItem("name") || "";
  return (
    <>
      <div className="header">
        <p className="headerTitle"> Welcome {user}👋.</p>
        <p className="headerDescription">
          Explore our comprehensive Learning Management System with personalized
          courses, assessments, and interactive content for your growth.
        </p>
        <button className="headerbtn" onClick={handleClick}>Start <MoveUpRight height={15} /></button>
      </div>
    </>
  );
};

export default Header;
