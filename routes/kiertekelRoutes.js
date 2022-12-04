const express = require('express');
const { postKiertekel } = require('../controllers/kiertekelRoutesController');
const router = express.Router();

router.post('/', postKiertekel);

module.exports = router;
