import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Fare = () => {
    const [departingPort, setDepartingPort] = useState('');
    const [arrivingPort, setArrivingPort] = useState('');
    const [airline, setAirline] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Define requestData here
        const requestData = {
            departing_port: departingPort,
            arriving_port: arrivingPort,
            airline: airline,
            month: month,
            year: year,
        };

        // Log the request data to ensure it's correct
        console.log("Sending data to backend:", requestData);

        try {
            const response = await axios.post('http://127.0.0.1:8000/predict_fare', requestData);

            // Check if the response contains the expected data
            console.log("Response from backend:", response.data);

            if (response.data.predicted_fare !== undefined) {
                navigate('/fare-prediction', {
                    state: {
                        fare: response.data.predicted_fare,
                        //farePercentage: response.data.predicted_fare_percentage,
                        departingPort,
                        arrivingPort,
                        airline,
                        month,
                        year
                    }
                });
            } else {
                setError('Prediction data is missing');
            }
        } catch (error) {
            console.error('Error fetching fare prediction:', error);
            setError('Failed to fetch prediction. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields for departingPort, arrivingPort, airline, month, year */}
            <input type="text" value={departingPort} onChange={(e) => setDepartingPort(e.target.value)} placeholder="Departing Port" />
            <input type="text" value={arrivingPort} onChange={(e) => setArrivingPort(e.target.value)} placeholder="Arriving Port" />
            <input type="text" value={airline} onChange={(e) => setAirline(e.target.value)} placeholder="Airline" />
            <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
            
            <button type="submit">Submit</button>
            
            {error && <p>{error}</p>}
        </form>
    );
};

export default Fare;
