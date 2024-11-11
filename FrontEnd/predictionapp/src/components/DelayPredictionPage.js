import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import AirlineInfo from './AirlineInfo';



const DelayPredictionPage = () => {
    const location = useLocation();
    const [delay, setDelay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for location state and set delay or handle errors
    useEffect(() => {
        if (location.state) {
            const { delay, departingPort, arrivingPort, airline, month, year } = location.state;

            if (delay !== undefined) {
                setDelay(delay);
            } else {
                setError('Prediction data is missing.');
            }
        } else {
            setError('No data passed to the page.');
        }
        setLoading(false);
    }, [location.state]);

    if (loading) return <p>Loading prediction...</p>;

    return (
        <div>
            <h1>Flight Delay Prediction Result</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2>Predicted Delay: {delay.toFixed(2)} minutes</h2>
                    <p><strong>Departing Port:</strong> {location.state?.departingPort}</p>
                    <p><strong>Arriving Port:</strong> {location.state?.arrivingPort}</p>
                    <p><strong>Airline:</strong> {location.state?.airline}</p>
                    <p><strong>Month:</strong> {new Date(2024, location.state?.month - 1).toLocaleString('en', { month: 'long' })}</p>
                    <p><strong>Year:</strong> {location.state?.year}</p>
                    
                </div>
            )}
        </div>
    );
};

export default DelayPredictionPage;
