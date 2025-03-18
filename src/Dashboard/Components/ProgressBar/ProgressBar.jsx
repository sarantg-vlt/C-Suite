import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progress }) => {
  const roundedProgress = Math.round(progress * 100) / 100;
  const textColor = roundedProgress >= 50 ? "white" : "black";

  return (
    <div
      className="progressBarBoxOuter"
      style={{
        border: roundedProgress === 0 ? "1px solid rgb(170, 167, 167,.7)" : "none",
      }}
    >
      <div
        className="progressBarBox"
        style={{ width: `${roundedProgress}%` }}
      ></div>
      <div className="progressBarBoxInner">
        <span
          style={{
            color: textColor,
          }}
        >
          {roundedProgress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
