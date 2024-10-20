import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function HistoricalData() {
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistoricalData();
  }, [selectedCity, days]);

  const fetchHistoricalData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/historical?city=${selectedCity}&days=${days}`);
      setHistoricalData(response.data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
    setLoading(false);
  };

  const chartData = {
    labels: historicalData.map(d => d.date),
    datasets: [
      {
        label: 'Average Temperature',
        data: historicalData.map(d => d.avgTemperature),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Max Temperature',
        data: historicalData.map(d => d.maxTemperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Min Temperature',
        data: historicalData.map(d => d.minTemperature),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Historical Weather Data for ${selectedCity}`,
      },
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Historical Weather Data</h2>
      <div className="flex space-x-4">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'].map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {[7, 14, 30].map(d => (
            <option key={d} value={d}>{d} days</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <Line options={chartOptions} data={chartData} />
        </div>
      )}
    </div>
  );
}