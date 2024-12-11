import React, { useState, useEffect } from "react";
import "./BigCalendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap"; // Bootstrap modal components

const localizer = momentLocalizer(moment);

const apiBaseurl = process.env.REACT_APP_API_BASE_URL;

const BigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(`${apiBaseurl}/event/${userid}`);
        const fetchedEvents = res.data.events || [];
        const formattedEvents = fetchedEvents.map((event) => ({
          title: event.title,
          start: new Date(event.startDate), // Convert UTC to local time
          end: new Date(event.endDate), // Convert UTC to local time
        }));
        setEvents(formattedEvents); // Update state with formatted events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getEvents();
  }, [userid]);

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill all fields before adding an event.");
      return;
    }

    const startDate = new Date(newEvent.start);
    const endDate = new Date(newEvent.end);

    if (startDate >= endDate) {
      alert("End date must be after start date.");
      return;
    }

    const newEventWithUser = {
      title: newEvent.title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      userId: userid,
    };

    try {
      const res = await axios.post(`${apiBaseurl}/event/`, newEventWithUser);
      console.log(res.data);

      // Add the new event to the calendar
      setEvents([
        ...events,
        {
          title: newEvent.title,
          start: startDate,
          end: endDate,
        },
      ]);
      setShowModal(false); // Close the modal after successfully adding the event
    } catch (error) {
      console.error("Error adding event:", error);
    }

    setNewEvent({ title: "", start: "", end: "" });
  };

  return (
    <div className="react-Big-calendar">
      <div className="completion main-calendar">
        <div className="Dash_calender">
          <h5>Calendar</h5>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Event
          </Button>
        </div>

        <Calendar
          localizer={localizer}
          events={events} // Pass fetched events here
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", width: "100%" }}
        />
        {/* Modal for adding events */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Start Date and Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={newEvent.start}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, start: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>End Date and Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={newEvent.end}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, end: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddEvent}>
              Save Event
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default BigCalendar;
