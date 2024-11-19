import React, { useState } from "react";
import "./ContactUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://csuite-ui0f.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage("Thank you! Your message has been sent.");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          companyname: "",
          message: "",
        });
      } else {
        setResponseMessage("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Error: Unable to send your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contactUs" id="contact">
      <section className="leftcontainer">
        <div className="leftRow">
          <h1>Contact Us</h1>
          <p>
            Feel free to get in touch with us. We are always open to discussing
            new projects, creative ideas, or opportunities to be part of your
            vision.
          </p>
        </div>
        <div className="leftRow">
          <a className="phone" href="tel:+919865149951">
            <FontAwesomeIcon icon={faPhone} />
            <div className="c1">+91-9865149951</div>
          </a>
          <a className="mail" href="mailto:info@lmsportal.co.in">
            <FontAwesomeIcon icon={faEnvelope} />
            <div className="c1">info@lmsportal.co.in</div>
          </a>
          <a
            className="location"
            href="https://www.google.com/maps/place/102+Street+4657+Road"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <div className="c1">102 Street 4657 Road</div>
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
              <input type="submit" value={isSubmitting ? "Sending..." : "Submit"} disabled={isSubmitting} />
            </div>
          </form>
          {responseMessage && <p className="responseMessage">{responseMessage}</p>}
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
