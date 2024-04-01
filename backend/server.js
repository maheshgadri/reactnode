const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wallstocks"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, password];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('User created successfully:', result);
        return res.status(201).json({ message: 'User created successfully' });
    });
});

//Login api called
app.post('/login', (req, res) => {
   
    const sql = "SELECT * FROM users WHERE 'email'= ? AND 'password' = ? ";
    const values = ;
    db.query(sql, [req.body.email,req.body.password], (err, result) => {
        if (err) {
            return res.json("Error");
        }
  if (data.length>0){
        return res.json("Success");
  }
  else{
    return res.json("Failed"); 
  } 
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
