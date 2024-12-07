const express = require('express');
const router = express.Router();

const { createRecord } = require('../controllers/createRecordController');
const { getRecord } = require('../controllers/getRecordController');
const { protect } = require('../middleware/jwtAuth');

router.post('/createRecord', protect, createRecord);
router.get('/getRecords/:userId', getRecord);

module.exports = router;