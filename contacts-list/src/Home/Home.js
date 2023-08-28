import React,{useEffect, useState} from 'react';
import Contact from '../Contact/Contact';
import './Home.css';

function Home() {
    const [contacts,setContacts] = useState(null);
    const [loading,setLoading] = useState(true);

    const getData=()=>{
        fetch('./contacts.json'
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

  return (
    <div className="Home">
        <h1 id="title">Contacts List</h1>
      {loading === false ? contacts.map((i) => {return <Contact key={i.id} image={i.picture} name={i.name} contact={i.contact} email={i.email}></Contact>}) : <></>}
    </div>
  );
}

export default Home;
