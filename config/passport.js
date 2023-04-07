const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      done(null, user.rows[0]);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await pool.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);

          if (existingUser.rowCount > 0) {
            done(null, existingUser.rows[0]);
          } else {
            const newUser = await pool.query(
              'INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *',
              [profile.displayName, profile.emails[0].value, profile.id]
            );
            done(null, newUser.rows[0]);
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};
