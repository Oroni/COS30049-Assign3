// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h2>Welcome to the X-Airlines</h2>
      <h3>Flight Predictor</h3>
      <nav>
        <Link to="/flights-fare">Flight Fare</Link>
        <br />
        <Link to="/flights-delay">Flight Delay</Link>
      </nav>
    </div>
  );
}

export default HomePage;
