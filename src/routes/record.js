const express = require('express');
const router = express.Router();

const { createRecord } = require('../controllers/recordServiceController');
const { getRecord } = require('../controllers/getRecordController');
const { protect } = require('../middleware/jwtAuth');

router.post('/createRecord', protect, createRecord);
router.get('/getRecord/:userId/:date', getRecord);

module.exports = router;