const express = require('express');
const { getDailyWeatherSummary, getAlerts, updateAlertThresholds, getHistoricalData } = require('../controllers/weatherController');

const router = express.Router();

router.get('/summary', getDailyWeatherSummary);
router.get('/alerts', getAlerts);
router.post('/thresholds', updateAlertThresholds);
router.get('/historical', getHistoricalData);

module.exports = router;