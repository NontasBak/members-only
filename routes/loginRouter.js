const { Router } = require("express");
const { getLogin, login } = require("../controllers/loginController");
const passport = require("passport");

const router = Router();

router.get("/", getLogin);
router.post("/", login);

module.exports = router;
