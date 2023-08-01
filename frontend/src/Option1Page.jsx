import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Option1Page.css';
import { useParams } from 'react-router-dom';

const Option1Page = () => {
  const { uid } = useParams();
  
  const initialFormData = {
    
    stock_name: '',
    unit_price: '',
    quantity: '',
    eq_price_date: '',
    tranc_date: '',
  };

  const [formData, setFormData] = useState(initialFormData);


  const handleSubmit = (event) => {
    event.preventDefault();
    const { stock_name, unit_price, quantity, eq_price_date, tranc_date } = formData;

    
    if (!stock_name || !unit_price || !quantity || !eq_price_date || !tranc_date) {
      toast.error('Please fill in all the input fields');
      window.alert('Please fill in all the input fields');
    } else {
      
      axios
        .post(`http://localhost:5000/api/post`, {
          uid,
          stock_name,
          unit_price,
          quantity,
          eq_price_date,
          tranc_date,
        })
        .then((response) => {
          if (response && response.data) {
            console.log('Data successfully submitted:', response.data);
            setFormData(initialFormData); // Clear form after successful submission
            toast.success('Data successfully submitted');
          } else {
            console.log('Response data is missing or undefined');
            toast.error('An error occurred while submitting the form');
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            console.log('Error response:', err.response.data);
            toast.error(err.response.data);
          } else {
            console.log('Error occurred:', err);
            toast.error('An error occurred while submitting the form');
          }
        });
    }
    console.log('Form data for Option 1:', formData);
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle form reset (clear all input fields)
  const handleClear = () => {
    setFormData(initialFormData);
  };

  return (
    <div className='BackGround'>
      <div className='wrapper'>
        <h2>STOCKS</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='stock_name' className='align'>
              STOCK
            </label>
            <select
              id='stock_name'
              name='stock_name'
              value={formData.stock_name}
              onChange={handleInputChange}
            >
              <option value=''>SELECT</option>
              <option value='ITC'>ITC</option>
              <option value='WIPRO'>WIPRO</option>
              <option value='TATA'>TATA</option>
              <option value='RELIANCE'>RELIANCE</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label htmlFor='unit_price'>PRICE</label>
            <input
              type='number'
              id='unit_price'
              name='unit_price'
              value={formData.unit_price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='quantity'>QUANTITY</label>
            <input
              type='number'
              id='quantity'
              name='quantity'
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='eq_price_date'>EQUITY PRICE DATE</label>
            <input
              type='date'
              id='eq_price_date'
              name='eq_price_date'
              value={formData.eq_price_date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='tranc_date'>TRANSACTION DATE</label>
            <input
              type='date'
              id='tranc_date'
              name='tranc_date'
              value={formData.tranc_date}
              onChange={handleInputChange}
            />
          </div>
          <div className='btn-container'>
            <button className='btn btn-save' type='submit'>
              SAVE
            </button>
            <button className='btn btn-save' type='button' onClick={handleClear}>
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Option1Page;
