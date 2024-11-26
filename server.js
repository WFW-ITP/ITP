// server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 파일에 데이터를 저장
const DATA_FILE = "transactions.json";

// 고유 ID 생성 라이브러리
const { v4: uuidv4 } = require("uuid");

// 데이터를 읽는 함수
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

// 데이터를 저장하는 함수
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// API 엔드포인트

// 1. 거래 내역 가져오기
app.get("/transactions", (req, res) => {
  const { year, month } = req.query; // year와 month를 쿼리로 받음
  const transactions = readData();

  if (year && month) {
    const filteredTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getFullYear() === parseInt(year, 10) &&
        transactionDate.getMonth() + 1 === parseInt(month, 10)
      );
    });

    return res.json(filteredTransactions);
  }

  res.json(transactions); // year와 month가 없으면 전체 데이터 반환
});

// POST /transactions: 거래 추가
app.post("/transactions", (req, res) => {
  const { date, item, amount, type } = req.body;

  if (!date || !item || !amount || !type) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  const transactions = readData();
  const newTransaction = { id: uuidv4(), date, item, amount, type }; // 고유 ID 추가
  transactions.push(newTransaction);
  writeData(transactions);

  res.status(201).json(newTransaction);
});

// DELETE /transactions/:id: 고유 ID로 거래 삭제
app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const transactions = readData();
  const index = transactions.findIndex((t) => t.id === id); // 고유 ID로 항목 찾기

  if (index === -1) {
    return res.status(404).json({ message: "거래를 찾을 수 없습니다." });
  }

  transactions.splice(index, 1); // 데이터 삭제
  writeData(transactions);

  res.status(200).json({ message: "거래가 삭제되었습니다." });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
