// // Header.jsx
// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import NavSlider from "./NavSlider";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import logo from "./Asset/brand-1.png";
// import "./Header.css";

// function Header() {
//   const headerRef = useRef();
//   const AnchorRef = useRef();
//   useEffect(() => {
//     Aos.init();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       // Check if headerRef and anchorRef are properly set
//       if (headerRef.current) {
//         if (window.scrollY > 0) {
//           headerRef.current.classList.add("scrolled");
//         } else {
//           headerRef.current.classList.remove("scrolled");
//         }
//       }
//     };

//     // Attach the scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup event listener on unmount
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <header ref={headerRef}>
//       <nav className="navbar navbar-expand-lg navbar-light">
//         <a
//           data-aos="fade-right"
//           className="navbar-brand ml-5 text-light"
//           href="/"
//         >
//           <img src={logo} alt="" height={"40px"} />
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           // data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item active ml-4">
//               <a className="nav-link text-light" href="#what" ref={AnchorRef}>
//                 Why C-Suite?
//               </a>
//             </li>
//             <li className="nav-item active ml-4">
//               <a
//                 className="nav-link text-light"
//                 href="#courses"
//                 ref={AnchorRef}
//               >
//                 Courses
//               </a>
//             </li>
//             <li className="nav-item active ml-4">
//               <a className="nav-link text-light" href="#why" ref={AnchorRef}>
//                 Customers
//               </a>
//             </li>
//             <li className="nav-item active ml-4">
//               <a
//                 className="nav-link text-light"
//                 href="#contact"
//                 ref={AnchorRef}
//               >
//                 Contact Us
//               </a>
//             </li>
//           </ul>
//           <ul className="navbar-nav ml-auto mr-3" data-aos="fade-left">
//             <li className="nav-item active ml-4">
//               <Link to="/authentication?form=login">
//                 <button
//                   type="button"
//                   className="btn button-logoin text-light mb-2 mb-md-2 mb-lg-0"
//                 >
//                   Log In
//                 </button>
//               </Link>
//             </li>
//             <li className="nav-item active ml-md-3 ml-4">
//               <Link to="/authentication?form=signup">
//                 <button type="button" className="btn btn-light">
//                   Get Started
//                 </button>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//       <hr className="tag-size" />
//     </header>
//   );
// }

// export default Header;




import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavSlider from "./NavSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Aos from "aos";
import "aos/dist/aos.css";
import logo from "./Asset/brand-1.png";
import "./Header.css";

function Header() {
  const headerRef = useRef();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 0) {
          headerRef.current.classList.add("scrolled");
        } else {
          headerRef.current.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <a
          data-aos="fade-right"
          className="navbar-brand ml-5 text-light"
          href="/"
        >
          <img src={logo} alt="Logo" height="40px" />
        </a>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} />
        </button>

        {/* Navigation Menu */}
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active ml-4">
              <a className="nav-link text-light" href="/#what">
                Why C-Suite?
              </a>
            </li>
            <li className="nav-item active ml-4">
              <a className="nav-link text-light" href="/#courses">
                Courses
              </a>
            </li>
            <li className="nav-item active ml-4">
              <a className="nav-link text-light" href="/#why">
                Customers
              </a>
            </li>
            <li className="nav-item active ml-4">
              <a className="nav-link text-light" href="/#contact">
                Contact Us
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto mr-3" data-aos="fade-left">
            <li className="nav-item active ml-4">
              <Link to="/authentication?form=login">
                <button
                  type="button"
                  className="btn button-logoin text-light mb-2"
                >
                  Log In
                </button>
              </Link>
            </li>
            <li className="nav-item active ml-md-3 ml-4">
              <Link to="/authentication?form=signup">
                <button type="button" className="btn btn-light">
                  Get Started
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* NavSlider Component for Mobile Navigation */}
      <NavSlider isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <hr className="tag-size" />
    </header>
  );
}

export default Header;
