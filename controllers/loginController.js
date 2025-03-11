const { body, validationResult } = require("express-validator");
const passport = require("passport");

async function getLogin(req, res) {
    res.render("login", { errors: req.flash("error") });
}

validateLoginForm = [
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

const login = [
    validateLoginForm,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("login", { errors: errors.array() });
        }

        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res, next);
    },
];

module.exports = {
    getLogin,
    login,
};
