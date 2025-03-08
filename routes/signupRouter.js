const { Router } = require('express');
const { getSignup, createUser } = require('../controllers/signupController');

const router = Router();

router.get('/', getSignup);
router.post('/', createUser);

module.exports = router;