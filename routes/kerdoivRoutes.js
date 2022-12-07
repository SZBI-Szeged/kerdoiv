const express = require('express');
const {
    getKerdoiv,
    deleteKerdoiv,
    getModositKerdoiv,
} = require('../controllers/kerdoivRoutesController');
const router = express.Router();

router.get('/', getKerdoiv);
router.delete('/', deleteKerdoiv);
router.get('/modosit', getModositKerdoiv);

module.exports = router;
