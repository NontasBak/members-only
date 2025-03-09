const { Router } = require('express');
const { getUpdateMembership, updateMembership } = require('../controllers/updateMembershipController');

const router = Router();

router.get('/', getUpdateMembership);
router.post('/', updateMembership);

module.exports = router;