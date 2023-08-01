import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const InvestmentBarGraph = ({uid}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stocks?uid=${uid}`);
        const stocksData = response.data;
        console.log('Fetched Data:', stocksData);

        // Process data to group and sum the total amount invested for each company
        const groupedData = stocksData.reduce((acc, current) => {
          const existingCompany = acc.find((entry) => entry.company === current.stock_name);
          if (existingCompany) {
            existingCompany['TOTAL INVESTMENT'] += current.unit_price * current.quantity;
          } else {
            acc.push({
              company: current.stock_name,
              'TOTAL INVESTMENT': current.unit_price * current.quantity,
            });
          }
          return acc;
        }, []);

        console.log('Processed Data:', groupedData);
        setData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Company-wise Total Investment</h1>
      {data.length > 0 ? (
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TOTAL INVESTMENT" fill="#8884d8" />
        </BarChart>
      ) : (
        <p>
          <span style={{ fontWeight: 'bold', color: 'red' }}>No Investment Done Here</span>
        </p>
      )}
    </div>
  );
};

export default InvestmentBarGraph;
