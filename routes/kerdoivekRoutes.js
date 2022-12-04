const express = require('express');
const { getKerdoivek } = require('../controllers/kerdoivekRoutesController');
const router = express.Router();

router.get('/', getKerdoivek);

module.exports = router;
