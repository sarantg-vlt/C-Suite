import React, { useState } from "react";
import "./ContactUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    companyname: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        toast.success("Thank you! Your message has been sent.", {
          position: "top-right",
          autoClose: 3000, // Closes after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
  
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          companyname: "",
          message: "",
        });
      } else {
        toast.error("Oops! Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Error: Unable to send your message.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // const handleSubmit = () => {
    // alert ("Sucessfully ")
  // }

  return (
    <div className="contactUs" id="contact">
      <section className="leftcontainer">
        <div className="leftRow">
          <h1>Contact Us</h1>
          {/* <p>
            Feel free to get in touch with us. We are always open to discussing
            new projects, creative ideas, or opportunities to be part of your
            vision.
          </p> */}
        </div>
        <div className="leftRow">
          <a className="phone" href="tel:+917305062079">
            <FontAwesomeIcon icon={faPhone} />
            <div className="c1">+91-73050 62079</div>
          </a>
          <a className="mail" href="mailto:hello@csuite.academy">
            <FontAwesomeIcon icon={faEnvelope} />
            <div className="c1">hello@csuite.academy</div>
          </a>
          <a
            className="location"
            href="https://www.google.com/maps/place/102+Street+4657+Road"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <div className="c1">Thiruvanmiyur <br /> Chennai <br />India</div>
          </a>
        </div>
        <div className="leftRow">
          <a
            className="facebook"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            className="twitter"
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a
            className="instagram"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </section>
      <section className="rightcontainer">
        <div className="rightContainerBox">
          <h6>Contact Information</h6>
          <form onSubmit={handleSubmit}>
            <div className="rows">
              <div className="inputgroup">
                <input
                  type="text"
                  name="firstname"
                  placeholder=" "
                  pattern="[A-Za-z\s]+"
                  title="Accept only text format "
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="firstname">First Name</label>
              </div>
              <div className="inputgroup">
                <input
                  type="text"
                  name="lastname"
                  placeholder=" "
                  pattern="[A-Za-z\s]+"
                  title="Accept only text format "
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="lastname">Last Name</label>
              </div>
            </div>
            <div className="rows">
              <div className="inputgroup">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputgroup">
                <input
                  type="text"
                  name="companyname"
                  placeholder=" "
                  id="companyname"
                  value={formData.companyname}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="companyname">Company Name</label>
              </div>
            </div>
            <div className="messagegroup">
              <textarea
                name="message"
                placeholder=" "
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="message">Have any message / Queries?</label>
            </div>
            <div className="submit">
              <input 
                type="submit"
                value={isSubmitting ? "Sending..." : "Submit"}
                disabled={isSubmitting}
              />
            </div>
          </form>
          {responseMessage && (
            <p className="responseMessage">{responseMessage}</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
