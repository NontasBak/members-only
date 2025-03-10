const { body, validationResult } = require("express-validator");

async function getNewMessage(req, res) {
    res.render("newMessage");
}

const validateNewMessageForm = [
    body("title")
        .notEmpty()
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Title must be between 1 and 255 characters"),

    body("text").notEmpty().trim(),
];

const createMessage = [
    validateNewMessageForm,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .render("newMessage", { errors: errors.array() });
        }

        try {
            const { title, text } = req.body;
            const userId = req.user.id;
            await db.createNewMessage(title, text, userId);
            res.redirect("/");
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
];

module.exports = {
    getNewMessage,
    createMessage,
};
