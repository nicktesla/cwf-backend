const pool = require("../db");

exports.createChallenge = async (req, res) => {
  const { name, creator_id } = req.body;
  try {
    const newChallenge = await pool.query(
      "INSERT INTO challenges (name, creator_id) VALUES ($1, $2) RETURNING *",
      [name, creator_id]
    );
    res.json(newChallenge.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error:
