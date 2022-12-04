const express = require('express');
const { getKilep } = require('../controllers/kilepRoutesController');
const router = express.Router();

router.get('/', getKilep);

module.exports = router;
