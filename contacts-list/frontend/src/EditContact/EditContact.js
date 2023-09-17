import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import "./EditContact.css";

function EditContact() {
  let { id } = useParams();

  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const editContact = () => {
    let edit = false;

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("contact").value;
    let picture =
      document.getElementById("picture").value === ""
        ? getContact(id).picture
        : document.getElementById("picture").value;

    console.log(name);

    if (name.length < 5) {
      edit = true;
      alert("Name must have at least 5 characters!");
      window.location.reload(true);
    } else if (!validateEmail(email)) {
      edit = true;
      alert("Email not valid!");
      window.location.reload(true);
    } else if (contact.length !== 9 || !isNumeric(contact)) {
      edit = true;
      alert("Contact must have 9 numbers!");
      window.location.reload(true);
    }

    for (let i = 0; i < contacts.length; i++) {
      if (
        contacts[i].id !== id &&
        (contacts[i].email === email || contacts[i].contact === contact)
      ) {
        edit = true;
        alert("Contact or email already registered in the system!");
        window.location.reload(true);
      }
    }

    if (!edit) {
      const newContact = {
        name: name,
        contactNumber: contact,
        email: email,
        picture: picture.substring(picture.lastIndexOf("\\") + 1),
      };

      Axios.put("http://localhost:3002/api/edit/" + id.toString(), newContact);

      navigate("/");
      window.location.reload(true);
    }
  };

  const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const getData = () => {
    Axios.get("http://localhost:3002/api/get").then((data) => {
      setContacts(data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  function getContact(id) {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id == id) return contacts[i];
    }
  }

  return (
    <div id="editContact">
      <h1>Edit Contact</h1>
      {loading === false ? (
        <Form>
          <Form.Group
            className="mb-3 w-25 mx-auto"
            controlId="exampleForm.ControlText1"
            style={{ marginTop: "5rem" }}
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              defaultValue={getContact(id).name}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 w-25 mx-auto"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              defaultValue={getContact(id).email}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 w-25 mx-auto"
            controlId="exampleForm.ControlText1"
          >
            <Form.Label>Contact</Form.Label>
            <Form.Control
              id="contact"
              type="text"
              defaultValue={getContact(id).contactNumber}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 w-25 mx-auto">
            <Form.Label>Picture</Form.Label>
            <Form.Control
              id="picture"
              type="file"
              accept=".jpg,.png,.jpeg"
              required
            />
          </Form.Group>
          <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <Button
              type="submit"
              style={{ textAlign: "center" }}
              onClick={editContact}
            >
              Edit contact
            </Button>
          </div>
        </Form>
      ) : (
        <></>
      )}
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
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

export default EditContact;
