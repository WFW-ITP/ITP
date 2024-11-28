import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">

      {/* 추천 페이지 */}
      <div>
        <h1>금융 공부</h1>
        <h5>원하는 주제를 클릭하세요!</h5>

        {/* 버튼 그룹 */}
        <div className="button-group">
          {/* 뉴스 버튼 */}
          <button
            className="button"
            onClick={() => window.location.href = 'https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNR2RtY0hNekVnSnJieWdBUAE?hl=ko&gl=KR&ceid=KR%3Ako'}
          >
            <img src="news.png" alt="뉴스 이미지" />
            <div className="text">news<br />뉴스</div>
          </button>

          {/* 주식 버튼 */}
          <button
            className="button"
            onClick={() => window.location.href = 'https://www.google.com/finance/?hl=ko'}
          >
            <img src="stock.png" alt="주식 이미지" />
            <div className="text">stock<br />주식</div>
          </button>

          {/* 부동산 버튼 */}
          <button
            className="button"
            onClick={() => window.location.href = 'https://land.seoul.go.kr/land/'}
          >
            <img src="real estate.png" alt="부동산 이미지" />
            <div className="text">real estate<br />부동산</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
