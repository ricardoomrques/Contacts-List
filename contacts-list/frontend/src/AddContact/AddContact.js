import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import "./AddContact.css";

function AddContact() {
  const [contacts, setContacts] = useState(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');

  const navigate = useNavigate();

  const addContact = () => {
    let add = false;
    if (name.length < 5) {
      add = true;
      alert("Name must have at least 5 characters!");
      window.location.reload(true);
    }

    else if (!validateEmail(email)) {
      add = true;
      alert("Email not valid!");
      window.location.reload(true);
    }

    else if (contact.length !== 9 || !isNumeric(contact)) {
      add = true;
      alert("Contact must have 9 numbers!");
      window.location.reload(true);
    }
    
    for (let i = 0; i < contacts.length; i++) {
      if (
        contacts[i].email === email ||
        contacts[i].contact === contact
      ) {
        add = true;
        alert("Contact or email already registered in the system!");
        window.location.reload(true);
      }
    }

    if (!add) {
      const newContact = {"name": name, "contactNumber": contact,
      "email": email, "picture": picture.substring(picture.lastIndexOf('\\') + 1)};
  
      Axios.post('http://localhost:3002/api/create', newContact);

      navigate('/');
      window.location.reload(true);

    }
  }

  const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
  }

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const getData = () => {
    Axios.get("http://localhost:3002/api/get").then((data)=>{
        setContacts(data.data);
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
            onChange={(event) =>
              setName(event.target.value)
            }
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
            onChange={(event) =>
              setEmail(event.target.value)
            }
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
            onChange={(event) =>
              setContact(event.target.value)
            }
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3 w-25 mx-auto">
          <Form.Label>Picture</Form.Label>
          <Form.Control id="pictureForm" type="file" accept=".jpg,.png,.jpeg" required onChange={(event) => setPicture(event.target.value)}/>
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
