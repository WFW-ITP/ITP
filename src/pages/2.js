import React, { useMemo } from "react";
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
  // Memoize data processing to improve performance
  const {
    monthlyData,
    monthlyIncome,
    highestSpendingMonth,
    highestIncomeMonth,
    largestDeficitMonth,
    largestSurplusMonth,
  } = useMemo(() => {
    const monthlyData = Array(12).fill(0); // Expense
    const monthlyIncome = Array(12).fill(0); // Income

    // Aggregate monthly income and expenses
    transactions.forEach((t) => {
      const transactionDate = new Date(t.date);
      const month = transactionDate.getMonth(); // 0-based index
      if (t.type === "income") {
        monthlyIncome[month] += t.amount;
      } else if (t.type === "expense") {
        monthlyData[month] += t.amount;
      }
    });

    // Calculate monthly balances
    const monthlyBalance = monthlyIncome.map((income, i) => income - monthlyData[i]);

    // Find key months
    const highestSpendingMonth = monthlyData.indexOf(Math.max(...monthlyData));
    const highestIncomeMonth = monthlyIncome.indexOf(Math.max(...monthlyIncome));
    const largestDeficitMonth = monthlyBalance.indexOf(Math.min(...monthlyBalance));
    const largestSurplusMonth = monthlyBalance.indexOf(Math.max(...monthlyBalance));

    return {
      monthlyData,
      monthlyIncome,
      highestSpendingMonth,
      highestIncomeMonth,
      largestDeficitMonth,
      largestSurplusMonth,
    };
  }, [transactions]);

  // Bar chart data
  const data = {
    labels: [
      "1월", "2월", "3월", "4월", "5월", "6월",
      "7월", "8월", "9월", "10월", "11월", "12월",
    ],
    datasets: [
      {
        label: "지출",
        data: monthlyData,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
      },
      {
        label: "수입",
        data: monthlyIncome,
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
      },
    ],
  };

  return (
    <div className="container">
      <h2>월별 수입/지출 그래프</h2>
      <Bar data={data} />

      {/* Key Month Highlights */}
      <div className="key-months">
        <h3>주요 월 분석</h3>
        <ul>
          <li>
            <strong>소비가 가장 많은 달:</strong> {highestSpendingMonth + 1}월 (
            {monthlyData[highestSpendingMonth].toLocaleString()}원)
          </li>
          <li>
            <strong>수입이 가장 많은 달:</strong> {highestIncomeMonth + 1}월 (
            {monthlyIncome[highestIncomeMonth].toLocaleString()}원)
          </li>
          <li>
            <strong>적자가 가장 큰 달:</strong> {largestDeficitMonth + 1}월 (
            {(monthlyIncome[largestDeficitMonth] - monthlyData[largestDeficitMonth]).toLocaleString()}원)
          </li>
          <li>
            <strong>흑자가 가장 큰 달:</strong> {largestSurplusMonth + 1}월 (
            {(monthlyIncome[largestSurplusMonth] - monthlyData[largestSurplusMonth]).toLocaleString()}원)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
