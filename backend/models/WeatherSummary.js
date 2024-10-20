const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
  date: String,
  city: String,
  avgTemperature: Number,
  maxTemperature: Number,
  minTemperature: Number,
  dominantCondition: String,
  conditionCounts: {
    type: Map,
    of: Number
  }
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);