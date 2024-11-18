import React, { useState } from "react";
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Calendar.css";

function Calendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container" style={{ padding: '20px' }}>
      <h2>캘린더</h2>
      <ReactCalendar 
        onChange={setDate}
        value={date}
        locale="ko-KR"
      />
      <p>선택된 날짜: {date.toLocaleDateString()}</p>
    </div>
  );
}

export default Calendar;
