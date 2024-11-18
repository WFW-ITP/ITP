import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from './components/NavBar';
import Splash from './pages/Splash';
import MainPage from './pages/Mainpage';
import CategoryPage from './pages/CategoryPage';
import BudgetPredictionPage from './pages/BudgetPredictionPage';
import SavingsCalculationPage from './pages/SavingsCalculationPage';
import BucketListPage from './pages/BucketListPage';
import RecommendationPage from './pages/RecommendationPage';

function AppContent() {
  const location = useLocation();
  const isSpashPage = location.pathname === '/';

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/budget-prediction" element={<BudgetPredictionPage />} />
        <Route path="/savings-calculation" element={<SavingsCalculationPage />} />
        <Route path="/bucket-list" element={<BucketListPage />} />
        <Route path="/recommendation" element={<RecommendationPage />} />
      </Routes>
      {!isSpashPage && <NavBar />}
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
