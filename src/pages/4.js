import React, { useState, useEffect } from "react";
import "../App.css";

const initialRecommendations = [
  "세계 일주 여행",
  "Dream car 구매",
  "내 집 마련",
  "부동산 투자",
  "자기개발과 학습",
  "사회적 기여 및 봉사",
  "취미 및 여가 생활",
  "창업",
  "퇴사",
];

function App() {
  const [bucketList, setBucketList] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goal, setGoal] = useState("");
  const [price, setPrice] = useState("");
  const [installments, setInstallments] = useState("");

  useEffect(() => {
    const totalMonthlyAmount = bucketList.reduce((total, item) => {
      if (item.price && item.installments) {
        return total + parseFloat(item.price) / parseInt(item.installments);
      }
      return total;
    }, 0);
    setMonthlySavings(new Intl.NumberFormat('ko-KR', { style: 'decimal' }).format(totalMonthlyAmount) + ' 원');
  }, [bucketList]);

  // 모달 열기
  const handlePlusButtonClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
    setGoal("");
    setPrice("");
    setInstallments("");
  };

  // 입력값 저장 및 계산
  const handleModalConfirm = () => {
    if (goal.trim() && price && installments) {
      const monthlyAmount = (parseFloat(price) / parseInt(installments)).toFixed(2);
      setBucketList([...bucketList, { goal, price, installments }]); // 목표를 버킷리스트에 추가
      setIsModalOpen(false);
      setGoal("");
      setPrice("");
      setInstallments("");
    }
  };

  // 추천 목록에서 목표 추가
  const handleRecommendationClick = (item) => {
    setGoal(item);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
     
      <h2>버킷리스트</h2>

      {/* 이번달 모아야 할 금액 Section */}
      <div className="monthly-savings">
        <h4>이번달 모아야 할 금액</h4>
        <input
          type="text"
          placeholder="금액"
          value={monthlySavings}
          readOnly
        />
      </div>

      {/* 추천 목록 Section */}
      <div className="recommendation-list">
        <h4>추천 목록</h4>
        <ul>
          {initialRecommendations.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
              <button onClick={() => handleRecommendationClick(item)}>+</button>
            </li>
          ))}
        </ul>
      </div>

      {/* 나의 버킷리스트 Section */}
      <div className="my-list">
        <h4>나의 버킷리스트</h4>
        <ul>
          {bucketList.map((item, index) => (
            <li key={index}>
              <span>{item.goal}</span>
              <button onClick={() => setBucketList(bucketList.filter((_, i) => i !== index))}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* + 버튼 */}
      <button className="plus-button" onClick={handlePlusButtonClick}>
        +
      </button>

      {/* 모달 창 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>목표 설정</h3>
            <div className="modal-inputs">
              <label>
                목표:
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="목표를 입력하세요"
                />
                <br/>
              </label>
              <label>
                가격:
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="가격을 입력하세요"
                />
                <br/>
              </label>
              <label>
                할부 개월:
                <input
                  type="number"
                  value={installments}
                  onChange={(e) => setInstallments(e.target.value)}
                  placeholder="할부 개월 수 입력"
                />
              </label>
            </div>
            <div className="modal-buttons">
              <button onClick={handleModalConfirm}>확인</button>
              <button onClick={handleModalClose}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
