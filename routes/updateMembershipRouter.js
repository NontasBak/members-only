const { Router } = require("express");
const {
    getUpdateMembership,
    updateMembership,
} = require("../controllers/updateMembershipController");
const { isAuthenticated } = require("../middleware/auth");

const router = Router();

router.get("/", isAuthenticated, getUpdateMembership);
router.post("/", updateMembership);

module.exports = router;
