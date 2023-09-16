const mysql = require('mysql2')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "radioKDST26!",
database:"contacts" 
})

module.exports = db;