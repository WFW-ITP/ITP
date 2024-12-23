import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Splash from './Splash';
import One from './01';
import Two from './02';
import Three from './03';
import Four from './04';
import axios from "axios";

function AppContent() {
  const location = useLocation();
  const isSplashPage = location.pathname === "/"; // Splash 페이지 확인
  const [transactions, setTransactions] = useState([]); // 거래 상태 관리
  const [showCategories, setShowCategories] = useState(false); // 카테고리 표시 상태


  useEffect(() => {
    axios
      .get("http://localhost:5000/transactions")
      .then((response) => {
        setTransactions(response.data);
        console.log("Transactions loaded:", response.data); // 데이터 로깅
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  

  // 거래 추가
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  // 거래 삭제
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((_, index) => index !== id);
    setTransactions(updatedTransactions);
  };
   
  // 카테고리 메뉴 토글
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="app-container" style={{ position: "relative", minHeight: "100vh" }}>
    {!isSplashPage && (
      <button className="menu" onClick={toggleCategories}>
        ☰
      </button>
    )}

    {showCategories && (
      <div className="category-menu">
        <h3>Categories</h3>
        <ul className="category-list">
          <li onClick={() => setShowCategories(false)}>
            <Link to="/one">가계부</Link>
          </li>
          <li onClick={() => setShowCategories(false)}>
            <Link to="/two">운용 가능한 돈</Link>
          </li>
          <li onClick={() => setShowCategories(false)}>
            <Link to="/three">버킷리스트</Link>
          </li>
          <li onClick={() => setShowCategories(false)}>
            <Link to="/four">금융 공부</Link>
          </li>
        </ul>
      </div>
      )}

      {/* 페이지 라우팅 */}
      <Routes>
        <Route path="/" element={<Splash />} /> {/* 첫 화면 */}
        <Route
          path="/one"
          element={
            <One
              transactions={transactions}
              addTransaction={addTransaction}
              deleteTransaction={deleteTransaction}
            />
          }
        />
        
        <Route path="/two" element={<Two />} />
        <Route path="/three" element={<Three />} />
        <Route path="/four" element={<Four />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;