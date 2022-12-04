const express = require('express');
const { postLetrehoz } = require('../controllers/letrehozRoutesController');
const router = express.Router();

router.post('/', postLetrehoz);

module.exports = router;
