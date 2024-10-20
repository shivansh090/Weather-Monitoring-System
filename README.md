# Weather Monitoring Application

## Overview

This application is a Real-Time Data Processing System for Weather Monitoring with Rollups and Aggregates. It utilizes data from the OpenWeatherMap API to provide real-time weather information, daily summaries, and alerts for multiple cities in India.

## Features

- Real-time weather data retrieval for major Indian cities
- Daily weather summaries with rollups and aggregates
- Configurable alerting system for temperature and weather conditions
- Historical weather data visualization
- Responsive web interface for easy monitoring

## Tech Stack

- Backend: Node.js with Express.js
- Frontend: React.js with Tailwind CSS
- Database: MongoDB
- API: OpenWeatherMap

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)
- Docker (optional, for containerization)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-monitoring.git
   cd weather-monitoring
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/weather_monitoring
   OPENWEATHERMAP_API_KEY=your_api_key_here
   PORT=5000
   ```
   Replace `your_api_key_here` with your actual OpenWeatherMap API key.

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Docker Setup (Optional)

To run the application using Docker:

1. Build the Docker images:
   ```
   docker-compose build
   ```

2. Start the containers:
   ```
   docker-compose up
   ```

The application will be available at `http://localhost:3000`.

## Design Choices

1. **MERN Stack**: We chose the MERN (MongoDB, Express.js, React, Node.js) stack for its flexibility, performance, and strong ecosystem support.

2. **Real-time Data Processing**: The backend fetches weather data at regular intervals (configurable, default 5 minutes) to provide near real-time updates without overwhelming the OpenWeatherMap API.

3. **Rollups and Aggregates**: Daily summaries are calculated and stored, including average, maximum, and minimum temperatures, as well as the dominant weather condition. This allows for efficient historical data analysis.

4. **Alerting System**: A configurable alerting system is implemented to notify users of extreme weather conditions or specific weather events.

5. **Responsive UI**: The frontend is built with React and Tailwind CSS, ensuring a responsive and user-friendly interface across various devices.

6. **Historical Data Visualization**: A separate component is dedicated to visualizing historical weather trends, allowing users to analyze patterns over time.

7. **Modular Architecture**: The application is structured with clear separation of concerns, making it easy to maintain and extend.

## Dependencies

### Backend Dependencies

- express: Web application framework
- mongoose: MongoDB object modeling tool
- axios: Promise-based HTTP client
- cors: Cross-Origin Resource Sharing middleware
- dotenv: Environment variable management

### Frontend Dependencies

- react: UI library
- react-router-dom: Routing for React applications
- axios: Promise-based HTTP client
- chart.js and react-chartjs-2: Charting library for data visualization
- tailwindcss: Utility-first CSS framework
- @tailwindcss/forms: Form styles for Tailwind CSS
- lucide-react: Icon library


## Future Improvements

- Implement user authentication and authorization
- Add support for more cities and countries
- Integrate more advanced weather prediction models
- Implement push notifications for alerts
- Add support for additional weather parameters (e.g., humidity, wind speed)


This README provides a comprehensive guide for setting up and running your Weather Monitoring application. It includes:

1. An overview of the application
2. Features list
3. Tech stack details
4. Installation instructions
5. Running instructions (both with and without Docker)
6. Design choices explanation
7. Detailed list of dependencies
8. Future improvement suggestions
