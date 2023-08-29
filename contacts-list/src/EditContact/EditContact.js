import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Outlet, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";
import "./EditContact.css";

function EditContact() {
    let { id } = useParams();

    const [contacts,setContacts] = useState(null);
    const [loading,setLoading] = useState(true);

    const verify=()=> {
        for (let i = 0; i < contacts.length; i++) {
            if ((contacts[i].id !== id) && (contacts[i].email === document.getElementById("emailForm").value ||
            contacts[i].contact === document.getElementById("contactForm").value))
                alert('Contact or email already registered in the system!')
        } 
    }

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
    <div id="addContact">
      <h1>Edit Contact</h1>
      {loading === false ? 
      <Form>
        <Form.Group
          className="mb-3 w-25 mx-auto"
          controlId="exampleForm.ControlText1"
          style={{ marginTop: "5rem" }}
        >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" defaultValue={getContact(id).name} required minLength={5}/>
        </Form.Group>
        <Form.Group
          className="mb-3 w-25 mx-auto"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control id="emailForm" type="email" defaultValue={getContact(id).email} required/>
        </Form.Group>
        <Form.Group
          className="mb-3 w-25 mx-auto"
          controlId="exampleForm.ControlText1"
        >
          <Form.Label>Contact</Form.Label>
          <Form.Control id="contactForm" type="text" defaultValue={getContact(id).contact} required minLength={9} maxLength={9}/>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3 w-25 mx-auto">
          <Form.Label>Picture</Form.Label>
          <Form.Control type="file" accept=".jpg,.png,.jpeg" required/>
        </Form.Group>
        <div style={{textAlign:"center", marginTop:"5rem"}}>
            <Button type="submit" style={{textAlign:"center"}} onClick={verify}>Edit contact</Button>
        </div>
      </Form> : <></>}
      <div style={{textAlign:"center", marginTop:"2.5rem"}}>
        <Link to='/' style={{backgroundColor:"white",color:"black",textDecoration:"none", fontWeight:"bolder", width:"100%", textAlign:"center"}}>Back</Link>
      </div>
    </div>
  );
}

export default EditContact;
