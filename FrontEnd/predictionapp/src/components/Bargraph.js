import React, { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import FindAirline from './FindAirline';

// Register components for Chart.js
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Bargraph = ({ chartData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        // Destroy previous chart instance if it exists
        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        // Create a new chart instance
        chartRef.current.chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category', // Correct x-axis type for labels
                    },
                    y: {
                        type: 'linear', // Correct y-axis type for numerical data
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                    },
                    tooltip: {
                        enabled: true,
                    }
                }
            }
        });

        // Clean up chart instance on component unmount
        return () => {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
        };
    }, [chartData]);

    return <canvas ref={chartRef}></canvas>;
};

export default Bargraph;
