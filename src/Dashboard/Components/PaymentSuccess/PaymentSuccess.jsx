import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSConfetti from "js-confetti";
import ticksvg from "../Assets/SVG/tick.svg";
import miniConfetti from "../Assets/SVG/miniConfetti.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "./PaymentSuccess.css";

const PaymentSuccess = ({ courseId, price, courseTitle, userName }) => {
  const [countdown, setCountdown] = useState(10);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti({
      emojis: ["🌟", "⚡️", "💥", "✨", "💫", "🎈"],
      confettiRadius: 6,
      confettiNumber: 100,
      emojiSize: 30,
    });

    jsConfetti.addConfetti({
      confettiColors: [
        "#ff0a54",
        "#ff477e",
        "#ff7096",
        "#ff85a1",
        "#fbb1bd",
        "#f9bec7",
      ],
    });

    const fetchedPaymentDetails = {
      amount: price,
      paymentStatus: "Success",
      courseTitle: courseTitle,
      referenceNumber: "1234567890",
      merchantName: "Example Merchant",
      paymentMethod: "Debit Card",
      paymentTime: "10:30 AM, July 10, 2024",
      sender: userName,
    };

    setPaymentDetails(fetchedPaymentDetails);

    return () => {
      jsConfetti.clearCanvas();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate(`/home/Courses`);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown, navigate]);

  const downloadReceiptAsPDF = () => {
    console.log("Siva ranjani clicked download button");
  
    const input = document.getElementById("success-receipt");
    console.log("Receipt Element:", input);
  
    if (!input) {
      console.error("Element not found!");
      return;
    }
  
    setTimeout(() => {
      html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
        console.log("Canvas captured:", canvas);
        
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save("receipt.pdf");
      });
    }, 500); // Reduced delay for performance
  };
  

  if (!paymentDetails) return null;

  return (
    <div className="success-overlay">
      <div className="success-modal" id="success-receipt">
        <div
          id="success-confetti-container"
          className="success-confetti-container"
        ></div>
        <div className="success-content">
          <div className="success-icon">
            <img src={ticksvg} alt="Green Tick" className="success-greenTick" />
            <img
              src={miniConfetti}
              alt="mini Confetti"
              className="success-miniConfetti"
            />
          </div>
          <h3 className="success-h3">Payment Successful</h3>
          <p className="success-para">
            Your payment has been processed successfully!
          </p>
          <div className="success-details-card">
            <div className="success-detail-row">
              <span className="success-detail-label">Amount</span>
              <span className="success-detail-value">
                {paymentDetails.amount}
              </span>
            </div>
            <div className="success-detail-row">
              <span className="success-detail-label">Payment Status</span>
              <span className="success-detail-value">
                {paymentDetails.paymentStatus}
              </span>
            </div>
            <div className="success-detail-row">
              <span className="success-detail-label">Course Title</span>
              <span className="success-detail-value">
                {paymentDetails.courseTitle}
              </span>
            </div>
            <hr className="success-divider" />
            <div className="success-detail-row">
              <span className="success-detail-label">Reference Number</span>
              <span className="success-detail-value">
                {paymentDetails.referenceNumber}
              </span>
            </div>
            <div className="success-detail-row">
              <span className="success-detail-label">Merchant Name</span>
              <span className="success-detail-value">
                {paymentDetails.merchantName}
              </span>
            </div>
            <div className="success-detail-row">
              <span className="success-detail-label">Payment Method</span>
              <span className="success-detail-value">
                {paymentDetails.paymentMethod}
              </span>
            </div>
            <div className="success-detail-row">
              <span className="success-detail-label">Payment Time</span>
              <span className="success-detail-value">
                {paymentDetails.paymentTime}
              </span>
            </div>
            <div className="success-detail-row">
              <span className="success-detail-label">Sender</span>
              <span className="success-detail-value">
                {paymentDetails.sender}
              </span>
            </div>
          </div>
          <div className="success-buttons">
            <button className="success-btn" onClick={downloadReceiptAsPDF}>
              Get PDF Receipt
            </button>
            <span className="success-btn">Redirecting in {countdown}s ...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
