import './TermsAndConditions.css'
const TermsAndConditions = () => {
  return (
    <>
      <div className="bottom-footer-container container">
        <h1 className="term-main-header">
          Terms and Conditions for Csuite Academy
        </h1>
        <div className="term-content">
          <h3 className="term-header">Introduction</h3>
          <p className="term-para">
            Welcome to Csuite Academy, a product of Panchi Tech Services Private
            Limited. By accessing or using our platform, you agree to comply
            with the terms and conditions outlined here. If you do not agree,
            please refrain from using our services.
          </p>
        </div>
        <div className="term-content">
          <h3 className="term-header">Eligibility</h3>
          <p className="term-para">
            Our services are designed for professionals seeking CXO-level
            training. Users must be 18 years or older and have the requisite
            authority to enter into these terms on behalf of their organization,
            if applicable.
          </p>
        </div>
        <div className="term-content">
          <h3 className="term-header">Account Registration</h3>
          <p className="term-para">
            You are responsible for maintaining the confidentiality of your
            account credentials. All activities under your account are your
            responsibility. Notify us immediately of unauthorized access or
            security breaches.
          </p>
        </div>
        <div className="term-content">
          <h3 className="term-header">Platform Usage</h3>
          <ul className="term-para">
            <li>
              <p>
                <span>Users shall not:</span>
                Violate any applicable laws or regulations.
              </p>
            </li>
            <li>
              <p>
                Use the platform for purposes other than professional learning.
              </p>
            </li>
            <li>
              <p>
                Share proprietary content outside the platform without
                authorization.
              </p>
            </li>
            <li>
              <p>
                Csuite Academy retains the right to suspend or terminate access
                for misuse or violations.
              </p>
            </li>
          </ul>
        </div>
        <div className="term-content">
          <h3 className="term-header">
            Content Ownership and Intellectual Property
          </h3>
          <p className="term-para">
            All content provided on the platform, including but not limited to
            training materials, videos, and documentation, is owned by Panchi
            Tech Services Private Limited or its licensors. Users are granted a
            non-exclusive, non-transferable license to access the content for
            personal learning purposes only.
          </p>
        </div>
        <div className="term-content">
          <h3 className="term-header">Fees and Payments</h3>
          <p className="term-para">
            All payments must be made in accordance with the pricing structure
            mentioned during registration. Failure to make timely payments may
            result in restricted access to services. Limitation of Liability
            Csuite Academy is not liable for indirect or incidental damages
            arising from the use of our services. We are committed to ensuring a
            seamless experience but do not guarantee uninterrupted service.
          </p>
        </div>
        <div className="term-content">
          <h3 className="term-header">Amendments</h3>
          <p className="term-para">
            We may update these terms periodically. Continued use of the
            platform implies acceptance of the revised terms.
          </p>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditions