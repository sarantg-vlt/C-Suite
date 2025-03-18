import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/LeftBar";
import Contactpage from "./Contactpage";
import AllContactList from "./AllContactList";
import axios from "axios";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const apiBaseUri = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${apiBaseUri}/contact`);
        setContacts(res.data); // Assuming the API response is structured as { data: [...] }
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [apiBaseUri]);

  return (
    <div className="">
      <Sidebar />
      <div className="user-page">
        <Contactpage contacts={contacts} />
        <AllContactList contacts={contacts} />
      </div>
    </div>
  );
};

export default ContactManagement;
