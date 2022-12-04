const express = require('express');
const { getMain } = require('../controllers/mainRoutesController');
const router = express.Router();

router.get('/', getMain);

module.exports = router;
