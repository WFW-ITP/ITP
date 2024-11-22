import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Page1 from './pages/Page1';
import SavingCalculator from './pages/SavingCalculator';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import './App.css';
import BottomButtonBar from './components/BottomButtonBar';
import MoneyForecasting from './pages/MoneyForecasting';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/money-forecasting" element={<MoneyForecasting />} />
          <Route path="/saving-calculator" element={<SavingCalculator />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
        </Routes>
        <BottomButtonBar />
      </div>
    </Router>
  );
};

export default App;