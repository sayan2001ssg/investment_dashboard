import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartPage = () => {
  // Dummy data for the pie chart
  const chartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [30, 20, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h2>Dummy Pie Chart</h2>
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default PieChartPage;
