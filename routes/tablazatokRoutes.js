const express = require('express');
const { getTablazatok } = require('../controllers/tablazatokRoutesController');
const router = express.Router();

router.get('/', getTablazatok);

module.exports = router;
