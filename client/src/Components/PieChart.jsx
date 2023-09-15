import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ labels, percentages }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="pie-chart-container">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieChart;
