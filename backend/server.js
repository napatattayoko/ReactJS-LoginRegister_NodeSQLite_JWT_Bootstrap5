const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 3001;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.err(err.message);
  }
  console.log("connected to the sqlite3 Database");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT    
)`);

// API Endpoint

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and Password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = `INSERT INTO users (username , password) VALUES (? , ?)`;

  db.run(sql, [username, password], function (err) {
    if (err) {
      if (err.errno === 19) {
        //Error is user exist
        return res.status(409).json({ message: "Username already exists" });
      }
      return res.status(500).json({ message: "Database Error" });
    }
    res
      .status(201)
      .json({ message: "User registered succesfully", userId: this.lastID });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
