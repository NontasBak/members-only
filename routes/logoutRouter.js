const { Router } = require("express");
const { logout } = require("../controllers/logoutController");

const router = Router();

router.post("/", logout);

module.exports = router;
