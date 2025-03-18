import React, { useEffect, useState } from "react";
import EventList from "./EventList";
import AddEvent from "./AddEvent";
import "./Event.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiBaeApi = process.env.REACT_APP_API_BASE_URL;

const MainEvent = () => {
    const navigate = useNavigate()
    const [eventlist, setEventlist] = useState([])
    useEffect(() => {
        const getEvent = async () => {
          const resEvents = await axios.get(`${apiBaeApi}/admin-event`);
          const { events } = resEvents.data;
            //   console.log(events);
            setEventlist(events)
        };
        getEvent();
    },[]);

  return (
    <div className="user-page ">
      <Button className="btn-danger" onClick={()=>navigate(-1)} >back</Button>
      <div className="main-event-section">
        <AddEvent />
        <EventList events={eventlist} />
      </div>
    </div>
  );
};

export default MainEvent;
