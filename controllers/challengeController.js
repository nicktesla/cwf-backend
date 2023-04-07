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
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.getChallengeById = async (req, res) => {
  const { id } = req.params;
  try {
    const challenge = await pool.query("SELECT * FROM challenges WHERE id = $1", [id]);
    if (challenge.rowCount === 0) {
      res.status(404).json({ error: "Challenge not found" });
    } else {
      res.json(challenge.rows[0]);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await pool.query("SELECT * FROM challenges");
    res.json(challenges.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
