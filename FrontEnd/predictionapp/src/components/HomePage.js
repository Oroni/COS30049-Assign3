// HomePage.js
//import React from 'react';
//import { Link } from 'react-router-dom';
//import './HomePage.css'

//function HomePage() {
 // return (
    //<div>
     // <h2>Welcome to the X-Airlines</h2>
      //<h3>Flight Predictor</h3>
      //<nav>
       // <Link to="/flights-fare">Flight Fare</Link>
       // <br />
      //  <Link to="/flights-delay">Flight Delay</Link>
     // </nav>
   // </div>
  //);
//}

//export default HomePage;


import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <h2 className="welcome-title">Welcome to X-Airlines</h2>
      <h3 className="subtitle">Your Flight Predictor</h3>

      <div className="description">
        <p>
          We make the travel experience smarter by predicting flight fares and delays. 
        </p>
      </div>

      <div className="nav-buttons">
        <Link to="/flights-fare" className="nav-button fare-button">
          Predict Flight Fare
        </Link>
        <Link to="/flights-delay" className="nav-button delay-button">
          Predict Flight Delay
        </Link>
      </div>
    </div>
  );
}

export default HomePage;

