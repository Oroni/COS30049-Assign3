import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Use Navigate here

import Register from './components/Register';
import Login from './components/LoginPage';
import HomePage from './components/HomePage';
import Delay from './components/FlightsDelayPage';
import Fare from './components/FlightsFarePage';
import DelayPredictionPage from './components/DelayPredictionPage';
import FarePredictionPage from './components/FarePredictionPage';
import About from './components/About';
import Contact from './components/Contact';
import Bargraph from './components/Bargraph';
import AirlineInfo from './components/AirlineInfo';
import Map from './components/Map';
import FindAirline from './components/FindAirline.js';
import Layout from './components/Layout'; 



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Declare state

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Conditional route logic: If not authenticated, redirect to Register */}
          <Route 
            path="/flights-delay" 
            element={isAuthenticated ? <Delay /> : <Navigate to="/register" />} 
          />
          <Route 
            path="/flights-fare" 
            element={isAuthenticated ? <Fare /> : <Navigate to="/register" />} 
          />

          <Route 
            path="/find-airline" 
            element={isAuthenticated ? <FindAirline /> : <Navigate to="/register" />} 
          />
          <Route path="/bargraph" element={<Bargraph/>} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/delay-prediction" element={<DelayPredictionPage />} />
          <Route path="/fare-prediction" element={<FarePredictionPage />} />
        

          <Route path="/map" element={<Map />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={
            <Login onLogin={() => setIsAuthenticated(true)} />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
