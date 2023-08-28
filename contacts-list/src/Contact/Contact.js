import React, { useState } from "react";
import "./Contact.css";
import { Outlet, Link } from "react-router-dom";

function Contact(props) {
  const deleteConfirmation = () => {
    for (let i = 0; i < props.contacts.length; i++) {
        if (props.contacts[i].id === props.id) props.contacts.splice(i, 1);
    }
    console.log(props.contacts);
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
          to="/edit"
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
        <button id="deleteButton" onClick={deleteConfirmation}>
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
    </div>
  );
}

export default Contact;
