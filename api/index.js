const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Add one name
app.post(`${process.env.API_DIR}/person`, async (req, res) => {
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
app.get(`${process.env.API_DIR}/person`, async (req, res) => {
  try {
    const allPeople = await pool.query("SELECT * FROM people");
    res.json(allPeople.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a name
app.get(`${process.env.API_DIR}/person/:id`, async (req, res) => {
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
app.put(`${process.env.API_DIR}/person/:id`, async (req, res) => {
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
app.delete(`${process.env.API_DIR}/person/:id`, async (req, res) => {
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

// Add one Relation
app.post(`${process.env.API_DIR}/relations`, async (req, res) => {
  try {
    const { person1, tag, person2 } = req.body;
    const newRel = await pool.query(
      "INSERT INTO relation (first_person_id,tag_id,second_person_id) VALUES($1,$2,$3) RETURNING *",
      [person1, tag, person2]
    );
    res.json(newRel.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all Relations
app.get(`${process.env.API_DIR}/relations`, async (req, res) => {
  try {
    const allRel = await pool.query("SELECT * FROM relation");
    res.json(allRel.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a Relation
app.get(`${process.env.API_DIR}/relations/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const Rel = await pool.query(
      "SELECT * FROM relation WHERE relation_id = $1",
      [id]
    );
    res.json(Rel.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a Relation
app.put(`${process.env.API_DIR}/relations/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { person1, tag, person2 } = req.body;

    const updateTag = await pool.query(
      "UPDATE relation SET first_person_id = $1,tag_id = $2, second_person_id = $3 WHERE relation_id=$4",
      [person1, tag, person2, id]
    );
    res.json(updateTag);
  } catch (error) {
    console.error(error.message);
  }
});

// Remove a Relation
app.delete(`${process.env.API_DIR}/relations/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTag = await pool.query(
      "DELETE FROM relation WHERE relation_id = $1",
      [id]
    );
    res.json(deleteTag);
  } catch (error) {
    console.error(error.message);
  }
});
// Add one Tag
app.post(`${process.env.API_DIR}/tags`, async (req, res) => {
  try {
    const { tag } = req.body;
    const newTag = await pool.query(
      "INSERT INTO tags (tag_name) VALUES($1) RETURNING *",
      [tag]
    );
    res.json(newTag.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all Tags
app.get(`${process.env.API_DIR}/tags`, async (req, res) => {
  try {
    const allTags = await pool.query("SELECT * FROM tags");
    res.json(allTags.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a Tag
app.get(`${process.env.API_DIR}/tags/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await pool.query("SELECT * FROM tags WHERE tag_id = $1", [id]);
    res.json(tag.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a Tag
app.put(`${process.env.API_DIR}/tags/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { tag } = req.body;
    const updateTag = await pool.query(
      "UPDATE tags SET tag_name = $1 WHERE tag_id = $2",
      [tag, id]
    );
    res.json(updateTag);
  } catch (error) {
    console.error(error.message);
  }
});

// Remove a Tag
app.delete(`${process.env.API_DIR}/tags/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTag = await pool.query("DELETE FROM tags WHERE tag_id = $1", [
      id,
    ]);
    res.json(deleteTag);
  } catch (error) {
    console.error(error.message);
  }
});

app.get(`${process.env.API_DIR}/`, (req, res) => {
  res.send("<center><span>Relationship Builder API Listening</span></center>");
});

app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});
