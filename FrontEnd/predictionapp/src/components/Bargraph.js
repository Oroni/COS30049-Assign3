import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const Bargraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Predictions",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: [],
      },
    ],
  });

  useEffect(() => {
    const csvPath = "C:/Users/ASUS/OneDrive/Semester 3/Innovation Project/Assign 3/venv/predictions.csv";

    Papa.parse(csvPath, {
      download: true,
      header: true,
      complete: (results) => {
        const labels = [];
        const data = [];

        // Extract `departing_port` and `arriving_port` as labels, and `Predicted_Fare` as data
        results.data.forEach((row) => {
          const label = `${row.departing_port} to ${row.arriving_port}`;
          labels.push(label);
          data.push(parseFloat(row.Predicted_Fare));
        });

        setChartData({
          labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data,
            },
          ],
        });
      },
    });
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Bargraph;
