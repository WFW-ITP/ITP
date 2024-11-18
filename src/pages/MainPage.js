import React from "react";
import Calendar from "../components/Calendar.js";
import NavBar from "../components/NavBar.js";

function MainPage() {
  return (
    <div className="main-page">
      <Calendar />
      <NavBar />
    </div>
  );
}

export default MainPage;
