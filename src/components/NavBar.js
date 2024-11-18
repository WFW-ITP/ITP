import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <button onClick={() => navigate("/category")}>카테고리</button>
      <button onClick={() => navigate("/budget-prediction")}>생활비 예측</button>
      <button onClick={() => navigate("/savings-calculation")}>모은 돈 계산</button>
      <button onClick={() => navigate("/bucket-list")}>버킷 리스트</button>
      <button onClick={() => navigate("/recommendation")}>추천</button>
    </div>
  );
}

export default NavBar;
