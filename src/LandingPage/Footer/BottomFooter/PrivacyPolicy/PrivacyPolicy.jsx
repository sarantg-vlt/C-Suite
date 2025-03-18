import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="bottom-footer-container container">
      <h1 className="term-main-header">Privacy Policy for Csuite Academy</h1>
      <div className="term-content">
        <h3 className="term-header">Introduction</h3>
        <p className="term-para">
          Your privacy is important to us at Panchi Tech Services Private
          Limited. This privacy policy outlines how we collect, use, and protect
          your personal information on Csuite Academy.
        </p>
      </div>
      <div className="term-content">
        <h3 className="term-header">Information Collection</h3>
        <p className="term-para">
          <ul className="term-para">
            <li>
              <span>Personal Information :  </span>
              Name, email address, phone number, and payment details during
              registration.
            </li>
            <li>
              <span>Usage Data :  </span>
              Information about how you access and use the platform, including
              browser type, IP address, and session activity.
            </li>
          </ul>
        </p>
      </div>
      <div className="term-content">
        <h3 className="term-header"> Use of Information</h3>
        <p className="term-para">
          <ul className="term-para">
            <li>
              <span>We use your information to :  </span>
              Deliver personalized learning experiences. Manage payments and
              subscriptions. Communicate updates, offers, and support-related
              information.
            </li>
          </ul>
        </p>
      </div>
      <div className="term-content">
        <h3 className="term-header">Data Sharing</h3>
        <ul className="term-para">
          <span>Your data will not be shared with third parties except:</span>
          <li>
            <p>For processing payments via secure gateways.</p>
          </li>
          <li>
            <p>When required by law or regulatory authorities.</p>
          </li>
        </ul>
      </div>
      <div className="term-content">
        <h3 className="term-header">Security Measures</h3>
        <p className="term-para">
          We employ advanced encryption and secure servers to protect your data.
          However, no system is entirely foolproof; users must ensure safe
          practices like not sharing credentials.
        </p>
      </div>
      <div className="term-content">
        <h3 className="term-header">Your Rights</h3>
        <p className="term-para">
          Users can access, update, or delete personal information by contacting
          our support team.
        </p>
      </div>
      <div className="term-content">
        <h3 className="term-header">Cookies</h3>
        <p className="term-para">
          We use cookies to enhance user experience and analyze platform usage.
          Users can manage cookie preferences through their browser settings.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy