// src/components/BottomButtonBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BottomButtonBar.css';

const BottomButtonBar = () => {
  const navigate = useNavigate();

  const handleButtonClick = (number) => {
    switch (number) {
      case 1:
        navigate('/page1');
        break;
      case 2:
        navigate('/money-forecasting');
        break;
      case 3:
        navigate('/saving-calculator');
        break;
      case 4:
        navigate('/page4');
        break;
      case 5:
        navigate('/page5');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bottom-button-bar">
      {[1, 2, 3, 4, 5].map((number) => (
        <button key={number} className="bottom-button" onClick={() => handleButtonClick(number)}>
          Page {number}
        </button>
      ))}
    </div>
  );
};

export default BottomButtonBar;
