const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all contacts
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM contact", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one contact
app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM contact WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the contact
app.post("/api/create", (req, res) => {
  const name = req.body.name;
  const contactNumber = req.body.contactNumber;
  const email = req.body.email;
  const picture = req.body.picture;

  db.query(
    "INSERT INTO contact (name,contactNumber,email,picture) VALUES (?,?,?,?)",
    [name, contactNumber, email, picture],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to edit a contact
app.put('/api/edit/:id',(req,res)=>{
  const id = req.params.id;
  const name = req.body.name;
  const contactNumber = req.body.contactNumber;
  const email = req.body.email;
  const picture = req.body.picture;
  
  db.query("UPDATE contact SET name = ?,contactNumber = ?, email = ?, picture = ? WHERE id = ?",[name,contactNumber,email,picture,id], (err,result)=>{
      if(err) {
     console.log(err)   } 
     console.log(result)
      });    
  });

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM contact WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
