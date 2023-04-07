const express = require("express");
const router = express.Router();
const challengeController = require("../controllers/challengeController");

router.post("/", challengeController.createChallenge);
router.get("/:id", challengeController.getChallengeById);
router.get("/", challengeController.getAllChallenges);

module.exports = router;
