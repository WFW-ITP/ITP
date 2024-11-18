import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 로고 아이콘 */}
      <div id="logo">
        <img src="logo2.png" alt="Logo" id="logo-img" />
      </div>

      {/* 추천 페이지 */}
      <div id="recommendation-page">
        <h1>추천 페이지</h1>
        <p>원하는 주제를 클릭하세요!</p>

        {/* 버튼 그룹 */}
        <div className="button-group">
          {/* 뉴스 버튼 */}
          <button
            className="button"
            onClick={() => window.location.href = 'https://www.google.com/search?q=news'}
          >
            <img src="news.png" alt="뉴스 이미지" />
            <div className="text">news<br />뉴스</div>
          </button>

          {/* 주식 버튼 */}
          <button
            className="button"
            onClick={() => window.location.href = 'https://www.google.com/search?q=stock'}
          >
            <img src="stock.png" alt="주식 이미지" />
            <div className="text">stock<br />주식</div>
          </button>

          {/* 부동산 버튼 */}
          <button
            className="button"
            onClick={() => window.location.href = 'https://www.google.com/search?q=real+estate'}
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
