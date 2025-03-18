// import { useState, useEffect } from "react";
// import "./request.css";

// const UserRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [formData, setFormData] = useState({ username: "", date: "", reason: "" });
//   const [formVisible, setFormVisible] = useState(false);

//   useEffect(() => {
//     const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
//     setRequests(storedRequests);
//   }, []);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const updatedRequests = JSON.parse(localStorage.getItem("requests")) || [];
//       setRequests(updatedRequests);
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const requestSlot = () => {
//     setFormVisible(true);
//   };

//   const handleSubmit = () => {
//     if (!formData.username || !formData.date || !formData.reason) {
//       alert("Username, date, and reason are required!");
//       return;
//     }

//     const newRequest = {
//       id: Date.now(),
//       username: formData.username,
//       status: "Pending",
//       date: formData.date,
//       reason: formData.reason,
//       scheduledDate: "-",
//       time: "-",
//       meetingLink: "",
//       remarks: "Wait for schedule"
//     };

//     const updatedRequests = [...requests, newRequest];
//     setRequests(updatedRequests);
//     localStorage.setItem("requests", JSON.stringify(updatedRequests));
//     window.dispatchEvent(new Event("storage"));
//     setFormVisible(false);
//     setFormData({ username: "", date: "", reason: "" });
//   };

//   return (
//     <div className="container">
//       <h2 className="title">User Requests</h2>
//       <button onClick={requestSlot} className="request-button">Request a Slot</button>

//       {formVisible && (
//         <div className="form-container">
//           <h3 className="form-title">Request a Slot</h3>
//           <label className="label">Enter Your Name:</label>
//           <input
//             type="text"
//             className="input"
//             value={formData.username}
//             onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//           />
//           <label className="label">Select Date:</label>
//           <input
//             type="date"
//             className="input"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//           />
//           <label className="label">Enter Reason:</label>
//           <textarea
//             className="input"
//             value={formData.reason}
//             onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//           ></textarea>
//           <div className="form-actions">
//             <button onClick={() => setFormVisible(false)} className="cancel-button">Cancel</button>
//             <button onClick={handleSubmit} className="submit-button">Submit</button>
//           </div>
//         </div>
//       )}

//       <div className="table-container">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Request ID</th>
//               <th>Status</th>
//               <th>Requested Date</th>
//               <th>Scheduled Date</th>
//               <th>Time</th>
//               <th>Meeting Link</th>
//               <th>Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="no-requests">No Requests</td>
//               </tr>
//             ) : (
//               requests.map((req) => (
//                 <tr key={req.id}>
//                   <td>{req.id}</td>
//                   <td className={`status ${req.status.toLowerCase()}`}>{req.status}</td>
//                   <td>{req.date !== "-" ? req.date : "Not Set"}</td>
//                   <td>{req.scheduledDate !== "-" ? req.scheduledDate : "Not Scheduled"}</td>
//                   <td>{req.time !== "-" ? req.time : "Not Set"}</td>
//                   <td>
//                     {req.meetingLink ? (
//                       <a href={req.meetingLink} target="_blank" rel="noopener noreferrer" className="meeting-link">Open Link</a>
//                     ) : (
//                       "No Link"
//                     )}
//                   </td>
//                   <td>
//                     {req.status === "Pending" ? "Wait for schedule" : req.scheduledDate === req.date
//                       ? "Your meeting is scheduled according to your requirements."
//                       : "Mentor not available that day."}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserRequests;



// import { useState, useEffect } from "react";
// import axios from "axios";  // Import Axios
// import "./request.css";

// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// const UserRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [formData, setFormData] = useState({ date: "", reason: "" });
//   const [formVisible, setFormVisible] = useState(false);

//   useEffect(() => {
//     const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
//     setRequests(storedRequests);
//   }, []);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const updatedRequests = JSON.parse(localStorage.getItem("requests")) || [];
//       setRequests(updatedRequests);
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const requestSlot = () => {
//     setFormVisible(true);
//   };

//   const handleSubmit = async () => {
//     const userId = localStorage.getItem("userid"); 
//     const username = localStorage.getItem("name"); 

//     if (!userId || !username) {
//       alert("User ID or Username is missing from localStorage!");
//       return;
//     }

//     if (!formData.date || !formData.reason) {
//       alert("Date and reason are required!");
//       return;
//     }

//     try {
//       const response = await axios.post(`${apiBaseUrl}/request`, {
//         userId,
//         username,
//         requestMessage: formData.reason,
//         requestedDate: formData.date
//       });

//       const newRequest = {
//         id: Date.now(),
//         username,
//         status: "Pending",
//         date: formData.date,
//         reason: formData.reason,
//         scheduledDate: "-",
//         time: "-",
//         meetingLink: "",
//         remarks: "Wait for schedule"
//       };

//       setRequests([...requests, newRequest]);
//       localStorage.setItem("requests", JSON.stringify([...requests, newRequest]));
//       window.dispatchEvent(new Event("storage"));

//       alert("Request Sent Successfully!");
//       setFormVisible(false);
//       setFormData({ date: "", reason: "" });

//     } catch (error) {
//       console.error("Error sending request:", error);
//       alert("Failed to send request!");
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="title">User Requests</h2>
//       <button onClick={requestSlot} className="request-button">Request a Slot</button>

//       {formVisible && (
//         <div className="form-container">
//           <h3 className="form-title">Request a Slot</h3>
//           <label className="label">Select Date:</label>
//           <input
//             type="date"
//             className="input"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//           />
//           <label className="label">Enter Reason:</label>
//           <textarea
//             className="input"
//             value={formData.reason}
//             onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//           ></textarea>
//           <div className="form-actions">
//             <button onClick={() => setFormVisible(false)} className="cancel-button">Cancel</button>
//             <button onClick={handleSubmit} className="submit-button">Submit</button>
//           </div>
//         </div>
//       )}

//       <div className="table-container">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Request ID</th>
//               <th>Status</th>
//               <th>Requested Date</th>
//               <th>Scheduled Date</th>
//               <th>Time</th>
//               <th>Meeting Link</th>
//               <th>Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="no-requests">No Requests</td>
//               </tr>
//             ) : (
//               requests.map((req) => (
//                 <tr key={req.id}>
//                   <td>{req.id}</td>
//                   <td className={`status ${req.status.toLowerCase()}`}>{req.status}</td>
//                   <td>{req.date !== "-" ? req.date : "Not Set"}</td>
//                   <td>{req.scheduledDate !== "-" ? req.scheduledDate : "Not Scheduled"}</td>
//                   <td>{req.time !== "-" ? req.time : "Not Set"}</td>
//                   <td>
//                     {req.meetingLink ? (
//                       <a href={req.meetingLink} target="_blank" rel="noopener noreferrer" className="meeting-link">Open Link</a>
//                     ) : (
//                       "No Link"
//                     )}
//                   </td>
//                   <td>
//                     {req.status === "Pending" ? "Wait for schedule" : req.scheduledDate === req.date
//                       ? "Your meeting is scheduled according to your requirements."
//                       : "Mentor not available that day."}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserRequests;



import { useState, useEffect } from "react";
import axios from "axios"; 
import "./request.css";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const userId = localStorage.getItem("userid");
const username = localStorage.getItem("name");

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ date: "", reason: "" });
  const [formVisible, setFormVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/appointments/${userId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
  useEffect(() => {
    setRequests(storedRequests);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedRequests = JSON.parse(localStorage.getItem("requests")) || [];
      setRequests(updatedRequests);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const requestSlot = () => {
    setFormVisible(true);
  };

  const handleSubmit = async () => {
    if (!formData.date || !formData.reason) {
      alert("Date and reason are required!");
      return;
    }

    

    if (!userId || !username) {
      alert("User not found in localStorage");
      return;
    }

    const requestData = {
      userId,
      username,
      requestMessage: formData.reason,
      requestedDate: formData.date
    };

    try {
      const response = await axios.post(`${apiBaseUrl}/appointments/request`, requestData);
      alert(response.data.message);
      console.log(response.data);
      
      const newRequest = {
        id: response.data.appointment._id, 
        username,
        status: "Pending",
        date: formData.date,
        reason: formData.reason,
        scheduledDate: "-",
        time: "-",
        meetingLink: "",
        adminmessage:"",
        purpose: "Waiting for admin schedule",
      };

      const updatedRequests = [...requests, newRequest];
      setRequests(updatedRequests);
      localStorage.setItem("requests", JSON.stringify(updatedRequests));
      window.dispatchEvent(new Event("storage"));
      setFormVisible(false);
      setFormData({ date: "", reason: "" });
    } catch (error) {
      alert("Request send failed. Please try again.");
      console.error("Error sending request:", error);
    }
    window.location.reload();
  };



  return (
    <div className="container">
      <h2 className="title">User Requests</h2>
      <button onClick={requestSlot} className="request-button">Request a Slot</button>

      {formVisible && (
        <div className="form-container">
          <h3 className="form-title">Request a Slot</h3>
          <label className="label">Select Date:</label>
          <input
            type="date"
            className="input"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <label className="label">Enter Reason:</label>
          <textarea
            className="input"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          ></textarea>
          <div className="form-actions">
            <button onClick={() => setFormVisible(false)} className="cancel-button">Cancel</button>
            <button onClick={handleSubmit} className="submit-button">Submit</button>
          </div>
        </div>
      )}

      <div className="table-container">
        

<table className="table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Status</th>
            <th>Requested Date</th>
            <th>Requested Message</th>
            <th>Scheduled Date</th>
            <th>Scheduled Time</th>
            <th>Meeting Link</th>
            <th>Admin Message</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-requests">No Requests</td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment._id}</td>
                <td className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</td>
                <td className="center">
                  {appointment.requestedDate ? appointment.requestedDate : <span className="dash">-</span>}
                </td>
                <td>
                  {appointment.requestMessage ? appointment.requestMessage : <span className="dash">-</span>}
                </td>
                <td>
                  {appointment.date ? appointment.date : <span className="dash">-</span>}
                </td>
                <td>
                  {appointment.time ? appointment.time : <span className="dash">-</span>}
                </td>
                <td>
                  {appointment.meetLink ? (
                    <a href={appointment.meetLink} target="_blank" rel="noopener noreferrer" className="meeting-link">
                      Open Link
                    </a>
                  ) : (
                    "No Link"
                  )}
                </td>
                <td>
                  {appointment.purpose ? appointment.purpose : <span className="dash">-</span>}
                </td>
                {/* <td>
                  {appointment.adminMessage ? appointment.adminMessage : <span className="dash">-</span>}
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default UserRequests;
