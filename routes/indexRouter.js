const { Router } = require("express");
const { getIndex } = require("../controllers/indexController");

const router = Router();

router.get("/", getIndex);

module.exports = router;
