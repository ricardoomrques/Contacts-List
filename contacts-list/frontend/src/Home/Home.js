import React,{useEffect, useState} from 'react';
import Contact from '../Contact/Contact';
import Axios from 'axios';
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
    const [contacts,setContacts] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
      Axios.get("http://localhost:3002/api/get").then((data)=>{
        setContacts(data.data);
        setLoading(false);
      });
    },[])

  return (
    <div className="Home">
        <div id="header">
            <h1 id="title">Contacts List</h1>
            <div style={{textAlign:"center"}}>
                <Link to='/add' style={{backgroundColor:"white",color:"black",textDecoration:"none", fontWeight:"bolder", width:"100%", textAlign:"center"}}>Add contact</Link>
            </div>
        </div>
      {loading === false ? contacts.map((i) => {return <Contact key={i.id} contacts={contacts} id={i.id} image={i.picture} name={i.name} contact={i.contactNumber} email={i.email}></Contact>}) : <></>}
    </div>
  );
}

export default Home;
