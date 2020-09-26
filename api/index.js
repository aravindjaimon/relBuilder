const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// Add one name
app.post("/person", async (req, res) => {
  try {
    const { name } = req.body;
    const newName = await pool.query(
      "INSERT INTO people (person_name) VALUES($1) RETURNING *",
      [name]
    );
    res.json(newName.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all name
app.get("/person", async (req, res) => {
  try {
    const allPeople = await pool.query("SELECT * FROM people");
    res.json(allPeople.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a name
app.get("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const person = await pool.query(
      "SELECT * FROM people WHERE person_id = $1",
      [id]
    );
    res.json(person.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update name
app.put("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateName = await pool.query(
      "UPDATE people SET person_name = $1 WHERE person_id = $2",
      [name, id]
    );
    res.json(updateName);
  } catch (error) {
    console.error(error.message);
  }
});

// Remove Name
app.delete("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteName = await pool.query(
      "DELETE FROM people WHERE person_id = $1",
      [id]
    );
    res.json(deleteName);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});
