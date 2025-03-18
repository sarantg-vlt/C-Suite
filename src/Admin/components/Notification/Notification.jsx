// React Frontend - Notification.js
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/LeftBar";
import axios from "axios";
import "./notification.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({ title: "", message: "" });
  const [editingNotification, setEditingNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/notification`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const createNotification = async () => {
    if (!newNotification.title || !newNotification.message) return;
    try {
      await axios.post(`${API_BASE_URL}/notification`, newNotification);
      setNewNotification({ title: "", message: "" });
      fetchNotifications();
    } catch (error) {
      console.error("Error creating notification", error);
    }
  };

  const updateNotification = async () => {
    if (!editingNotification) return;
    try {
      await axios.put(`${API_BASE_URL}/notification/${editingNotification._id}`, {
        title: editingNotification.title,
        message: editingNotification.message,
      });
      setEditingNotification(null);
      fetchNotifications();
    } catch (error) {
      console.error("Error updating notification", error);
    }
  };


  const deleteNotification = async (notificationId) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/notification/${notificationId}`);
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  return (
    <div className="users-page-dashboard">
      <Sidebar />
      <div className="user-page">
        <h2>Admin Notifications</h2>

        <div className="notification-form">
          <input
            type="text"
            placeholder="Title"
            value={newNotification.title}
            onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
          />
          <textarea
            placeholder="Message"
            value={newNotification.message}
            onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
          />
          <button onClick={createNotification}>Create Notification</button>
        </div>

        {loading ? (
          <p>Loading notifications...</p>
        ) : (
          <div className="notification-containe notification-form">
            <ul className="notification-list">
              {notifications.map((notif) => (
                <li key={notif._id} className={`notification-item ${notif.isRead ? "read" : ""}`}>
                  {editingNotification && editingNotification._id === notif._id ? (
                    <div>
                      <input
                        type="text"
                        value={editingNotification.title}
                        onChange={(e) => setEditingNotification({ ...editingNotification, title: e.target.value })}
                      />
                      <textarea
                        value={editingNotification.message}
                        onChange={(e) => setEditingNotification({ ...editingNotification, message: e.target.value })}
                      />
                      <div className="notification-actions">
                      <button onClick={() => setEditingNotification(null)}>Cancel</button>

                      <button onClick={updateNotification}>Save</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3>{notif.title}</h3>
                      <p>{notif.message}</p>
                      <p><strong>Read by:</strong> {notif.readBy.length} {notif.readBy.length === 1 ? "user" : "users"}</p>
      
          {/* Uncomment below to show actual user IDs who read the notification */}
           <p>Read by IDs: {notif.readBy.join(", ")}</p>
                      <div className="notification-actions">
                        <button onClick={() => setEditingNotification(notif)}>Edit</button>
                        <button onClick={() => deleteNotification(notif._id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
 