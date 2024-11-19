// Footer.jsx
import React, { useEffect, useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebookF, faSquareInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import footerlogo from '../Header/Asset/brand-footer.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router';

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    Aos.init();
  }, []);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage('Please enter a valid email address.');
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch('https://csuite-ui0f.onrender.com/api/instructor/save-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Email successfully submitted!');
        setIsSuccess(true);
        setEmail('');  // Clear the email input field
      } else {
        setMessage('Failed to submit email.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage('An error occurred.');
      setIsSuccess(false);
    }
  };

  return (
    <>
      <div className="footer" id="footer">
        <section data-aos="fade-up" className="section1">
          <img src={footerlogo} alt="Brand logo" width="120px" />
          <p>Practical-based learning platform to enhance skills</p>
          <h6>Follow Us on</h6>
          <div className="sociallinks">
            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61568457662306&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com/c_suiteacademy?igsh=MWY3dHEwMHd1eHUzbQ==" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faSquareInstagram} />
            </a>
            <a href="https://x.com/CSuite_Academy?t=gl--2-4UQmp6Ceio61GxXA&s=09" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </section>

        <section data-aos="fade-up" className="section2">
          <h5>About LMS</h5>
          <a onClick={() => navigate('/Payment')}>Pricing</a>
          <a>Features</a>
          <a>Integrations</a>
          <a>Events</a>
          <a>Reviews</a>
        </section>

        <section data-aos="fade-up" className="section3">
          <h5>Support</h5>
          <a
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Us
          </a>
          <a>Help Desk</a>
          <a>Customer Support</a>
          <a>Professional Services</a>
          <a onClick={(e) => { e.preventDefault(); navigate('/admin/login'); }}>Administrative service</a>
        </section>

        <section data-aos="fade-up" className="section4">
          <h4>Become an Instructor</h4>
          <p>We only work with the best companies around the globe</p>
          <form className="instructoremail" onSubmit={handleEmailSubmit}>
            <input
              className="emailinput"
              type=""
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input className="registernow" type="submit" value="Register Now" />
          </form>
          {message && (
            <span className={`submission-message ${isSuccess ? 'success' : 'error'}`}>
              {message}
            </span>
          )}
        </section>
      </div>

      <div className="copyright-section">
        <div className="copyright-text">
          © {new Date().getFullYear()} LMS. All Rights Reserved.
        </div>
        <div className="copyright-links">
          <a href="/disclaimer">Disclaimer</a>
          <a href="/terms">Terms and Conditions</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/refund">Refund Policy</a>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </>
  );
}

export default Footer;
