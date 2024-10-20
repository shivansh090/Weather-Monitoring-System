import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, AlertTriangle, Settings, Cloud, History } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import Setting from './components/Settings';
import HistoricalData from './components/HistoricalData';

export default function Component() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100 flex-col sm:flex-row">
        {/* Sidebar for mobile (horizontal) and desktop (vertical) */}
        <nav className="w-full sm:w-64 bg-white shadow-lg sm:flex-col sm:h-full flex-row flex items-center">
          <div className="p-4 flex items-center w-full justify-between sm:justify-start">
            {/* Cloud logo for mobile, Brand Name for larger screens */}
            <Cloud className='block sm:hidden' />
            <h1 className="hidden sm:block text-2xl font-bold text-gray-800">Weather Monitor</h1>
          </div>
          <ul className="flex sm:flex-col flex-row justify-around w-full mt-1 sm:mt-0">
            <NavItem to="/" icon={<Home />} text="Dashboard" />
            <NavItem to="/alerts" icon={<AlertTriangle />} text="Alerts" />
            <NavItem to="/settings" icon={<Settings />} text="Settings" />
            <NavItem to="/history" icon={<History />} text="History" />
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/history" element={<HistoricalData />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function NavItem({ to, icon, text }) {
  return (
    <li className="flex-grow sm:flex-grow-0">
      <Link to={to} className="flex items-center justify-center sm:justify-start px-4 py-2 text-gray-700 hover:bg-gray-200">
        {icon}
        <span className="ml-2 sm:block hidden">{text}</span>
      </Link>
    </li>
  );
}
