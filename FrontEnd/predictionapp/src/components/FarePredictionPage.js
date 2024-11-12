import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Plot from 'react-plotly.js';

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

    
    console.log(location.state);


    let plotX = location.state?.chart?.x || [];
    let plotY = location.state?.chart?.y || [];

    console.log(plotX);
    console.log(plotY);

    return (
        <div>
            <h1>Flight Fare Prediction Result</h1>
            {fare !== null ? (
                <div>
                    <h2>Predicted Fare: {fare.toFixed(2)} AUD</h2>
                    <p><strong>Departing Port:</strong> {location.state.departing_port}</p>
                    <p><strong>Arriving Port:</strong> {location.state.arriving_port}</p>
                    <p><strong>Airline:</strong> {location.state.airline}</p>
                    <p><strong>Month:</strong> {new Date(0, location.state.month - 1).toLocaleString('en', { month: 'long' })}</p>
                    <p><strong>Year:</strong> {location.state.year}</p>
                    <Plot data={[
                            {
                                type: 'Bar',
                                x: plotX,
                                y: plotY,
                                marker: { color: 'rgba(75, 192, 192, 0.6)' }, 
                            },
                        ]}
                        layout={{
                            title: 'Flight Delay Chart',
                            xaxis: {
                                title: 'Month/Day',
                            },
                            yaxis: {
                                title: 'Fare (AUD)',
                                rangemode: 'tozero', // Ensures the Y-axis starts at 0
                            },
                        }} />


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
