import React, { useState } from 'react';
import './SC.css';

export default function SavingsCalculator() {
  const [lifespan, setLifespan] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);

  const handleResultClick = () => {
    const years = parseInt(lifespan);
    const monthly = parseInt(monthlySavings);
    if (!isNaN(years) && !isNaN(monthly)) {
      setTotalAmount(years * 12 * monthly);
    } else {
      setTotalAmount(null);
    }
  };

  return (
    <div className="container">
      <button className="backButton">←</button>
      <h1 className="title">앞으로 운용할 수 있는 돈</h1>
      
      <div className="inputGroup">
        <label>기대 수명 입력▼</label>
        <input 
          type="number"
          placeholder="년 수 입력"
          value={lifespan}
          onChange={(e) => setLifespan(e.target.value)}
          className="inputField"
        />
      </div>

      <div className="inputGroup">
        <label>한달 저축 예정 금액▼</label>
        <input 
          type="number"
          placeholder="금액 입력"
          value={monthlySavings}
          onChange={(e) => setMonthlySavings(e.target.value)}
          className="inputField"
        />
      </div>

      <button className="resultButton" onClick={handleResultClick}>RESULT</button>

      {totalAmount !== null && (
        <div className="output">
          앞으로 운용할 수 있는 금액은
          <div className="totalAmount">{totalAmount.toLocaleString()} 원입니다.</div>
        </div>
      )}
    </div>
  );
}
