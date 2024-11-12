import React, { useState } from 'react';
import axios from 'axios';
import Bargraph from './Bargraph';
import { Link, useNavigate } from 'react-router-dom';

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

const monthOptions = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const yearOptions = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];

function FindAirline() {
    const [departingPort, setDepartingPort] = useState('');
    const [arrivingPort, setArrivingPort] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null); // Initialize chartData as null

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            departing_port: departingPort,
            arriving_port: arrivingPort,
            month: parseInt(month),
            year: parseInt(year),
        };

        console.log("Sending data to backend:", requestData);

        const response = await axios.post("http://127.0.0.1:8000/predict_airline", requestData);

        console.log("Response from backend:", response.data);

        if (response.data.predicted_airline && response.data.predicted_fare !== undefined) {
            let airlines = Object.keys(response.data.airline_fares);
            let airlineFares = Object.values(response.data.airline_fares);

            
            const chartData = {
              labels: airlines,
              datasets: [{
                label: 'Predicted Fares',
                data: airlineFares,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]};

            setChartData(chartData); // Set the chart data
          };

          setResult({
              predicted_airline: response.data.predicted_airline,
              predicted_fare: response.data.predicted_fare,
              departing_port: departingPort,
              arriving_port: arrivingPort,
              month: month,
              year: year,
          });
    };

    return (
        <div>
            <h2>Find Airline with Lowest Fare</h2>
            <form onSubmit={handleSubmit}>
                <select value={departingPort} onChange={(e) => setDepartingPort(e.target.value)} required>
                    <option value="">Select Departing Port</option>
                    {portOptions.map((port) => (
                        <option key={port} value={port}>{port}</option>
                    ))}
                </select>

                <select value={arrivingPort} onChange={(e) => setArrivingPort(e.target.value)} required>
                    <option value="">Select Arriving Port</option>
                    {portOptions.map((port) => (
                        <option key={port} value={port}>{port}</option>
                    ))}
                </select>

                <select value={month} onChange={(e) => setMonth(e.target.value)} required>
                    <option value="">Select Month</option>
                    {monthOptions.map((monthOption) => (
                        <option key={monthOption} value={monthOption}>{monthOption}</option>
                    ))}
                </select>

                <select value={year} onChange={(e) => setYear(e.target.value)} required>
                    <option value="">Select Year</option>
                    {yearOptions.map((yearOption) => (
                        <option key={yearOption} value={yearOption}>{yearOption}</option>
                    ))}
                </select>

                <button type="submit">Submit</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {result && (
                <div>
                    <h3>Prediction Result</h3>
                    <p><strong>Departing Port:</strong> {result.departing_port}</p>
                    <p><strong>Arriving Port:</strong> {result.arriving_port}</p>
                    <p><strong>Month:</strong> {result.month}</p>
                    <p><strong>Year:</strong> {result.year}</p>
                    <p><strong>Predicted Airline:</strong> {result.predicted_airline}</p>
                    <p><strong>Predicted Fare:</strong> ${result.predicted_fare}</p>
                    {chartData && <Bargraph chartData={chartData} />}
                </div>
            )}
        </div>
    );
}

export default FindAirline;
