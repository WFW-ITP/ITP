import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "../App.css";

function App() {
  const [date, setDate] = useState(new Date()); // 현재 선택된 날짜
  const [transactions, setTransactions] = useState([]); // 거래 내역
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부
  const [item, setItem] = useState(""); // 품목
  const [amount, setAmount] = useState(""); // 금액

  // 특정 월의 거래 내역 가져오기
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

  // 페이지 로드 및 날짜 변경 시 거래 내역 업데이트
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
      date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식
      item,
      amount: parseInt(amount, 10),
      type,
    };

    axios
      .post("http://localhost:5000/transactions", newTransaction)
      .then((response) => {
        fetchTransactions(date.getFullYear(), date.getMonth() + 1); // 새로고침
        setShowPopup(false); // 팝업 닫기
        setItem("");
        setAmount("");
      })
      .catch((error) => {
        console.error("거래 추가 중 오류가 발생했습니다:", error);
      });
  };

  // 거래 삭제
  const handleDeleteTransaction = (id) => {
    console.log("Deleting transaction with id:", id); // 디버그용
    axios
      .delete(`http://localhost:5000/transactions/${id}`)
      .then(() => {
        fetchTransactions(date.getFullYear(), date.getMonth() + 1); // 새로고침
      })
      .catch((error) => {
        console.error("거래 삭제 중 오류가 발생했습니다:", error);
      });
  };
  
  // 현재 월 거래 데이터 필터링 및 정렬
  const currentMonthTransactions = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // 총 수입/지출 계산
  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="app">
      {/* 총계 정보 */}
      <div className="total-info">
        <div>총 수입: {totalIncome.toLocaleString()}원</div>
        <div>총 지출: {totalExpense.toLocaleString()}원</div>
        <div>총 합계: {totalBalance.toLocaleString()}원</div>
      </div>

      {/* 달력 및 거래 관리 UI */}
      <div className="container">
        <h1>가계부</h1>

        {/* 달력 */}
        <div onDoubleClick={() => setShowPopup(true)}>
          <Calendar
            onChange={setDate}
            value={date}
            clearIcon={null}
            calendarClassName="custom-calendar"
          />
        </div>

        {/* 팝업 */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={() => setShowPopup(false)}>
                &times;
              </button>
              <h3>거래 추가</h3>
              <label>
                날짜:{" "}
                <input
                  type="text"
                  readOnly
                  value={date ? date.toLocaleDateString() : ""}
                />
              </label>
              <label>
                품목:{" "}
                <input
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </label>
              <label>
                금액:{" "}
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
              <div className="transaction-type">
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
          {currentMonthTransactions.map((t) => (
  <div key={t.id} className={`transaction-item ${t.type}`}>
    {t.date} - {t.item} - {t.amount.toLocaleString()}원
    <button onClick={() => handleDeleteTransaction(t.id)}>삭제</button>
  </div>
))}
        </div>
      </div>
    </div>
  );
}

export default App;
