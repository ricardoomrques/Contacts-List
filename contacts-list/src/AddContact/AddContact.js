import React, { Component, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import "./AddContact.css";

function AddContact() {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const addContact = () => {
    console.log(contacts.slice(-1).id + 1);
    let repeated = false;
    for (let i = 0; i < contacts.length; i++) {
      if (
        contacts[i].email === document.getElementById("emailForm").value ||
        contacts[i].contact === document.getElementById("contactForm").value
      ) {
        repeated = true;
        alert("Contact or email already registered in the system!");
        window.location.reload(true);
      }
    }

    if (!repeated) {
      const newContact = {"id": parseInt(contacts.slice(-1).id + 1).toString(), "name": document.getElementById("nameForm").value, "contact": document.getElementById("contactForm").value,
      "email": document.getElementById("emailForm").value, "picture": document.getElementById("pictureForm").value};
  
      fetch('http://localhost:3004/contacts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
      })
    }
  } 

  const getData = () => {
    fetch('http://localhost:3004/contacts', {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setContacts(myJson);
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="addContact">
      <h1>Add a new Contact</h1>
      <Form>
        <Form.Group
          className="mb-3 w-25 mx-auto"
          controlId="exampleForm.ControlText1"
          style={{ marginTop: "5rem" }}
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="nameForm"
            type="text"
            placeholder="Name here"
            required
            minLength={5}
          />
        </Form.Group>
        <Form.Group
          className="mb-3 w-25 mx-auto"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            id="emailForm"
            type="email"
            placeholder="name@example.com"
            required
          />
        </Form.Group>
        <Form.Group
          className="mb-3 w-25 mx-auto"
          controlId="exampleForm.ControlText1"
        >
          <Form.Label>Contact</Form.Label>
          <Form.Control
            id="contactForm"
            type="text"
            placeholder="Contact here"
            required
            minLength={9}
            maxLength={9}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3 w-25 mx-auto">
          <Form.Label>Picture</Form.Label>
          <Form.Control id="pictureForm" type="file" accept=".jpg,.png,.jpeg" required />
        </Form.Group>
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <Button
            type="submit"
            style={{ textAlign: "center" }}
            onClick={addContact}
          >
            Create contact
          </Button>
        </div>
      </Form>
      <div style={{ textAlign: "center", marginTop: "2.5rem"}}>
        <Link
          to="/"
          style={{
            backgroundColor: "white",
            color: "black",
            textDecoration: "none",
            fontWeight: "bolder",
            width: "100%",
            textAlign: "center",
          }}
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default AddContact;
