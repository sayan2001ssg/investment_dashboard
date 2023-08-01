const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "abc123"; // Change this to a secure random key in a real-world app
const PORT = 5000;

const db = mysql.createConnection({

  host: "127.0.0.1",
  user: "root",
  password: "admin123",
  database: "masterdata",
});
// Test the database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});
//Register route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists in the database
    const checkUserQuery = "SELECT * FROM user_data WHERE username = ?";
    const [existingUser] = await db.promise().query(checkUserQuery, [username]);
    // If the user already exists, return an error response
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User is already registered" });
    }
    // Hash the password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // If user does not exist, proceed with registration
    const sql = "INSERT INTO user_data (`username`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [username, email, hashedPassword];
    await db.promise().query(sql, values);
    return res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Implement the user login route

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM user_data WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const user = results[0];
      // Compare the password hash
      bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
        if (bcryptErr) {
          console.error(bcryptErr);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        // If the credentials are matched, fetch the uid for the same credentials from the user_data table
        db.query(
          "SELECT uid FROM user_data WHERE username = ?",
          [username],
          (uidErr, uidResults) => {
            if (uidErr) {
              console.error(uidErr);
              return res.status(500).json({ message: "Internal server error" });
            }

            if (uidResults.length === 0) {
              return res.status(401).json({ message: "Invalid credentials" });
            }
            const uid = uidResults[0].uid;
            console.log(uid);
            // Generate and send the JWT token along with the uid
            const token = jwt.sign(
              { id: user.id, username: user.username, uid: uid },
              SECRET_KEY,
              { expiresIn: "1h" }
            );
            return res.json({ token, uid });
          }
        );
      });
    }
  );
});
// Route to fetch data from the mutualfunds table for a specific UID
app.get("/api/mutualfunds", (req, res) => {
  const { uid } = req.query;
  const query = "SELECT * FROM mutualfunds WHERE uid = ? ORDER BY AMC";
  db.query(query, [uid], (err, results) => {
    if (err) {
      console.error("Error fetching data from the table:", err);
      res.status(500).json({ error: "Failed to fetch data from the table" });
      return;
    }
    res.json(results);
  });
});
// Route to fetch data from the stocks table for a specific UID

app.get("/api/stocks", (req, res) => {
  const { uid } = req.query;
  const query = "SELECT * FROM stocks WHERE UID = ? ORDER BY stock_name";
  db.query(query, [uid], (err, results) => {
    if (err) {
      console.error("Error fetching data from the table:", err);
      res.status(500).json({ error: "Failed to fetch data from the table" });
      return;
    }
    res.json(results);
  });
});

app.post("/api/post",(req, res) => {
    //const { uid } = req.query;
   
    const{uid,stock_name, unit_price, quantity, eq_price_date , tranc_date} = req.body;
    //console.log(req.body);
    const sqlInsert = "INSERT INTO masterdata.stocks (uid, stock_name, unit_price, quantity, eq_price_date, tranc_date) VALUES ( ? , ?, ?, ?, ?, ?)";
    //console.log("Debug1");
    db.query(sqlInsert, [uid, stock_name, unit_price, quantity, eq_price_date, tranc_date], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});
app.post("/api/post2",(req, res) => {
    const{ uid, AMC, MF_Scheme, Tranc_Date, Nav_Date, Amount, Unit} = req.body;
    //console.log(req.body);
    const sqlInsert = "INSERT INTO masterdata.mutualfunds (uid, AMC, MF_Scheme, Tranc_Date, Nav_Date, Amount, Unit) VALUES ( ? , ?, ?, ?, ?, ?, ?)";
    //console.log("Debug1");
    db.query(sqlInsert, [uid, AMC, MF_Scheme, Tranc_Date, Nav_Date, Amount, Unit], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});