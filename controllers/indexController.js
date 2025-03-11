const db = require("../db/queries");

async function getIndex(req, res) {
    const messages = await db.getAllMessages();
    console.log(messages);
    // console.log(req.user);
    res.render("index", { messages: messages});
}

module.exports = {
    getIndex,
};
