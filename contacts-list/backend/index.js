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
  db.query("SELECT * FROM contacts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
