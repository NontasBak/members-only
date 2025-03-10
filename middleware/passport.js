const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

const customFields = {
    usernameField: "email",
    passwordField: "password",
};

passport.use(
    new LocalStrategy(customFields, async (email, password, done) => {
        try {
            const { rows } = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect email" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        const user = rows[0];

        done(null, user);
    } catch (error) {
        done(error);
    }
});
