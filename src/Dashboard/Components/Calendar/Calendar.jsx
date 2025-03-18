// src/components/Calendar.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="custom-calendar">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default CustomCalendar;



