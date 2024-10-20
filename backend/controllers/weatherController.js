const WeatherSummary = require('../models/WeatherSummary');
const Alert = require('../models/Alert');
const { updateThresholds } = require('../services/weatherService');

exports.getDailyWeatherSummary = async (req, res) => {
  try {
    const summaries = await WeatherSummary.find().sort({ date: -1 }).limit(7);
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather summaries' });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(10);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts' });
  }
};

exports.updateAlertThresholds = async (req, res) => {
  try {
    const { temperature, condition } = req.body;
    updateThresholds(temperature, condition);
    res.json({ message: 'Thresholds updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating thresholds' });
  }
};


exports.getHistoricalData = async (req, res) => {
  try {
    const { city, days } = req.query;
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const historicalData = await WeatherSummary.find({
      city: city,
      date: { $gte: startDate.toISOString().split('T')[0], $lte: endDate.toISOString().split('T')[0] }
    }).sort({ date: 1 });

    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching historical data' });
  }
};