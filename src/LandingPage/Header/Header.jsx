import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // 👇 Generic scroll handler
  const handleNavClick = (sectionId) => {
    navigate("/");

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={headerRef}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <a data-aos="fade-right" className="navbar-brand ml-5 text-light" href="/">
          <img src={logo} alt="Logo" height="40px" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} />
        </button>

        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active ml-4">
              <button
                onClick={() => handleNavClick("what")}
                className="nav-link text-light"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Why C-Suite?
              </button>
            </li>
            <li className="nav-item active ml-4">
              <button
                onClick={() => handleNavClick("courses")}
                className="nav-link text-light"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Courses
              </button>
            </li>
            <li className="nav-item active ml-4">
              <button
                onClick={() => handleNavClick("why")}
                className="nav-link text-light"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Customers
              </button>
            </li>
            <li className="nav-item active ml-4">
              <button
                onClick={() => handleNavClick("contact")}
                className="nav-link text-light"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Contact Us
              </button>
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

      <NavSlider isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <hr className="tag-size" />
    </header>
  );
}

export default Header;
