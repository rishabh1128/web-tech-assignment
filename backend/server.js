const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors"); // Import the cors package
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer storage
const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename to be unique
  },
});

// Create multer instance
const upload = multer({ storage: storage });

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS cvs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    photo TEXT,
    contact TEXT,
    education TEXT,
    experience TEXT,
    skills TEXT,
    certifications TEXT,
    projects TEXT,
    languages TEXT
)`);

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files from the uploads directory
app.use(express.static("public"));
app.use(cors({ origin: "*" }));

// Route to add a new CV
app.post("/api/cvs", upload.single("photo"), (req, res) => {
  const {
    name,
    photo,
    contact,
    education,
    experience,
    skills,
    certifications,
    projects,
    languages,
  } = req.body;

  const photo_path = req.file ? req.file.path : "";
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }

  console.log(req.file);

  const sql = `INSERT INTO cvs (name, photo, contact, education, experience, skills, certifications, projects, languages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    name,
    photo_path,
    contact,
    education,
    experience,
    skills,
    certifications,
    projects,
    languages,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error adding CV to database:", err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(201).send("CV added successfully.");
    }
  });
});

// Route to get CVs with optional query parameters
app.get("/api/cvs", (req, res) => {
  const { skills } = req.query;
  const sql = `SELECT * FROM cvs WHERE skills LIKE '%${skills}%'`;
  const params = [];
  // Execute SQL query with parameters
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Error querying database:", err.message);
      res.status(500).send("Internal Server Error");
    } else {
      // Construct photo URL for each CV
      const cvsWithPhotoURL = rows.map((cv) => ({
        ...cv,
        photo: cv.photo ? `/${path.basename(cv.photo)}` : null,
      }));
      res.json(cvsWithPhotoURL);
    }
  });
});

// Route to serve the image file
app.get("/api/cvs/photo/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "public", filename);

  // Send the image file as the response
  res.sendFile(filePath);
});

// Route to delete all rows in the database table
app.get("/api/cvs/delete", (req, res) => {
  // SQL query to delete all rows from the table
  const sql = `DELETE FROM cvs`;

  // Execute the SQL query
  db.run(sql, function (err) {
    if (err) {
      console.error("Error deleting rows from database:", err.message);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("All rows deleted successfully.");
      res.status(200).send("All rows deleted successfully.");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
