// // // import React, { useState, useEffect } from "react";
// // // import "./BigCalendar.css";
// // // import { Calendar, momentLocalizer } from "react-big-calendar";
// // // import moment from "moment";
// // // import "react-big-calendar/lib/css/react-big-calendar.css";
// // // import axios from "axios";
// // // import { Button, Modal, Form } from "react-bootstrap"; // Bootstrap modal components

// // // const localizer = momentLocalizer(moment);

// // // const BigCalendar = () => {
// // //   const [events, setEvents] = useState([]);
// // //   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
// // //   const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
// // //   const userid = localStorage.getItem("userid");
 
// // //   useEffect(() => {
// // //     const getEvents = async () => {
// // //       const resEvents = await axios.get(
// // //         `https://c-suite-xpmf.onrender.com/api/event/${userid}`
// // //       );
// // //       const { events } = await resEvents.data
// // //       const formattedEvents = events.map((event) => ({
// // //         ...event,
// // //         title: event.title,
// // //         start: new Date(event.start),
// // //         end: new Date(event.end),
// // //     }));
// // //       setEvents([...events,...formattedEvents])
// // //     }
// // //     getEvents()
// // //   }, [])

// // //   const handleAddEvent = async () => {
// // //     if (!newEvent.title || !newEvent.start || !newEvent.end) {
// // //       alert("Please fill all fields before adding an event.");
// // //       return;
// // //     }

// // //     const startDate = new Date(newEvent.start);
// // //     const endDate = new Date(newEvent.end);

// // //     const duration = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)); // Calculate duration in days

// // //     const newEventWithUser = {
// // //       ...newEvent,
// // //       startDate: startDate.toISOString(),
// // //       endDate: endDate.toISOString(),
// // //       duration: duration,
// // //       userId: userid,
// // //     };

// // //     try {
// // //       const res = await axios.post(
// // //         `https://c-suite-xpmf.onrender.com/api/event/`,
// // //         newEventWithUser
// // //       );
// // //       console.log(res.data);
// // //       setEvents([...events, newEventWithUser]);
// // //       setShowModal(false); // Close the modal after successfully adding the event
// // //     } catch (error) {
// // //       console.error("Error adding event:", error);
// // //     }

// // //     setNewEvent({ title: "", start: "", end: "" });
// // //   };

// // //   return (
// // //     <div className="react-Big-calendar">
// // //       <div style={{ height: "500px", margin: "20px" }}>
// // //         <Button variant="primary" onClick={() => setShowModal(true)}>
// // //           Add Event
// // //         </Button>

// // //         <Calendar
// // //           localizer={localizer}
// // //           events={events}
// // //           startAccessor="start"
// // //           endAccessor="end"
// // //           style={{ height: 500,width:'100%' }}
// // //         />
// // //         {/* Modal for adding events */}
// // //         <Modal show={showModal} onHide={() => setShowModal(false)}>
// // //           <Modal.Header closeButton>
// // //             <Modal.Title>Add Event</Modal.Title>
// // //           </Modal.Header>
// // //           <Modal.Body>
// // //             <Form>
// // //               <Form.Group>
// // //                 <Form.Label>Event Title</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   placeholder="Enter event title"
// // //                   value={newEvent.title}
// // //                   onChange={(e) =>
// // //                     setNewEvent({ ...newEvent, title: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>

// // //               <Form.Group>
// // //                 <Form.Label>Start Date and Time</Form.Label>
// // //                 <Form.Control
// // //                   type="datetime-local"
// // //                   value={newEvent.start}
// // //                   onChange={(e) =>
// // //                     setNewEvent({ ...newEvent, start: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>

// // //               <Form.Group>
// // //                 <Form.Label>End Date and Time</Form.Label>
// // //                 <Form.Control
// // //                   type="datetime-local"
// // //                   value={newEvent.end}
// // //                   onChange={(e) =>
// // //                     setNewEvent({ ...newEvent, end: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>
// // //             </Form>
// // //           </Modal.Body>
// // //           <Modal.Footer>
// // //             <Button variant="secondary" onClick={() => setShowModal(false)}>
// // //               Close
// // //             </Button>
// // //             <Button variant="primary" onClick={handleAddEvent}>
// // //               Save Event
// // //             </Button>
// // //           </Modal.Footer>
// // //         </Modal>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BigCalendar;


// // import React, { useState, useEffect } from "react";
// // import "./BigCalendar.css";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import axios from "axios";
// // import { Button, Modal, Form } from "react-bootstrap"; // Bootstrap modal components

// // const localizer = momentLocalizer(moment);

// // const BigCalendar = () => {
// //   const [events, setEvents] = useState([]);
// //   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
// //   const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
// //   const userid = localStorage.getItem("userid");

// //   useEffect(() => {
// //     const getEvents = async () => {
// //       try {
// //         const res = await axios.get(
// //           `https://c-suite-xpmf.onrender.com/api/event/${userid}`
// //         );
// //         const fetchedEvents = res.data.events || [];
// //         const formattedEvents = fetchedEvents.map((event) => ({
// //           title: event.title,
// //           start: new Date(event.start).toISOString().split("T")[0],
// //           end: new Date(event.end).toISOString().split("T")[0],
// //           userId: userid,
// //         }));
// //         setEvents(formattedEvents); // Update state with the formatted events
// //       } catch (error) {
// //         console.error("Error fetching events:", error);
// //       }
// //     };

// //     getEvents();
// //   }, [userid]);

// //   const handleAddEvent = async () => {
// //     if (!newEvent.title || !newEvent.start || !newEvent.end) {
// //       alert("Please fill all fields before adding an event.");
// //       return;
// //     }

// //     const startDate = new Date(newEvent.start);
// //     const endDate = new Date(newEvent.end);

// //     const duration = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)); // Calculate duration in days

// //     const newEventWithUser = {
// //       ...newEvent,
// //       startDate: startDate.toISOString(),
// //       endDate: endDate.toISOString(),
// //       duration: duration,
// //       userId: userid,
// //     };

// //     try {
// //       const res = await axios.post(
// //         `https://c-suite-xpmf.onrender.com/api/event/`,
// //         newEventWithUser
// //       );
// //       console.log(res.data);
// //       setEvents([
// //         ...events,
// //         {
// //           title: newEvent.title,
// //           start: startDate,
// //           end: endDate,
// //         },
// //       ]);
// //       setShowModal(false); // Close the modal after successfully adding the event
// //     } catch (error) {
// //       console.error("Error adding event:", error);
// //     }

// //     setNewEvent({ title: "", start: "", end: "" });
// //   };

// //   return (
// //     <div className="react-Big-calendar">
// //       <div style={{ height: "500px", margin: "20px" }}>
// //         <Button variant="primary" onClick={() => setShowModal(true)}>
// //           Add Event
// //         </Button>

// //         <Calendar
// //           localizer={localizer}
// //           events={events}
// //           startAccessor="start"
// //           endAccessor="end"
// //           style={{ height: 500, width: "100%" }}
// //         />
// //         {/* Modal for adding events */}
// //         <Modal show={showModal} onHide={() => setShowModal(false)}>
// //           <Modal.Header closeButton>
// //             <Modal.Title>Add Event</Modal.Title>
// //           </Modal.Header>
// //           <Modal.Body>
// //             <Form>
// //               <Form.Group>
// //                 <Form.Label>Event Title</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   placeholder="Enter event title"
// //                   value={newEvent.title}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, title: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>

// //               <Form.Group>
// //                 <Form.Label>Start Date and Time</Form.Label>
// //                 <Form.Control
// //                   type="datetime-local"
// //                   value={newEvent.start}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, start: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>

// //               <Form.Group>
// //                 <Form.Label>End Date and Time</Form.Label>
// //                 <Form.Control
// //                   type="datetime-local"
// //                   value={newEvent.end}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, end: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>
// //             </Form>
// //           </Modal.Body>
// //           <Modal.Footer>
// //             <Button variant="secondary" onClick={() => setShowModal(false)}>
// //               Close
// //             </Button>
// //             <Button variant="primary" onClick={handleAddEvent}>
// //               Save Event
// //             </Button>
// //           </Modal.Footer>
// //         </Modal>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BigCalendar;


// import React, { useState, useEffect } from "react";
// import "./BigCalendar.css";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import axios from "axios";
// import { Button, Modal, Form } from "react-bootstrap"; // Bootstrap modal components

// const localizer = momentLocalizer(moment);

// const BigCalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
//   const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
//   const userid = localStorage.getItem("userid");

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const res = await axios.get(
//           `https://c-suite-xpmf.onrender.com/api/event/${userid}`
//         );
//         const fetchedEvents = res.data.events || [];
//         console.log(fetchedEvents);
        
//         const formattedEvents = fetchedEvents.map((event) => ({
//           title: event.title,
//           start: new Date(event.start), // Converts UTC string to local time
//           end: new Date(event.end), // Converts UTC string to local time
//         }));
//         setEvents(formattedEvents); // Update state with the formatted events
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     getEvents();
//   }, [userid]);

//   const handleAddEvent = async () => {
//     if (!newEvent.title || !newEvent.start || !newEvent.end) {
//       alert("All fields are required.");
//       return;
//     }

//     const startDate = new Date(newEvent.start);
//     const endDate = new Date(newEvent.end);

//     if (startDate >= endDate) {
//       alert("End date must be after start date.");
//       return;
//     }

//     const newEventWithUser = {
//       title: newEvent.title,
//       start: startDate,
//       end: endDate,
//       userId: userid,
//     };

//     try {
//       const res = await axios.post(
//         `https://c-suite-xpmf.onrender.com/api/event/`,
//         newEventWithUser
//       );
//       console.log(res.data);

//       // Update state with the new event
//       setEvents([
//         ...events,
//         {
//           title: newEvent.title,
//           start: startDate,
//           end: endDate,
//         },
//       ]);
//       setShowModal(false); // Close the modal after successfully adding the event
//     } catch (error) {
//       console.error("Error adding event:", error);
//     }

//     // Reset new event state
//     setNewEvent({ title: "", start: "", end: "" });
//   };

//   return (
//     <div className="react-Big-calendar">
//       <div style={{ height: "500px", margin: "20px" }}>
//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           Add Event
//         </Button>

//         <Calendar
//           localizer={localizer}
//           events={events} // Pass fetched events here
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 500, width: "100%" }}
//         />
//         {/* Modal for adding events */}
//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Add Event</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group>
//                 <Form.Label>Event Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter event title"
//                   value={newEvent.title}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, title: e.target.value })
//                   }
//                 />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Start Date and Time</Form.Label>
//                 <Form.Control
//                   type="datetime-local"
//                   value={newEvent.start}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, start: e.target.value })
//                   }
//                 />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>End Date and Time</Form.Label>
//                 <Form.Control
//                   type="datetime-local"
//                   value={newEvent.end}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, end: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleAddEvent}>
//               Save Event
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default BigCalendar;



import React, { useState, useEffect } from "react";
import "./BigCalendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap"; // Bootstrap modal components

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(
          `https://c-suite-xpmf.onrender.com/api/event/${userid}`
        );
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
      const res = await axios.post(
        `https://c-suite-xpmf.onrender.com/api/event/`,
        newEventWithUser
      );
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
      <div style={{ height: "500px", margin: "20px" }}>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Event
        </Button>

        <Calendar
          localizer={localizer}
          events={events} // Pass fetched events here
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: "100%" }}
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

