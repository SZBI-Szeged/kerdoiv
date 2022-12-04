const express = require('express');
const {
    postSablonFeltolt,
} = require('../controllers/sablonFeltoltRoutesControllers');
const router = express.Router();

router.post('/', postSablonFeltolt);

module.exports = router;
