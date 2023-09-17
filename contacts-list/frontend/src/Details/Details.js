import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { useParams } from "react-router";
import "./Details.css";

function Details() {
  let { id } = useParams();

  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    Axios.get("http://localhost:3002/api/getFromId/" + id.toString()).then((data)=>{
      setContacts(data.data);
      setLoading(false);
    });
  },[])

  function getContact(id) {
    console.log(id);
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id == id) return contacts[i];
    }
  }

  return (
    <div id="details">
      <h1>Contact {id} Details</h1>
      {loading === false ? (
        <div id="contact_details">
          <img src={require("../images/" + getContact(id).picture)} />
          <p>Name: {getContact(id).name}</p>
          <p>Contact: {getContact(id).contactNumber}</p>
          <p style={{ marginBottom: "5.5rem" }}>
            Email: {getContact(id).email}
          </p>
          <Link
            to="/"
            style={{
              backgroundColor: "white",
              color: "black",
              textDecoration: "none",
              fontWeight: "bolder",
              width: "100px",
            }}
          >
            Back
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Details;
