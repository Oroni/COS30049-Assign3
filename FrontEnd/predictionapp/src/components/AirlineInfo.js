import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Map from './Map';

// List of ports with duplicates removed
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

// Updated list of airlines
const airlineOptions = [
    'Jetstar', 'Qantas', 'QantasLink', 'Regional Express', 'Skywest', 'Tigerair Australia',
    'Virgin Australia', 'Virgin Australia - ATR/F100 Operations', 'Virgin Australia Regional Airlines'
];

// Month options for January to December
const monthOptions = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
];

// Year options from 2010 to 2017
const yearOptions = [
    '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'
];

function AirlineInfo({type}) {
    console.log(type);
    if (type != "fare" && type != "delay" && type != "airline"){
        throw Error("Type must be fare or delay or airline");
    }

    const [departing_port, setDepartingPort] = useState('');
    const [arriving_port, setArrivingPort] = useState('');
    const [airline, setAirline] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();


    function AirlineSelector({type}){
        console.log("test");
        if (type == 'airline'){
            return null;
        } else {
            return <select value={airline} onChange={(e) => setAirline(e.target.value)} required>
                <option value="">Select Airline</option>
                {airlineOptions.map((airlineOption) => (
                    <option key={airlineOption} value={airlineOption}>{airlineOption}</option>
                ))}
            </select>;
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const requestData = {
            departing_port: departing_port,
            arriving_port: arriving_port,
            airline: (type != 'airline') ? airline : null, // Set airline to null if type == 'airline'
            month: parseInt(month),
            year: parseInt(year),
        };


        console.log("Sending data to backend:", requestData);

        try {
            const response = await axios.post(`http://127.0.0.1:8000/predict_${type}`, requestData);

            console.log("Response from backend:", response.data);
            
            if (type == 'fare'){
                if (response.data.predicted_fare !== undefined) {
                    navigate(`/${type}-prediction`, {
                        state: {
                            fare: response.data.predicted_fare,
                            departing_port,
                            arriving_port,
                            airline,
                            month,
                            year,
                            chart : response.data.chart
                        }
                    });
                } else {
                    setError('Prediction data is missing');
                }
            } else if (type == 'delay'){
                if (response.data.predicted_delay !== undefined) {
                    navigate('/delay-prediction', {
                        state: {
                            delay: response.data.predicted_delay,
                            delayPercentage: response.data.predicted_delay_percentage,
                            departing_port,
                            arriving_port,
                            airline,
                            month,
                            year,
                            chart : response.data.chart
                        }
                    });
                } else {
                    setError('Prediction data is missing');
                }
             
            }
            else if (type === 'airline') { 
                if (response.data.predicted_airline !== undefined) {
                    navigate('/map', {
                        state: {
                            predicted_airline: response.data.predicted_airline,
                            predicted_fare: response.data.predicted_fare,
                            departing_port,
                            arriving_port,
                            month,
                            year,
                            chart: response.data.chart
                        }
                    });
                } else {
                    setError('Prediction data is missing');
                }
            }
            
            
        } catch (error) {
            console.error('Error fetching fare prediction:', error);
            setError('Failed to fetch prediction. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Departing Port Dropdown */}
                <select value={departing_port} onChange={(e) => setDepartingPort(e.target.value)} required>
                    <option value="">Select Departing Port</option>
                    {portOptions.map((port) => (
                        <option key={port} value={port}>{port}</option>
                    ))}
                </select>

                {/* Arriving Port Dropdown */}
                <select value={arriving_port} onChange={(e) => setArrivingPort(e.target.value)} required>
                    <option value="">Select Arriving Port</option>
                    {portOptions.map((port) => (
                        <option key={port} value={port}>{port}</option>
                    ))}
                </select>
                
                {/* Airline Dropdown */}
                <AirlineSelector type={type}/>

                { /* Month Dropdown */}
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

                {error && <p>{error}</p>}
            </form>

            {/* Map displaying route between selected ports */}
            <Map departing_port={departing_port} arriving_port={arriving_port} />
        </div>
    );
}

export default AirlineInfo;