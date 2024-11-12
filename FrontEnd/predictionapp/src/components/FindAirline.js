import React, { useState } from 'react';
import axios from 'axios';

// List of ports to choose from
const portOptions = [
    'Adelaide', 'Albury', 'Alice Springs', 'Armidale', 'Ayers Rock', 'Ballina',
    'Brisbane', 'Broome', 'Bundaberg', 'Cairns', 'Canberra', 'Coffs Harbour',
    'Darwin', 'Dubbo', 'Emerald', 'Geraldton', 'Gladstone', 'Gold Coast',
    'Hamilton Island', 'Hobart', 'Kalgoorlie', 'Karratha', 'Launceston', 'Mackay',
    'Melbourne', 'Mildura', 'Moranbah', 'Mount Isa', 'Newcastle', 'Newman',
    'Perth', 'Port Hedland', 'Port Lincoln', 'Port Macquarie', 'Proserpine',
    'Rockhampton', 'Sunshine Coast', 'Sydney', 'Tamworth', 'Townsville',
    'Wagga Wagga'
];

// Month options for January to December
const monthOptions = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
];

// Year options from 2010 to 2017
const yearOptions = [
    '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'
];

function FindAirline() {
    const [departingPort, setDepartingPort] = useState('');
    const [arrivingPort, setArrivingPort] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);  // State to hold the predicted results

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            departing_port: departingPort,
            arriving_port: arrivingPort,
            month: parseInt(month),
            year: parseInt(year),
        };

        console.log("Sending data to backend:", requestData);

        try {
            const response = await axios.post("http://127.0.0.1:8000/predict_airline", requestData);

            console.log("Response from backend:", response.data);

            // Check if we got the predicted airline and fare
            if (response.data.predicted_airline && response.data.predicted_fare !== undefined) {
                console.log("Predicted Airline:", response.data.predicted_airline);
                console.log("Predicted Fare:", response.data.predicted_fare);

                // Update the result state with the predicted airline and fare
                setResult({
                    predicted_airline: response.data.predicted_airline,
                    predicted_fare: response.data.predicted_fare,
                    departing_port: departingPort,
                    arriving_port: arrivingPort,
                    month: month,
                    year: year,
                });
            } else {
                setError('Prediction data is missing or malformed');
                setResult(null); // Clear any previous result
            }
        } catch (error) {
            console.error('Error fetching airline prediction:', error);
            setError('Failed to fetch prediction. Please try again.');
            setResult(null); // Clear any previous result
        }
    };

    return (
        <div>
            <h2>Find Airline with Lowest Fare</h2>
            <form onSubmit={handleSubmit}>
                {/* Departing Port Dropdown */}
                <select value={departingPort} onChange={(e) => setDepartingPort(e.target.value)} required>
                    <option value="">Select Departing Port</option>
                    {portOptions.map((port) => (
                        <option key={port} value={port}>{port}</option>
                    ))}
                </select>

                {/* Arriving Port Dropdown */}
                <select value={arrivingPort} onChange={(e) => setArrivingPort(e.target.value)} required>
                    <option value="">Select Arriving Port</option>
                    {portOptions.map((port) => (
                        <option key={port} value={port}>{port}</option>
                    ))}
                </select>

                {/* Month Dropdown */}
                <select value={month} onChange={(e) => setMonth(e.target.value)} required>
                    <option value="">Select Month</option>
                    {monthOptions.map((monthOption) => (
                        <option key={monthOption} value={monthOption}>{monthOption}</option>
                    ))}
                </select>

                {/* Year Dropdown */}
                <select value={year} onChange={(e) => setYear(e.target.value)} required>
                    <option value="">Select Year</option>
                    {yearOptions.map((yearOption) => (
                        <option key={yearOption} value={yearOption}>{yearOption}</option>
                    ))}
                </select>

                <button type="submit">Submit</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {/* Displaying the result */}
            {result && (
                <div>
                    <h3>Prediction Result</h3>
                    <p><strong>Departing Port:</strong> {result.departing_port}</p>
                    <p><strong>Arriving Port:</strong> {result.arriving_port}</p>
                    <p><strong>Month:</strong> {result.month}</p>
                    <p><strong>Year:</strong> {result.year}</p>
                    <p><strong>Predicted Airline:</strong> {result.predicted_airline}</p>
                    <p><strong>Predicted Fare:</strong> ${result.predicted_fare}</p>
                </div>
            )}
        </div>
    );
}

export default FindAirline;
