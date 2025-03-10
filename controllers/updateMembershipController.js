const { body, validationResult } = require("express-validator");
require("dotenv").config();
const db = require("../db/queries");

async function getUpdateMembership(req, res) {
    res.render("updateMembership");
}

const validateUpdateMembershipForm = [
    body("clubPassword")
        .notEmpty()
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Club password must be between 1 and 255 characters"),
];

const updateMembership = [
    validateUpdateMembershipForm,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .render("updateMembership", { errors: errors.array() });
        }

        try {
            const clubPassword = req.body.clubPassword;

            const correctClubPassword = process.env.CLUB_PASSWORD;
            if (clubPassword !== correctClubPassword) {
                return res.status(400).render("updateMembership", {
                    errors: ["Incorrect club password"],
                });
            }

            // Get the user's email from the session
            if (!req.user) {
                return res.status(401).redirect("/login");
            }

            const userId = req.user.id;
            await db.updateUserMembership(userId);
            res.redirect("/");
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
];

module.exports = {
    getUpdateMembership,
    updateMembership,
};
