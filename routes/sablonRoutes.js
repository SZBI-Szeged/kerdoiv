const express = require('express');
const { getSablon } = require('../controllers/sablonRoutesController');
const router = express.Router();

router.get('/', getSablon);

module.exports = router;
