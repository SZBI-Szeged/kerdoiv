const express = require('express');
const { getErtekel } = require('../controllers/ertekelesRoutesController');
const router = express.Router();

router.get('/', getErtekel);

module.exports = router;
