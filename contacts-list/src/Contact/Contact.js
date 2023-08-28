import React, { useState } from "react";
import "./Contact.css";
import { Outlet, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.css";

function Contact(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteConfirmation = () => {
    for (let i = 0; i < props.contacts.length; i++) {
        if (props.contacts[i].id === props.id) props.contacts.splice(i, 1);
    }
  };
  return (
    <div id="card">
      <div id="img_div">
        <img src={require("./../images/" + props.image)} />
      </div>
      <div id="details_div">
        <h1>{props.name}</h1>
        <p>{props.contact}</p>
        <p>{props.email}</p>
      </div>
      <div id="options">
        <Link
          to={`/edit/${props.id}`}
          style={{
            backgroundColor: "white",
            color: "black",
            textDecoration: "none",
            marginBottom: "1.5rem",
            fontWeight: "bolder",
            width: "100px",
            height: "20px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Edit
        </Link>
        <button id="deleteButton" onClick={handleShow}>
          Delete
        </button>
        <Link
          to={`/details/${props.id}`}
          style={{
            backgroundColor: "white",
            color: "black",
            textDecoration: "none",
            marginTop: "1.5rem",
            fontWeight: "bolder",
            width: "100px",
            height: "20px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          See details
        </Link>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deletion confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this contact?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Contact;
