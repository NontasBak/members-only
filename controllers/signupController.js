const { body, validationResult } = require("express-validator");
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

async function getSignup(req, res) {
    res.render("signup");
}

const validateSignupForm = [
    body("firstName")
        .notEmpty()
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("First name must be between 1 and 255 characters"),

    body("lastName")
        .notEmpty()
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Last name must be between 1 and 255 characters"),

    body("email")
        .notEmpty()
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .isLength({ max: 255 })
        .withMessage("Email must be less than 255 characters"),

    body("password")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];

const createUser = [
    validateSignupForm,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("signup", { errors: errors.array() });
        }

        try {
            const { firstName, lastName, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.createUser(firstName, lastName, email, hashedPassword);
            res.redirect("/");
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
];

module.exports = {
    getSignup,
    createUser,
};
