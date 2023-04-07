const express = require("express");
const cors = require("cors");
const passport = require('passport');
require('./config/passport')(passport);

const app = express();
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// Import the routes here
const userRoutes = require("./routes/userRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const authRoutes = require("./routes/authRoutes"); // Add this line

// Use the routes in the app
app.use("/api/users", userRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/auth", authRoutes); // Add this line

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
