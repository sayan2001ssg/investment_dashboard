import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MutualFundsBarGraph = ({ uid }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mutualfunds?uid=${uid}`);
        const mutualFundsData = response.data;
        console.log('Fetched Mutual Funds Data:', mutualFundsData);

        // Process data to group and sum the total amount invested for each mutual fund
        const groupedData = mutualFundsData.reduce((acc, current) => {
          const existingFund = acc.find((entry) => entry.fund === current.MF_Scheme);
          if (existingFund) {
            existingFund['TOTAL INVESTMENT'] += current.Amount * current.Unit;
          } else {
            acc.push({
              fund: current.MF_Scheme,
              'TOTAL INVESTMENT': current.Amount * current.Unit,
            });
          }
          return acc;
        }, []);

        console.log('Processed Mutual Funds Data:', groupedData);
        setData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Mutual Funds-wise Total Investment</h1>
      {data.length > 0 ? (
        <BarChart width={400} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fund" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TOTAL INVESTMENT" fill="#82ca9d" />
        </BarChart>
      ) : (
        <p>
          <span style={{ fontWeight: 'bold', color: 'red' }}>No Investment Done Here</span>
        </p>
      )}
    </div>
  );
};

export default MutualFundsBarGraph;
