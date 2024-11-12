import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import AirlineInfo from './AirlineInfo';
import Plot from 'react-plotly.js';
import Map from './Map';


const DelayPredictionPage = () => {
    const location = useLocation();
    const [delay, setDelay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for location state and set delay or handle errors
    useEffect(() => {
        if (location.state) {
            if (location.state.delay !== undefined) {
                setDelay(location.state.delay);
            } else {
                setError('Prediction data is missing.');
            }
        } else {
            setError('No data passed to the page.');
        }
        setLoading(false);
    }, [location.state]);

    if (loading) return <p>Loading prediction...</p>;

    let plotX = location.state?.chart?.x || [];
    let plotY = location.state?.chart?.y || [];

    console.log(plotX);
    console.log(plotY);

    return (
        <div>
            <h1>Flight Delay Prediction Result</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2>Predicted Delay: {delay.toFixed(2)} minutes</h2>
                    <p><strong>Departing Port:</strong> {location.state?.departing_port}</p>
                    <p><strong>Arriving Port:</strong> {location.state?.arriving_port}</p>
                    <p><strong>Airline:</strong> {location.state?.airline}</p>
                    <p><strong>Month:</strong> {new Date(2024, location.state?.month - 1).toLocaleString('en', { month: 'long' })}</p>
                    <p><strong>Year:</strong> {location.state?.year}</p>


                    <Map/>


                    <Plot data={[
                            {
                                type: 'histogram',
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
                                title: 'Delay (Minutes)',
                                rangemode: 'tozero', // Ensures the Y-axis starts at 0
                            },
                        }} />
                </div>
            )}
        </div>
    );
};

export default DelayPredictionPage;
