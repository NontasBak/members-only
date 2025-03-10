const { Router } = require("express");
const { getNewMessage, createMessage } = require("../controllers/newMessageController");

const router = Router();

router.get("/", getNewMessage);
router.post("/", createMessage);

module.exports = router;