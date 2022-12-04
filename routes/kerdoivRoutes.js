const express = require('express');
const { getKerdoiv } = require('../controllers/kerdoivRoutesController');
const router = express.Router();

router.get('/', getKerdoiv);

module.exports = router;
