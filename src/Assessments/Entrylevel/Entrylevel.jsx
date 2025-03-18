import React, { useEffect, useState } from "react";
import { fetchela } from "../../api/baseapi";
import questionData from "../Assessmentsstart/Questionsdata.json";

//import css
import "./entrylevel.css";

//import react-icons

import { MdOutlineLibraryBooks } from "react-icons/md";
import { TbFlag } from "react-icons/tb";
import { BiAlarm } from "react-icons/bi";
import { BiBarChartAlt2 } from "react-icons/bi";

//import { PiFilesLight } from "react-icons/pi";
//import { MdLanguage } from "react-icons/md";
//import { RiBarChart2Line } from "react-icons/ri";

//import logo
import logoela from "../asset/brand-footer.png";

//react-router- quick assessments
import { Link } from "react-router-dom";
import axios from "axios";
const apiBaseurl = process.env.REACT_APP_API_BASE_URL;

const Entrylevel = () => {
  const [time, settime] = useState(0);
  let [totalQuestions, settotalQuestions] = useState(0);

  useEffect(() => {
    fetchELA();
  }, []);

  async function fetchELA() {
    try {
      // axios
      // .get(`https://csuite-production.up.railway.app/api/question`)
      // .then((res) => {
      //     console.log(res.data[0])
      // })

      const response = await axios.get(`${apiBaseurl}/question`);
      console.log("response.data", response?.data[0]);
      // var data = questionData;
      var data = response?.data[0];
      console.log(data);
      localStorage.setItem("TimeLeft", data?.time);
      settime(data?.time);
      localStorage.setItem("questionData", JSON.stringify(data));
      var total = 0;
      for (var index in data.sections) {
        total += data.sections[index].questions.length;
      }
      settotalQuestions(total);
    } catch (error) {
      console.error(error); // Handle errors
    }
  }

  const formatTimevalue = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    var time = "0";
    console.log(minutes);
    if (hours > 0) {
      time =
        hours.toString().padStart(2, "0") +
        " hours " +
        minutes.toString().padStart(2, "0") +
        " minutues " +
        remainingSeconds.toString().padStart(2, "0") +
        " seconds";
    } else if (minutes > 0) {
      time =
        minutes.toString().padStart(2, "0") +
        " minutes " +
        remainingSeconds.toString().padStart(2, "0") +
        " seconds";
    } else {
      time = remainingSeconds.toString().padStart(2, "0") + " seconds";
    }
    return time;
  };

  return (
    <>
      <div className="entrylevel-head">
        <div className="entrylevel-inside">
          <div className="entrylevel-nav-content">
            <div className="brand-logo">
              <img src={logoela} alt="C-Suite Academy" height="35px" />
            </div>
          </div>
          <div className="parent-container">
            <div className="entryclass-card-container">
              <div className="ELA-heading">
                <h1 id="ela-title-head"> Entry Level Assessment (ELA)</h1>
                <h2 id="ela-sub-title">
                  Evaluate your skills with our comprehensive test
                </h2>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="assessment-details">
                    <h2>Assessment Details</h2>
                    <p>
                      <MdOutlineLibraryBooks size="1.5rem" />
                      <span className="span-type">Type :</span>
                      <span className="span-para"> Role specific skills</span>
                    </p>

                    <p>
                      <BiAlarm size="1.5rem" />
                      <span className="span-type">Time :</span>
                      <span className="span-para">{formatTimevalue(time)}</span>
                    </p>

                    <p>
                      <TbFlag size="1.5rem" />
                      <span className="span-type">Language :</span>
                      <span className="span-para">English</span>
                    </p>

                    <p>
                      <BiBarChartAlt2 size="1.5rem" />
                      <span className="span-type">Level :</span>
                      <span className="span-para">Easy - Intermediate</span>
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="assessment-overview">
                    <h2>Assessment Overview</h2>
                    <p className="first-para">
                      This Entry Level Assessment (ELA) is designed to evaluate
                      your fundamental skills across various domains. It
                      includes questions on mathematics, logical reasoning,
                      verbal ability, and basic computer skills.
                    </p>
                    <p className="number-questions">
                      No of questions : <span>{totalQuestions} MCQ’s</span>
                    </p>
                    <Link to="/assessment-page">
                      <button>Start Assessment</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entrylevel;
