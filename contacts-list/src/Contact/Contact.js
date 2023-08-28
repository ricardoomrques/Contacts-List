import React, { Component } from "react";
import "./Contact.css";
import { Outlet, Link } from "react-router-dom";

class Contact extends React.Component {
  render() {
    return (
      <div id="card">
        <div id="img_div">
          <img src={require("./../images/" + this.props.image)} />
        </div>
        <div id="details_div">
          <h1>{this.props.name}</h1>
          <p>{this.props.contact}</p>
          <p>{this.props.email}</p>
        </div>
        <div id="options">
            <Link to='/edit' style={{backgroundColor:"white",color:"black",textDecoration:"none", marginBottom:"1.5rem", fontWeight:"bolder", width:"100px"}}>Edit</Link>
            <Link to="contact" style={{backgroundColor:"white",color:"black",textDecoration:"none", fontWeight:"bolder", width:"100px"}}>Delete</Link>
            <Link to={`/details/${this.props.id}`} style={{backgroundColor:"white",color:"black",textDecoration:"none", marginTop:"1.5rem", fontWeight:"bolder", width:"100px"}}>See details</Link>
        </div>
      </div>
    );
  }
}

export default Contact;
