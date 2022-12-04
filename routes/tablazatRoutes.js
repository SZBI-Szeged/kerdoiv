const express = require('express');
const { getTablazat } = require('../controllers/tablazatRoutesController');
const router = express.Router();

router.get('/', getTablazat);

module.exports = router;
