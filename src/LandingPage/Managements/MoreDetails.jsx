import React from "react";
import "./managements.css";
import Header from "../Header/Header";
import p1 from "./Asset/panchimam.jpeg";
import { useLocation } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

const MoreDetails = () => {
  const { data } = useLocation()?.state;
  console.log(data);
  return (
    <div className="moreDetailsPage gradientArea">
      <Header />
      <div className="details-cnt">
        <h2 data-aos="fade-up" className="gradientText">
          {" "}
          {data?.panel}
        </h2>
        <div className="management-details-cnt">
          <img
            data-aos="fade-up"
            src={require(`` + data.img + ``)}
            alt="profile"
            className="details-profile-image"
          />
          <div className="profile-details">
            <h3 data-aos="fade-left" style={{ marginBottom: "1rem" }}>
              {data?.name} , {data?.role}
            </h3>

            <h6 data-aos="fade-left">
              • {data?.currentRole || data?.previousRole}{" "}
            </h6>
            {data?.additonalRoles && (
              <h6 data-aos="fade-left">• {data?.additionalRoles}</h6>
            )}
            <br />
            {/* <p
                data-aos="fade-left"
                style={{ textAlign: "justify", color: "white" }}
              >
               
                <a href={`${data.email}`}>{data.email}</a>
              </p> */}

            <p
              data-aos="fade-left"
              style={{
                textAlign: "justify",
                color: "white",
                display: "flex",
                gap: "1em",
                alignItems: "center",
              }}
            >
              <FaLinkedin
                style={{ padding: "2px", width: "30px", height: "30px" }}
              />

              <a
                href={`${data.email}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                {data.email}
              </a>
            </p>

            <br />

            <p data-aos="fade-left" style={{ textAlign: "justify" }}>
              {data?.biography}
            </p>
            <br />

            <p data-aos="fade-left" style={{ textAlign: "justify" }}>
              {" "}
              {data?.achievements}
            </p>
            <br />

            <p data-aos="fade-left" style={{ textAlign: "justify" }}>
              {data?.publicRecognition}
            </p>
            <br />
            <p data-aos="fade-left" style={{ textAlign: "justify" }}>
              {" "}
              {data?.professionalExperience}
            </p>
            <br />

            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
