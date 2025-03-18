import { useEffect, useState } from "react";
import "./Events.css";
import { Calendar } from "lucide-react";
import axios from "axios";
const apiBaeApi = process.env.REACT_APP_API_BASE_URL;

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvent = async () => {
      const resEvents = await axios.get(
        `${apiBaeApi}/admin-event`
      );
      const { events } = resEvents.data;
      setEvents(events);
    };
    getEvent();
  }, []);

  return (
    <>
      <div className="Events">
        <div className="event-container">
          <ul>
            {events.map((event) => {
              const formattedStartDate = new Date(event.startDate)
                .toISOString()
                .split("T")[0];
              const formattedEndedDate = new Date(event.endDate)
                .toISOString()
                .split("T")[0];
              return (
                <li className="event-card" key={event._id}>
                  <Calendar />
                  <div className="event-content">
                    <h6 className="event-title">{event.title} </h6>
                    <p className="event-description">{event.description}</p>
                    <div className="event-dates">
                    <p className="event-date">{formattedStartDate}</p>
                    <p className="event-date">{formattedEndedDate}</p>
                    </ div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Events;
