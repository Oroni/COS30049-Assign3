import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DelayPredictionPage = () => {
    const location = useLocation();
    const [delay, setDelay] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state && location.state.delay !== undefined) {
            setDelay(location.state.delay);
        } else {
            setError('Prediction data is missing.');
        }
    }, [location.state]);

    return (
        <div>
            <h1>Flight Delay Prediction Result</h1>
            {delay !== null ? (
                <div>
                    <h2>Predicted Delay: {delay.toFixed(2)} minutes</h2>
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

export default DelayPredictionPage;
