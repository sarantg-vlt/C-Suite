import "./RefoundPolicy.css";
const RefoundPolicy = () => {
  return (
    <div className="bottom-footer-container container">
      <h1 className="term-main-header">Refund Policy for Csuite Academy</h1>
      <div className="term-content">
        <h3 className="term-header">Introduction</h3>
        <p className="term-para">
          We strive to provide exceptional learning experiences. This refund
          policy outlines the conditions under which users may be eligible for
          refunds.
        </p>
      </div>
      <div className="term-content">
        <h3 className="term-header">Eligibility for Refund</h3>
        <ul className="term-para">
          <li>
            <p>Refund requests must be made within 7 days of purchase.</p>
          </li>
          <li>
            <p>
              Users must provide a valid reason for dissatisfaction or inability
              to use the service.
            </p>
          </li>
        </ul>
      </div>
      <div className="term-content">
        <h3 className="term-header">Non-Refundable Scenarios</h3>
        <ul className="term-para">
          <li>
            <p>Partial usage of the course content or modules.</p>
          </li>
          <li>
            <p>
              Failure to complete the training due to reasons beyond Csuite
              Academy’s control. Refund requests made after the stipulated time
              frame.
            </p>
          </li>
        </ul>
      </div>
      <div className="term-content">
        <h3 className="term-header">Process</h3>
        <ul className="term-para">
          <li>
            <p>
              Submit a refund request through the support portal with payment
              details and the reason for the request.
            </p>
          </li>
          <li>
            <p>
              Refunds, if approved, will be processed within 7-10 business days.
            </p>
          </li>
        </ul>
      </div>
      <div className="term-content">
        <h3 className="term-header">Contact Us</h3>
        <p className="term-para">
          For queries regarding refunds, please contact our support team at
          [Insert Support Email].
        </p>
      </div>
    </div>
  );
};

export default RefoundPolicy;
