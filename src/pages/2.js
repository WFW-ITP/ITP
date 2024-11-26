import React, { useState,useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App({ transactions }) {
  // 드로우바에서 선택된 월
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 드로우바에서 선택된 월 (0~11)
  // 월별 데이터 처리
  const {
    monthlyData,
    monthlyIncome,
    monthlyBalance,
  } = useMemo(() => {
    const monthlyData = Array(12).fill(0); // 지출
    const monthlyIncome = Array(12).fill(0); // 수입

    //월별 수입/지출 집계
    transactions.forEach((t) => {
      const transactionDate = new Date(t.date);
      const month = transactionDate.getMonth(); 
      if (t.type === "income") {
        monthlyIncome[month] += t.amount;
      } else if (t.type === "expense") {
        monthlyData[month] += t.amount;
      }
    });

    // Calculate monthly balances
    const monthlyBalance = monthlyIncome.map((income, i) => income - monthlyData[i]);

    return {
      monthlyData,
      monthlyIncome,
      monthlyBalance,
    };
  }, [transactions]);

  // Bar chart data
  const chartData = {
    labels: ["지출", "수입"],
    datasets: [
      {
        label: `${selectedMonth + 1}월`,
        data: [monthlyData[selectedMonth], monthlyIncome[selectedMonth]],
        backgroundColor: [
          monthlyBalance[selectedMonth] < 0 ? "rgba(255, 99, 132, 0.6)" : "rgba(54, 162, 235, 0.6)", // 적자: 빨간색, 흑자: 파란색
          "rgba(54, 162, 235, 0.6)", // 수입은 항상 파란색
        ],
      },
    ],
  };

  return (
    <div className="container">
      <h2>월별 수입/지출 그래프</h2>

      {/* 드로우바 */}
      <div className="dropdown">
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {i + 1}월
          </option>
        ))}
      </select>
      </div>

      <div className="chartContainer">
      {/* 그래프 */}
      <Bar data={chartData} />
      </div> 

      {/* 선택된 월 통계 */}

      <div className="balanceBox">
        <h3>{selectedMonth + 1}월 통계</h3>
        <p>지출: {monthlyData[selectedMonth].toLocaleString()}원</p>
        <p>수입: {monthlyIncome[selectedMonth].toLocaleString()}원</p>
        <p
          style={{
            color: monthlyBalance[selectedMonth] < 0 ? "red" : "blue",
          }}
        >
          잔액: {monthlyBalance[selectedMonth].toLocaleString()}원
        </p>
      </div>
    </div>
  );
}

export default App;
