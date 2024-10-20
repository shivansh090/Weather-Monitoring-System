const axios = require('axios');
const WeatherSummary = require('../models/WeatherSummary');
const Alert = require('../models/Alert');
const dotenv = require('dotenv');

const API_KEY = '93f60701d7eb35b2b3fe49aab386ead5';
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const FETCH_INTERVAL = 5* 60* 1000; // 5 minutes
dotenv.config();

let temperatureThreshold = 40;
let conditionThreshold = 'Rain';

exports.updateThresholds = (temperature, condition) => {
  temperatureThreshold = temperature;
  conditionThreshold = condition;
};

const fetchWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

const processWeatherData = (data) => {
  const { main, weather, dt } = data;
  return {
    city: data.name,
    temperature: main.temp - 273.15, // Convert Kelvin to Celsius
    feelsLike: main.feels_like - 273.15,
    condition: weather[0].main,
    timestamp: new Date(dt * 1000)
  };
};

const updateDailySummary = async (weatherData) => {
  const today = new Date().toISOString().split('T')[0];
  let summary = await WeatherSummary.findOne({ date: today, city: weatherData.city });
  
  if (!summary) {
    summary = new WeatherSummary({
      date: today,
      city: weatherData.city,
      avgTemperature: weatherData.temperature,
      maxTemperature: weatherData.temperature,
      minTemperature: weatherData.temperature,
      dominantCondition: weatherData.condition,
      conditionCounts: { [weatherData.condition]: 1 }
    });
  } else {
    // Initialize the conditionCounts if it doesn't exist
    summary.conditionCounts[weatherData.condition] = summary.conditionCounts[weatherData.condition] || 0;

    const count = summary.conditionCounts[weatherData.condition];
    
    // Safeguard to ensure avgTemperature is calculated correctly
    summary.avgTemperature = ((summary.avgTemperature * count) + weatherData.temperature) / (count + 1);
    
    summary.maxTemperature = Math.max(summary.maxTemperature, weatherData.temperature);
    summary.minTemperature = Math.min(summary.minTemperature, weatherData.temperature);
    summary.conditionCounts[weatherData.condition] += 1;

    // Update the dominant condition
    const dominantCondition = Object.keys(summary.conditionCounts).reduce((a, b) => 
      summary.conditionCounts[a] > summary.conditionCounts[b] ? a : b
    );
    summary.dominantCondition = dominantCondition;
  }

  await summary.save();
};


const checkAlerts = async (weatherData) => {
  const currentTime = new Date();
  const fiveMinutesAgo = new Date(currentTime.getTime() - FETCH_INTERVAL);

  if (weatherData.temperature > temperatureThreshold) {
    const existingAlert = await Alert.findOne({
      city: weatherData.city,
      message: `Temperature exceeds ${temperatureThreshold}°C`,
      timestamp: { $gte: fiveMinutesAgo }
    });

    if (!existingAlert) {
      const alert = new Alert({
        city: weatherData.city,
        message: `Temperature exceeds ${temperatureThreshold}°C`,
        timestamp: currentTime
      });
      await alert.save();
    }
  }

  if (weatherData.condition === conditionThreshold) {
    const existingAlert = await Alert.findOne({
      city: weatherData.city,
      message: `Weather condition is ${conditionThreshold}`,
      timestamp: { $gte: fiveMinutesAgo }
    });

    if (!existingAlert) {
      const alert = new Alert({
        city: weatherData.city,
        message: `Weather condition is ${conditionThreshold}`,
        timestamp: currentTime
      });
      await alert.save();
    }
  }
};

exports.startWeatherDataFetching = () => {
  
  setInterval(async () => {
    for (const city of CITIES) {
      try {       
      // console.log("Step0")
        const rawData = await fetchWeatherData(city);
        // console.log("Step1")
        const processedData = processWeatherData(rawData);
        // console.log("Step2");
        await updateDailySummary(processedData);
        // console.log("Step3");
        await checkAlerts(processedData);
        // console.log("Step4");
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
      }
    }
  }, FETCH_INTERVAL);
};