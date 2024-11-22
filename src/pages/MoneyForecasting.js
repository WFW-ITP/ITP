import React, { useState } from 'react';
import '../styles/MoneyForecasting.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Chart.js에서 필요한 요소들을 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MoneyForecasting() {
  // 사용자가 선택한 월을 상태로 관리
  const [month, setMonth] = useState('N');

  // 예시 데이터 - 각 월별 지출 및 수입 데이터
  const summaryData = {
    '1월': { 지출: 500000, 수입: 1000000 },
    '2월': { 지출: 600000, 수입: 1200000 },
    '3월': { 지출: 3000000, 수입: 50000 },
    '4월': { 지출: 1502342, 수입: 1651521 },
    '5월': { 지출: 653424, 수입: 175043400000 },
    '6월': { 지출: 43524, 수입: 24242 },
    '7월': { 지출: 2543455342, 수입: 245242452 },
    '8월': { 지출: 7545425454, 수입: 5425244 },
    '9월': { 지출: 54254542, 수입: 542452 },
    '10월': { 지출: 67545432, 수입: 54542 },
    '11월': { 지출: 56746, 수입: 654654 },
    '12월': { 지출: 100000, 수입: 100000 },
  };

  // 사용자가 선택한 월을 설정하는 함수
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // 사용자가 선택한 월의 수입과 지출에 대한 데이터를 기반으로 잔액 계산
  const balance = month !== 'N' && summaryData[month] ? summaryData[month].수입 - summaryData[month].지출 : 0;

  // 사용자가 선택한 월의 수입과 지출 데이터를 Chart.js에 사용할 형식으로 변환
  const data = {
    labels: ['지출', '수입'],
    datasets: [
      {
        label: `${month} 수입과 지출`,
        data: month !== 'N' && summaryData[month] ? [summaryData[month].지출, summaryData[month].수입] : [],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="container">
      {/* 뒤로 가기 버튼 */}
      <button className="backButton">←</button>
      {/* 페이지 제목 */}
      <h1 className="title">생활비 예측</h1>

      {/* 월 선택 드롭다운 */}
      <div className="dropdownContainer">
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
      
      {/* 잔액 계산 결과 표시 */}
      <div className="balanceBox">
        <h2>{month} 월 결산</h2>
        <div className="balanceAmount" style={{ color: balance < 0 ? 'red' : 'blue' }}>{balance.toLocaleString()}</div>
      </div>

      {/* 수입 및 지출을 시각화한 차트 */}
      <div className="chartContainer">
        <h3>수입 & 지출</h3>
        {/* Chart.js의 Bar 컴포넌트를 사용하여 선택된 월의 수입과 지출을 시각화 */}
        <Bar data={data} options={{
          responsive: true,
          plugins: {
            legend: {
              display: true, // 범례 표시 여부
              position: 'top', // 범례 위치
            },
            tooltip: {
              callbacks: {
                // 툴팁에 표시되는 레이블을 사용자 정의
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} 원`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true, // y축이 0에서 시작하도록 설정
            },
          },
        }} />
      </div>
    </div>
  );
}

/* 상세 설명 주석 */
// 1. Chart.js와 react-chartjs-2 라이브러리를 사용하여 수입 및 지출 데이터를 시각화합니다.
// 2. Bar 컴포넌트를 사용해 막대 그래프를 생성하며, 데이터는 사용자가 선택한 월의 수입과 지출을 반영합니다.
// 3. 사용자가 선택한 월이 없을 경우, 빈 데이터로 그래프를 표시합니다.
// 4. 옵션에서는 범례(legend)와 툴팁(tooltip)을 설정해 사용자에게 친숙한 데이터를 제공하도록 합니다.
// 5. 'balance' 변수는 선택된 월의 수입과 지출 차이를 계산하여 양수면 파란색, 음수면 빨간색으로 표시합니다.
// 6. 드롭다운을 통해 사용자가 원하는 월을 선택하고 그에 따른 데이터를 시각화합니다.
