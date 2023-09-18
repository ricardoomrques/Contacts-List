import React,{useEffect, useState} from 'react';
import Contact from '../Contact/Contact';
import Axios from 'axios';
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
            <a id="button" href={`/add`} class="btn btn-secondary btn-lg active btn-sm" role="button" aria-pressed="true">Add</a>
            </div>
        </div>
        <div id="contacts">
        {loading === false ? contacts.map((i) => {
          return <Contact key={i.id} contacts={contacts} id={i.id} image={i.picture} name={i.name} contact={i.contactNumber} email={i.email}></Contact>
        }) : <></>}
        </div>
    </div>
  );
}

export default Home;
