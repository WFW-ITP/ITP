import React, { useState } from 'react';

function App() {
  // 사용자 입력값: 기대 수명 (년 단위)
  const [lifespan, setLifespan] = useState('');
  // 사용자 입력값: 월 저축 금액
  const [monthlySavings, setMonthlySavings] = useState('');
  // 계산된 총 금액
  const [totalAmount, setTotalAmount] = useState(null);

  // 결과 버튼 클릭 시 총 금액 계산 함수
  const handleResultClick = () => {
    const years = parseInt(lifespan); // 기대 수명을 정수로 변환
    const monthly = parseInt(monthlySavings); // 월 저축 금액을 정수로 변환
    // 기대 수명과 월 저축 금액이 유효한 경우 총 금액 계산
    if (!isNaN(years) && !isNaN(monthly)) {
      setTotalAmount(years * 12 * monthly); // 총 금액 = 기대 수명(년) * 12개월 * 월 저축 금액
    } else {
      setTotalAmount(null); // 유효하지 않은 입력값인 경우 총 금액을 null로 설정
    }
  };

  return (
    <div className="container">
      
      <div>
        <h1>앞으로 운용할 수 있는 돈</h1>
      </div>

      {/* 기대 수명 입력 필드 */}
      <div className="inputGroup">
        <label>기대 수명 입력 ▼</label>
        <input 
          type="number"
          placeholder="년 수 입력"
          value={lifespan}
          onChange={(e) => setLifespan(e.target.value)}
          className="inputField"
        />
      </div>

      {/* 월 저축 금액 입력 필드 */}
      <div className="inputGroup">
        <label>한달 저축 예정 금액 ▼</label>
        <input 
          type="number"
          placeholder="금액 입력"
          value={monthlySavings}
          onChange={(e) => setMonthlySavings(e.target.value)}
          className="inputField"
        />
      </div>

      {/* 결과 버튼 - 사용자가 입력한 값에 따라 총 금액을 계산하여 출력 */}
      <button className="resultButton" onClick={handleResultClick}>RESULT</button>

      {/* 총 금액 출력 영역 - 총 금액이 계산된 경우에만 표시 */}
      {totalAmount !== null && (
        <div className="output">
          앞으로 운용할 수 있는 금액은
          <div className="totalAmount">{totalAmount.toLocaleString()} 원입니다.</div>
        </div>
      )}
    </div>
  );
}

export default App;