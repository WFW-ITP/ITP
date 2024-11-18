import React, { useState } from "react";
import "./TransactionPopup.css";

function TransactionPopup({ onClose, onAddTransaction }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income"); // "income" or "expense"

  const handleSubmit = () => {
    if (!date || !amount || !description) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    const transaction = {
      date,
      amount: parseFloat(amount),
      description,
      type,
    };

    onAddTransaction(transaction);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>거래 추가</h3>
        <label>
          날짜:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          금액:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          용도:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <div className="transaction-type">
          <button
            className={type === "income" ? "active" : ""}
            onClick={() => setType("income")}
          >
            입금
          </button>
          <button
            className={type === "expense" ? "active" : ""}
            onClick={() => setType("expense")}
          >
            지출
          </button>
        </div>
        <button onClick={handleSubmit}>추가</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
}

export default TransactionPopup;
