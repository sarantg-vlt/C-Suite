// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./appointments.css";
// import Sidebar from "../sidebar/LeftBar";

// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
// const userId = localStorage.getItem("userid");

// const Appointments = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [meetingLink, setMeetingLink] = useState("");
//   const [message, setMessage] = useState("");
//   const [adminmessage, setadminmessage] = useState("");
//   const [userName, setUserName] = useState("");  
//   const [editingId, setEditingId] = useState(null);
//   const [showScheduleForm, setShowScheduleForm] = useState(false);  

//   useEffect(() => {
//     const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
//     setRequests(storedRequests);
//   }, []);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const updatedRequests =
//         JSON.parse(localStorage.getItem("requests")) || [];
//       setRequests(updatedRequests);
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const deleteRequest = (id) => {
//     const updatedRequests = requests.filter((req) => req.id !== id);
//     setRequests(updatedRequests);
//     localStorage.setItem("requests", JSON.stringify(updatedRequests));
//     window.dispatchEvent(new Event("storage"));
//   };

//   const scheduleSlot = async (id) => {
//     if (!selectedDate || !selectedTime || !meetingLink || !adminmessage) {
//       alert("Please fill all fields (Date, Time, and Meeting Link).");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `${apiBaseUrl}/appointments/confirm/${id}`,
//         {
//           date: selectedDate,
//           time: selectedTime,
//           meetLink: meetingLink,
//           purpose:adminmessage,
//           status: "confirmed",
//         }
//       );

//       const updatedRequests = requests.map((req) =>
//         req.id === id
//           ? {
//               ...req,
//               status: "Booked",
//               scheduledDate: selectedDate,
//               time: selectedTime,
//               meetingLink,
//               adminmessage,
//               userRequestedDate: req.userRequestedDate || "-",
//               userRequestedMessage: req.userRequestedMessage || "-",
//             }
//           : req
//       );

//       setRequests(updatedRequests);
//       localStorage.setItem("requests", JSON.stringify(updatedRequests));
//       window.dispatchEvent(new Event("storage"));
//       setSelectedDate("");
//       setSelectedTime("");
//       setMeetingLink("");
//       setMessage("");
//       setadminmessage("")
//       setEditingId(null);
//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error updating appointment:", error);
//       alert("Failed to schedule appointment. Please try again.");
//     }
//   };

//   const openScheduleForm = () => {
//     setShowScheduleForm(true);  // Show the admin form for direct scheduling
//   };

//   const closeScheduleForm = () => {
//     setShowScheduleForm(false); // Close the form after scheduling
//     setUserName("");  // Reset user name
//     setSelectedDate("");
//     setSelectedTime("");
//     setMeetingLink("");
//     setMessage("");
//   };

//   const handleAdminSchedule = async () => {
//     if (!userName || !selectedDate || !selectedTime || !message || !meetingLink) {
//       alert("Please fill all fields (Name, Date, Time, Message, and Meeting Link).");
//       return;
//     }

//     // Save directly scheduled appointment data
//     const newRequest = {
//       id: Date.now(),
//       username: userName,
//       scheduledDate: selectedDate,
//       time: selectedTime,
//       meetingLink,
//       message,
//       status: "Booked",
//       userRequestedDate: "-",
//       userRequestedMessage: "-",
//     };

//     const updatedRequests = [...requests, newRequest];
//     setRequests(updatedRequests);
//     localStorage.setItem("requests", JSON.stringify(updatedRequests));
//     window.dispatchEvent(new Event("storage"));
    
//     // Reset the form after submission
//     setUserName("");
//     setSelectedDate("");
//     setSelectedTime("");
//     setMeetingLink("");
//     setMessage("");
//     setShowScheduleForm(false);  // Close the form after scheduling
//   };

//   return (
//     <div className="">
//       <Sidebar />
//       <div className="admin-container">
//         <h2 className="admin-title">Admin Dashboard</h2>

      
//         <button className="schedule-meeting-btn" onClick={openScheduleForm}>
//           Schedule Meeting
//         </button>

//         {/* Admin's Direct Scheduling Form */}
//         {showScheduleForm && (
//           <div className="schedule-form-popup">
//             <h3>Admin Schedule a Meeting</h3>

//             <input
//               type="text"
//               placeholder="Enter User's Name"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               className="input-field"
//             />
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="input-field"
//             />
//             <input
//               type="time"
//               value={selectedTime}
//               onChange={(e) => setSelectedTime(e.target.value)}
//               className="input-field"
//             />
//             <input
//               type="text"
//               placeholder="Enter Meeting Link"
//               value={meetingLink}
//               onChange={(e) => setMeetingLink(e.target.value)}
//               className="input-field"
//             />
//             <input
//               type="text"
//               placeholder="Enter Reason"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="input-field"
//             />

//             <button onClick={handleAdminSchedule} className="schedule-btn">
//               Schedule
//             </button>
//             <button onClick={closeScheduleForm} className="cancel-btn">
//               Cancel
//             </button>
//           </div>
//         )}

//         {/* Appointment Requests Table */}
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Request ID</th>
//               <th>User Name</th>
//               <th>Status</th>
//               <th>User Requested Date</th>
//               <th>User Requested Message</th>
//               <th>Scheduled Date</th>
//               <th>Time</th>
//               <th>Meeting Link</th>
//               <th>Actions</th>
//               <th>Delete</th>
//               <th>Admin Requested Message</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.length === 0 ? (
//               <tr>
//                 <td colSpan="10" className="no-requests">
//                   No Requests
//                 </td>
//               </tr>
//             ) : (
//               requests.map((req) => (
//                 <tr key={req.id}>
//                   <td>{req.id}</td>
//                   <td>{req.username}</td>
//                   <td className={`status ${req.status.toLowerCase()}`}>
//                     {req.status}
//                   </td>
//                   <td>{req.date|| "-"}</td>
//                   <td>{req.reason || "-"}</td> 
//                   <td>{req.scheduledDate || "Not Scheduled"}</td>
//                   <td>{req.time || "Not Set"}</td>
//                   <td>
//                     {req.meetingLink ? (
//                       <a
//                         href={req.meetingLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="meeting-link"
//                       >
//                         Open Link
//                       </a>
//                     ) : (
//                       "No Link"
//                     )}
//                   </td>
//                  <td>
//                     {req.status === "Booked" || req.status === "Canceled" ? (
//                       req.status === "Booked" ? (
//                         editingId === req.id ? (
//                           <div className="action-container">
//                             <input
//                               type="date"
//                               value={selectedDate}
//                               onChange={(e) => setSelectedDate(e.target.value)}
//                               className="input-field"
//                             />
//                             <input
//                               type="time"
//                               value={selectedTime}
//                               onChange={(e) => setSelectedTime(e.target.value)}
//                               className="input-field"
//                             />
//                             <input
//                               type="text"
//                               placeholder="Enter Meeting Link"
//                               value={meetingLink}
//                               onChange={(e) => setMeetingLink(e.target.value)}
//                               className="input-field"
//                             />
//                               <input
//                               type="text"
//                               placeholder="Enter reason"
//                               value={adminmessage}
//                               onChange={(e) => setadminmessage(e.target.value)}
//                               className="input-field"
//                             />
//                             <button
//                               onClick={() => scheduleSlot(req.id)}
//                               className="schedule-btn"
//                             >
//                               Update
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() => setEditingId(req.id)}
//                             className="edit-btn"
//                           >
//                             Edit
//                           </button>
//                         )
//                       ) : (
//                         req.status
//                       )
//                     ) : (
//                       <div className="action-container">
//                         <input
//                           type="date"
//                           value={selectedDate}
//                           onChange={(e) => setSelectedDate(e.target.value)}
//                           className="input-field"
//                         />
//                         <input
//                           type="time"
//                           value={selectedTime}
//                           onChange={(e) => setSelectedTime(e.target.value)}
//                           className="input-field"
//                         />
//                         <input
//                           type="text"
//                           placeholder="Enter Meeting Link"
//                           value={meetingLink}
//                           onChange={(e) => setMeetingLink(e.target.value)}
//                           className="input-field"
//                         />
//                         <input
//                               type="text"
//                               placeholder="Enter reason"
//                               value={adminmessage}
//                               onChange={(e) => setadminmessage(e.target.value)}
//                               className="input-field"
//                             />
//                         <button
//                           onClick={() => scheduleSlot(req.id)}
//                           className="schedule-btn"
//                         >
//                           Schedule
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => deleteRequest(req.id)}
//                       className="delete-btn"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   <td>{req.message}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Appointments;


import { useState, useEffect } from "react";
import axios from "axios";
import "./appointments.css";
import Sidebar from "../sidebar/LeftBar";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;



const Appointments = () => {
  const [requests, setRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [message, setMessage] = useState("");
  const [adminmessage, setadminmessage] = useState("");
  const [userName, setUserName] = useState("");  
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  //const [editingAppointment, setEditingAppointment] = useState(null);
  
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  
  const [purpose, setPurpose] = useState("");
 
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/appointments/`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/user`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(storedRequests);
  }, []);

  const deleteRequest = (id) => {
    const updatedRequests = requests.filter((req) => req.id !== id);
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    window.dispatchEvent(new Event("storage"));
  };

  const scheduleSlot = async (id) => {
    if (!selectedDate || !selectedTime || !meetingLink || !adminmessage) {
      alert("Please fill all fields (Date, Time, and Meeting Link).");
      return;
    }

    try {
      const response = await axios.put(`${apiBaseUrl}/appointments/confirm/${id}`, {
        date: selectedDate,
        time: selectedTime,
        meetLink: meetingLink,
        purpose: adminmessage,
        status: "confirmed",
      });

      const updatedRequests = requests.map((req) =>
        req.id === id ? { ...req, status: "Booked", scheduledDate: selectedDate, time: selectedTime, meetingLink, adminmessage } : req
      );

      setRequests(updatedRequests);
      localStorage.setItem("requests", JSON.stringify(updatedRequests));
      window.dispatchEvent(new Event("storage"));
      setSelectedDate("");
      setSelectedTime("");
      setMeetingLink("");
      setadminmessage("");
      setEditingId(null);
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to schedule appointment. Please try again.");
    }
  };

  const openScheduleForm = () => setShowScheduleForm(true);
  const closeScheduleForm = () => {
    setShowScheduleForm(false);
    setUserName("");
    setSelectedDate("");
    setSelectedTime("");
    setMeetingLink("");
    setMessage("");
  };

  const handleAdminSchedule = async () => {
    if (!userName || !selectedDate || !selectedTime || !message || !meetingLink) {
      alert("Please fill all fields (Name, Date, Time, Message, and Meeting Link).");
      return;
    }

    try {
      const selectedUser = users.find((user)=>user._id===userName)

      const response = await axios.post(`${apiBaseUrl}/appointments/schedule`, {
        userId: selectedUser._id,
        username: selectedUser.name ,
        date: selectedDate,
        time: selectedTime,
        meetLink:meetingLink,
        purpose: message,
        //status: "Booked",
      });

      const newRequest = {
        id: response.data.id,
        username: userName,
        scheduledDate: selectedDate,
        time: selectedTime,
        meetingLink,
        message,
        status: "Booked",
        userRequestedDate: "-",
        userRequestedMessage: "-",
      };

      const updatedRequests = [...requests, newRequest];
      setRequests(updatedRequests);
      localStorage.setItem("requests", JSON.stringify(updatedRequests));
      window.dispatchEvent(new Event("storage"));
      
      setUserName("");
      setSelectedDate("");
      setSelectedTime("");
      setMeetingLink("");
      setMessage("");
      setShowScheduleForm(false);
      alert("Appointment scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert("Failed to schedule appointment. Please try again.");
    }
    window.location.reload();
  };

  // Handle Delete Appointment
  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/appointments/${id}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Open Edit Form
  const openEditForm = (appointment) => {
    console.log("Edit button clicked for:", appointment); // Debugging line
    setEditingAppointment(appointment);
    setSelectedDate(appointment.date || "");
    setSelectedTime(appointment.time || "");
    setMeetingLink(appointment.meetLink || "");
    setPurpose(appointment.purpose || "");
    
  };

  const updateAppointment = async () => {
    if (!selectedDate || !selectedTime || !meetingLink || !purpose) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.put(`${apiBaseUrl}/appointments/confirm/${editingAppointment._id}`, {
        date: selectedDate,
        time: selectedTime,
        meetLink: meetingLink,
        purpose,
      });

      setAppointments(appointments.map((appointment) =>
        appointment._id === editingAppointment._id ? response.data.appointment : appointment
      ));

      alert("Appointment updated successfully!");
      setEditingAppointment(null);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="admin-container">
        <h2 className="admin-title">Admin Dashboard</h2>

        <button className="schedule-meeting-btn" onClick={openScheduleForm}>
          Schedule Meeting
        </button>

        {showScheduleForm && (
          <div className="schedule-form-popup">
            <h3>Admin Schedule a Meeting</h3>

            <select value={userName} onChange={(e) => setUserName(e.target.value)} className="input-field">
              <option value="">Select User</option>
              {Array.isArray(users) && users.map((user) => (
  <option key={user._id} value={user._id}>{user.name}</option>
))}

            </select>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="input-field" />
            <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="input-field" />
            <input type="text" placeholder="Enter Meeting Link" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} className="input-field" />
            <input type="text" placeholder="Enter Reason" value={message} onChange={(e) => setMessage(e.target.value)} className="input-field" />

            <button onClick={handleAdminSchedule} className="schedule-btn">Schedule</button>
            <button onClick={closeScheduleForm} className="cancel-btn">Cancel</button>
          </div>
        )}

<table className="admin-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Status</th>
              <th>Request Message</th>
              <th>Requested Date</th>
              <th>Scheduled Date</th>
              <th>Time</th>
              <th>Meeting Link</th>
              <th>Purpose</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-requests">No Appointments Found</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.username}</td>
                  <td className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</td>
                  <td>{appointment.requestMessage || "-"}</td>
                  <td>{appointment.requestedDate || "-"}</td>
                  <td>{appointment.date || "Not Scheduled"}</td>
                  <td>{appointment.time || "Not Set"}</td>
                  <td>
                    {appointment.meetLink ? (
                      <a href={appointment.meetLink} target="_blank" rel="noopener noreferrer">
                        Open Link
                      </a>
                    ) : (
                      "No Link"
                    )}
                  </td>
                  <td>{appointment.purpose || "-"}</td>
                  <td>
                    <button onClick={() => openEditForm(appointment)} className="edit-btn">Edit</button> 
                    <button onClick={() => deleteAppointment(appointment._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Edit Appointment Form (Modal) */}
        {editingAppointment && (
  <>
    <div className="edit-form-overlay" onClick={() => setEditingAppointment(null)}></div>
    <div className="edit-form-popup">
      <h3>Edit Appointment</h3>
      <input type="date" className="input-field" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      <input type="time" className="input-field" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
      <input type="text" className="input-field" placeholder="Meeting Link" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} />
      <input type="text" className="input-field" placeholder="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
      <div className="buttons">
        <button className="update-btn" onClick={updateAppointment}>Update</button>
        <button className="cancel-btn" onClick={() => setEditingAppointment(null)}>Cancel</button>
      </div>
    </div>
  </>
)}

      </div>
    </div>
  );
};

export default Appointments;

