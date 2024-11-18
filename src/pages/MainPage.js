import React, { useState } from "react";
import Calendar from "../components/Calendar";
import TransactionPopup from "../pages/TransactionPopup";
import "./MainPage.css";

function MainPage() {
  const [transactions, setTransactions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="main-page">
      <div className="calendar-container">
        <Calendar transactions={transactions} />
        <button className="add-button" onClick={() => setShowPopup(true)}>
          +
        </button>
      </div>
      {showPopup && (
        <TransactionPopup
          onClose={() => setShowPopup(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}
      <div className="transaction-list">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`transaction-item ${transaction.type}`}
          >
            {transaction.date} - {transaction.description} - ₩{transaction.amount}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
