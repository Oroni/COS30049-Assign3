import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const FarePredictionPage = () => {
    const location = useLocation();
    const [fare, setFare] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state && location.state.fare !== undefined) {
            setFare(location.state.fare);
        } else {
            setError('Prediction data is missing.');
        }
    }, [location.state]);

    return (
        <div>
            <h1>Flight Fare Prediction Result</h1>
            {fare !== null ? (
                <div>
                    <h2>Predicted Fare: {fare.toFixed(2)} AUD</h2>
                    <p><strong>Departing Port:</strong> {location.state.departingPort}</p>
                    <p><strong>Arriving Port:</strong> {location.state.arrivingPort}</p>
                    <p><strong>Airline:</strong> {location.state.airline}</p>
                    <p><strong>Month:</strong> {new Date(0, location.state.month - 1).toLocaleString('en', { month: 'long' })}</p>
                    <p><strong>Year:</strong> {location.state.year}</p>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Loading prediction...</p>
            )}
        </div>
    );
};

export default FarePredictionPage;
