import React, { Component, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useParams } from "react-router";
import './Details.css';

function Details() {
    let { id } = useParams();

    const [contacts,setContacts] = useState(null);
    const [loading,setLoading] = useState(true);

    const getData=()=>{
        fetch('http://localhost:3004/contacts'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response);
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            setContacts(myJson);
            setLoading(false);
          });
      }
      useEffect(()=>{
        getData()
      },[])

      function getContact(id) {
       for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) return contacts[i];
       }
      }

    return (
      <div id="details">
        <h1>Contact {id} Details</h1>
        {loading === false ?
        <div id="contact_details">
            <img src={require('../images/' + getContact(id).picture)} />
            <p>Name: {getContact(id).name}</p>
            <p>Contact: {getContact(id).contact}</p>
            <p style={{marginBottom:"5.5rem"}}>Email: {getContact(id).email}</p>
            <Link to='/' style={{backgroundColor:"white",color:"black",textDecoration:"none", fontWeight:"bolder", width:"100px"}}>Back</Link>
        </div>
        : <></>}
      </div>
    );
}

export default Details;
