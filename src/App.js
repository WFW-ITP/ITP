// App.js
import React from 'react';
import './App.css';
import One from './01';  // 01.js에서 One 컴포넌트를 임포트
import Five from './05';  // 05.js에서 Five 컴포넌트를 임포트

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Five />
      </header>
    </div>
  );
}

export default App;