import React, { useState } from 'react';
import axios from 'axios';

export default function Setting() {
  const [temperature, setTemperature] = useState(35);
  const [condition, setCondition] = useState('Rain');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/weather/thresholds', { temperature, condition });
      setMessage('Thresholds updated successfully');
    } catch (error) {
      setMessage('Error updating thresholds');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Alert Settings</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
              Temperature Threshold (°C)
            </label>
            <input
              type="number"
              id="temperature"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
              Weather Condition
            </label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="Rain">Rain</option>
              <option value="Snow">Snow</option>
              <option value="Clear">Clear</option>
              <option value="Clouds">Clouds</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Thresholds'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}