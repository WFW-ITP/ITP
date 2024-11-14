import React, { useState } from 'react';
import './MF.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function MoneyForecasting() {
  const [month, setMonth] = useState('N'); 

  // 예시 데이터
  const summaryData = {
    '1월': { 지출: 500000, 수입: 1000000 },
    '2월': { 지출: 600000, 수입: 1200000 },
    '3월': { 지출: 3000000, 수입: 50000},
    '4월': { 지출: 1502342, 수입: 1651521},
    '5월': { 지출: 653424, 수입: 175043400000 },
    '6월': { 지출: 43524, 수입: 24242 },
    '7월': { 지출: 2543455342, 수입: 245242452},
    '8월': { 지출: 7545425454, 수입: 5425244},
    '9월': { 지출: 54254542, 수입: 542452 },
    '10월': { 지출: 67545432, 수입: 54542 },
    '11월': { 지출: 56746, 수입: 654654},
    '12월': { 지출: 100000, 수입: 100000},
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const balance = month !== 'N' && summaryData[month] ? summaryData[month].수입 - summaryData[month].지출 : 0;
  const data = month !== 'N' && summaryData[month] ? [
    { name: '지출', 금액: summaryData[month].지출 },
    { name: '수입', 금액: summaryData[month].수입 },
  ] : [];

  return (
    <div className="container">
      <button className="backButton">←</button>
      <div className="dropdownContainer">
        <label className="dropdownLabel" htmlFor="month-select">생활비 예측</label>
        <select id="month-select" value={month} onChange={handleMonthChange} className="dropdown">
          <option value="N">월 선택</option>
          <option value="1월">1월</option>
          <option value="2월">2월</option>
          <option value="3월">3월</option>
          <option value="4월">4월</option>
          <option value="5월">5월</option>
          <option value="6월">6월</option>
          <option value="7월">7월</option>
          <option value="8월">8월</option>
          <option value="9월">9월</option>
          <option value="10월">10월</option>
          <option value="11월">11월</option>
          <option value="12월">12월</option>
        </select>
      </div>
      
      <div className="balanceBox">
        <h2>{month} 월 결산</h2>
        <div className="balanceAmount" style={{ color: balance < 0 ? 'red' : 'blue' }}>{balance.toLocaleString()}</div>
      </div>

      <div className="chartContainer">
        <h3>수입 & 지출</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barSize={50}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="금액" fill="#6A5ACD" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
