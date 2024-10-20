import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/weather/alerts');
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
      setLoading(false);
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Weather Alerts</h1>
      {alerts.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center text-gray-600">
          No active alerts at the moment.
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert._id} className="bg-white shadow rounded-lg p-6 flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{alert.city}</h2>
                <p className="text-gray-600">{alert.message}</p>
                <p className="text-sm text-gray-500 mt-2">{new Date(alert.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}