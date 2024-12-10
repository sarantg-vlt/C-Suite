import React, { useState } from 'react'
import { Button, Form, Modal } from "react-bootstrap";


const EditEvent = () => {
     const [showModal, setShowModal] = useState(false);
     const [title, setTitle] = useState("");
     const [description, setDescription] = useState("");
     const [startDate, setStartDate] = useState("");
     const [endDate, setEndDate] = useState("");
    //  console.log(events);

     const handleAddEvent = () => {};
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter event start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
    </>
  );
}

export default EditEvent