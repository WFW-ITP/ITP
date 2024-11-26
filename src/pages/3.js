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
      {/* 뒤로 가기 버튼 - 이전 화면으로 돌아가기 위한 버튼 */}
      <div>

        <h1 className="title">앞으로 운용할 수 있는 돈</h1>
      </div>

      {/* 기대 수명 입력 필드 */}
      <div className="inputGroup">
        <label>기대 수명 입력▼</label>
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
        <label>한달 저축 예정 금액▼</label>
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


/* 상세 설명 주석 */
// 1. 사용자가 기대 수명과 한 달 저축 금액을 입력하면, 'RESULT' 버튼 클릭 시 총 저축 금액을 계산해 줍니다.
// 2. 'lifespan'과 'monthlySavings' 상태를 통해 사용자 입력값을 관리하며, 'totalAmount' 상태를 통해 계산된 결과를 출력합니다.
// 3. 입력값이 유효하지 않은 경우 결과를 표시하지 않도록 설정하였습니다.