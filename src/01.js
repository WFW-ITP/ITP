import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
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

function App() {
  const [date, setDate] = useState(new Date()); // 현재 선택된 날짜
  const [transactions, setTransactions] = useState([]); // 거래 데이터
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부
  const [item, setItem] = useState(""); // 품목
  const [amount, setAmount] = useState(""); // 금액
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 선택된 월

  // 서버에서 거래 데이터를 가져오기
  const fetchTransactions = (year, month) => {
    axios
      .get(`http://localhost:5000/transactions?year=${year}&month=${month}`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        setTransactions([]);
      });
  };

  useEffect(() => {
    fetchTransactions(date.getFullYear(), date.getMonth() + 1);
  }, [date]);

  // 거래 추가
  const handleAddTransaction = (type) => {
    if (!item || !amount || !date) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    const newTransaction = {
      date: date.toLocaleDateString("ko-KR"),
      item,
      amount: parseInt(amount, 10),
      type,
    };

    axios
      .post("http://localhost:5000/transactions", newTransaction)
      .then(() => {
        fetchTransactions(date.getFullYear(), date.getMonth() + 1); // 새로고침
        setShowPopup(false);
        setItem("");
        setAmount("");
      })
      .catch((error) => {
        console.error("거래 추가 중 오류가 발생했습니다:", error);
      });
  };

  // 거래 삭제
  const handleDeleteTransaction = (id) => {
    axios
      .delete(`http://localhost:5000/transactions/${id}`)
      .then(() => {
        fetchTransactions(date.getFullYear(), date.getMonth() + 1);
      })
      .catch((error) => {
        console.error("거래 삭제 중 오류가 발생했습니다:", error);
      });
  };

  // 월별 데이터 계산
  const { monthlyData, monthlyIncome, monthlyBalance } = useMemo(() => {
    const monthlyData = Array(12).fill(0); // 지출
    const monthlyIncome = Array(12).fill(0); // 수입

    transactions.forEach((t) => {
      const transactionDate = new Date(t.date);
      const month = transactionDate.getMonth();
      if (t.type === "income") {
        monthlyIncome[month] += t.amount;
      } else if (t.type === "expense") {
        monthlyData[month] += t.amount;
      }
    });

    const monthlyBalance = monthlyIncome.map((income, i) => income - monthlyData[i]);

    return { monthlyData, monthlyIncome, monthlyBalance };
  }, [transactions]);

  // Bar 차트 데이터
  const chartData = {
    labels: ["지출", "수입"],
    datasets: [
      {
        label: `${selectedMonth + 1}월`,
        data: [monthlyData[selectedMonth], monthlyIncome[selectedMonth]],
        backgroundColor: [
          "rgba(220, 53, 69, 0.6)", // 지출에 대한 색상 (빨강)
          "rgba(49, 81, 53, 0.6)", // 수입에 대한 색상 (초록)
        ],
      },
    ],
  };

  // 월별 거래 내역 필터링 및 정렬
  const currentMonthTransactions = transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getFullYear() === date.getFullYear() &&
        transactionDate.getMonth() === date.getMonth()
      );
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜 기준 오름차순 정렬

  // 날짜 클릭 시 selectedMonth 업데이트
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate); // 선택된 날짜를 설정
    setSelectedMonth(selectedDate.getMonth()); // 선택된 날짜의 월을 설정
  };

  return (
    <>
      {/* 총계 정보 */}
      <div className="total-info">
        <div>총 수입: {monthlyIncome[selectedMonth].toLocaleString()}원</div>
        <div>총 지출: {monthlyData[selectedMonth].toLocaleString()}원</div>
        <div>총 잔액: {monthlyBalance[selectedMonth].toLocaleString()}원</div>
      </div>

      <div className="container">
        <h1>가계부</h1>
        {/* 달력 및 거래 추가 팝업 */}
        <div onDoubleClick={() => setShowPopup(true)}>
          <Calendar onChange={handleDateChange} value={date} /> {/* 수정된 부분 */}
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={() => setShowPopup(false)}>
                &times;
              </button>
              <h3>거래 추가</h3>
              <label>
                품목: <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
              </label>
              <label>
                금액: <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </label>
              <div>
                <button onClick={() => handleAddTransaction("income")}>입금</button>
                <button onClick={() => handleAddTransaction("expense")}>지출</button>
              </div>
            </div>
          </div>
        )}

        {/* 월별 거래 내역 */}
        <div>
          <h3>
            {date.getFullYear()}년 {date.getMonth() + 1}월 거래 내역
          </h3>
          {currentMonthTransactions.length > 0 ? (
            currentMonthTransactions.map((t) => (
              <div
                key={t.id} // 고유 id를 key로 사용
                className={`transaction-item ${t.type === "income" ? "income" : "expense"}`}
              >
                {t.date} - {t.item} - {t.amount.toLocaleString()}원
                <button onClick={() => handleDeleteTransaction(t.id)}>삭제</button>{" "}
                {/* 고유 id를 넘김 */}
              </div>
            ))
          ) : (
            <p>이번 달에 거래 내역이 없습니다.</p>
          )}
        </div>

        {/* 바 차트 */}
        <div className="chartContainer">
          <h2>월별 수입/지출 그래프</h2>
          <Bar data={chartData} />
        </div>
      </div>
    </>
  );
}

export default App;
