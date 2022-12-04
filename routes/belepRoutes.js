const express = require('express');
const { postBelep, getBelep } = require('../controllers/belepRoutesController');
const router = express.Router();

router.get('/', getBelep);
router.post('/', postBelep);

module.exports = router;
