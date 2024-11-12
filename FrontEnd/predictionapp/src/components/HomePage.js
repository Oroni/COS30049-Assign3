import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/HomePage.css'; // Import the CSS file for styling

function HomePage() {

  const history = useNavigate();

  const handleClick = () => {
    history.push({
      pathname: '/map',
      state: {
        departing_port: '',
        arriving_port: '',
        airline: '',
        month: '',
        year: '',
      },
    });
  };


  return (
    <div className="home-container">
      <h2>Welcome to X-Airlines</h2>
      <h3>Your Flight Predictor</h3>
      <p>We make the travel experience smarter by predicting flight fares and delays.</p>

      <div className="nav-buttons">
        <Link to="/flights-fare" className="nav-button fare-button">
          Predict Flight Fare
        </Link>
        <Link to="/flights-delay" className="nav-button delay-button">
          Predict Flight Delay
        </Link>
        <Link to="/find-airline" className="nav-button airline-button">
          Predict Airline with Lowest Fare
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
