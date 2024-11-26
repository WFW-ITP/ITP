import React, { useState } from "react";

function One({ addTransaction }) {
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  const handleAddTransaction = () => {
    if (!date || !item || !amount || !type) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    // 서버로 전송할 데이터 구조
    const newTransaction = {
      date,
      item,
      amount: parseInt(amount, 10),
      type,
    };

    // 서버로 데이터 POST
    fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        addTransaction(data); // 부모 컴포넌트에 데이터 추가
      })
      .catch((error) => {
        console.error("거래 추가 중 오류 발생:", error);
      });

    // 입력 필드 초기화
    setDate("");
    setItem("");
    setAmount("");
    setType("");
  };

  return (
    <div>
      <h1>거래 입력</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="품목"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <input
        type="number"
        placeholder="금액"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">유형 선택</option>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
      <button onClick={handleAddTransaction}>추가</button>
    </div>
  );
}

export default One;
