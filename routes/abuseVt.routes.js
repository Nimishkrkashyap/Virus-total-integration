const express = require('express');
const router = express.Router();

const { sendStoredData, sendDataToClient, fetchAbuseVtDataAndSend } = require('../controllers/abuseVt.controller');

router.route('/get-data').get(sendStoredData);
router.route('/send-data').get(sendDataToClient);
router.route('/fetch-and-send').get(fetchAbuseVtDataAndSend);

module.exports = router;