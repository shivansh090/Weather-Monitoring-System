import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Sun, Cloud, CloudRain, Snowflake, Info } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/weather/summary');
        console.log(response.data);
        setSummaries(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
      setLoading(false);
    };

    fetchSummaries();
    const interval = setInterval(fetchSummaries, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: summaries.map(s => s.date),
    datasets: [
      {
        label: 'Average Temperature',
        data: summaries.map(s => s.avgTemperature),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      },
      {
        label: 'Max Temperature',
        data: summaries.map(s => s.maxTemperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      },
      {
        label: 'Min Temperature',
        data: summaries.map(s => s.minTemperature),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature Trends',
      },
    },
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'Clouds':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'Rain':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'Snow':
        return <Snowflake className="w-8 h-8 text-blue-200" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Weather Dashboard</h1>
      <div className="bg-white max-h-[890px] shadow rounded-lg p-6">
        <Line options={chartOptions} data={chartData} />
      </div>
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
        <div className="flex">
          <div className="py-1"><Info className="h-6 w-6 text-blue-500 mr-4" /></div>
          <div>
            <p className="font-bold">Dominant Weather Condition</p>
            <p>The dominant weather condition is determined by the most frequently occurring condition throughout the day. This provides a general overview of the day's weather pattern.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaries.map(summary => (
          <div key={summary._id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{summary.city}</h2>
              {getWeatherIcon(summary.dominantCondition)}
            </div>
            <p className="text-gray-600">{summary.date}</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">Avg Temp: <span className="font-semibold">{summary.avgTemperature.toFixed(1)}°C</span></p>
              <p className="text-gray-700">Max Temp: <span className="font-semibold text-red-500">{summary.maxTemperature.toFixed(1)}°C</span></p>
              <p className="text-gray-700">Min Temp: <span className="font-semibold text-blue-500">{summary.minTemperature.toFixed(1)}°C</span></p>
              <p className="text-gray-700">Dominant Condition: <span className="font-semibold">{summary.dominantCondition}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}