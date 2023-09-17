import React, { useState } from "react";
import "./Contact.css";
import { Link } from "react-router-dom";
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";

function Contact(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteConfirmation = () => {
    Axios
      .delete('http://localhost:3002/api/delete/' + props.id)
      .then((response) => {
        console.log(`Deleted post with ID ${props.id}`);
      })
      .catch((error) => {
        console.error(error);
      });

    window.location.reload(true);
  };
  return (
    <div id="card">
      <div id="img_div">
        <img src={require("../images/" + props.image)} alt="Photo" />
      </div>
      <div id="details_div">
        <h2>{props.name}</h2>
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
          <Button variant="primary" onClick={deleteConfirmation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Contact;
