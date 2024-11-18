import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date()); // 현재 날짜
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [entries, setEntries] = useState({});

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setItem('');
    setAmount('');
  };

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransaction = (type) => {
    const parsedAmount = parseInt(amount, 10);

    if (!item || !amount || isNaN(parsedAmount)) {
      alert('품목과 금액을 정확히 입력하세요.');
      return;
    }

    const newEntry = {
      item,
      amount: parsedAmount,
      type,
      date: selectedDate,
    };

    // 월별 키 (YYYY-MM)
    const monthKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}`;

    setEntries((prevEntries) => {
      const updatedEntries = { ...prevEntries };

      // 해당 월에 거래 내역이 없다면 새로운 배열 생성
      if (!updatedEntries[monthKey]) {
        updatedEntries[monthKey] = [];
      }

      // 중복된 거래를 추가하지 않도록 확인
      const isDuplicate = updatedEntries[monthKey].some(
        (entry) => entry.item === newEntry.item && entry.amount === newEntry.amount && entry.type === newEntry.type
      );

      if (!isDuplicate) {
        updatedEntries[monthKey].push(newEntry);
      }

      return updatedEntries;
    });

    // 총 수입과 총 지출 업데이트
    if (type === '입금') {
      setTotalIncome((prevTotalIncome) => prevTotalIncome + parsedAmount);
    } else if (type === '지출') {
      setTotalExpense((prevTotalExpense) => prevTotalExpense + parsedAmount);
    }

    // 입력 값 초기화
    setItem('');
    setAmount('');
    setSelectedDate(null);
  };

  const deleteTransaction = (monthKey, index) => {
    setEntries((prevEntries) => {
      const updatedEntries = { ...prevEntries };
  
      // 해당 월의 거래 내역이 있는지 확인하고, 인덱스가 유효한지 체크
      if (updatedEntries[monthKey] && updatedEntries[monthKey][index]) {
        const amountToDelete = updatedEntries[monthKey][index].amount;
        const typeToDelete = updatedEntries[monthKey][index].type;
  
        // 해당 항목 삭제
        updatedEntries[monthKey] = updatedEntries[monthKey].filter((_, i) => i !== index);
  
        // 해당 월에 거래 내역이 없다면 해당 월의 키를 삭제
        if (updatedEntries[monthKey].length === 0) {
          delete updatedEntries[monthKey];
        }
  
        // 총 수입과 총 지출을 다시 계산하여 업데이트
        if (typeToDelete === '입금') {
          setTotalIncome((prevTotalIncome) => prevTotalIncome - amountToDelete);
        } else if (typeToDelete === '지출') {
          setTotalExpense((prevTotalExpense) => prevTotalExpense - amountToDelete);
        }
      }
  
      return updatedEntries;
    });
  };  

  const formatNumberWithCommas = (number) => {
    return number.toLocaleString();
  };

  const totalBalance = totalIncome - totalExpense;

  // 월 변경 (이동 버튼)
  const changeMonth = (direction) => {
    const newDate = new Date(date);
    if (direction === 'next') {
      newDate.setMonth(date.getMonth() + 1); // 다음 달
    } else if (direction === 'prev') {
      newDate.setMonth(date.getMonth() - 1); // 지난 달
    }
    setDate(newDate);
  };

  const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

  return (
    <div className="App">
      <h1>Calendar</h1>

      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={handleDateClick}
        />
      </div>

      <div id="logo">
        <img src="logo2.png" alt="Logo" id="logo-img" />
      </div>

      {/* 총 수입, 총 지출, 총 합계 영역 */}
      <div className="total-info">
        <div>
          <span>총 수입: &nbsp;</span>
          <span>{formatNumberWithCommas(totalIncome)}원</span>
        </div>
        <div>
          <span>총 지출: &nbsp;</span>
          <span>{formatNumberWithCommas(totalExpense)}원</span>
        </div>
        <div>
          <span>총 합계: &nbsp;</span>
          <span>{formatNumberWithCommas(totalBalance)}원</span>
        </div>
      </div>
      
      {/* 팝업 창 (입금/지출 처리) */}
      {selectedDate && (
       <div id="expense-form">
         <label htmlFor="item">품목</label>
          <div className="input-group">
            <input
              type="text"
              id="item"
              placeholder="품목을 입력하세요"
              value={item}
              onChange={handleItemChange}
              style={{ width: '80%' }}
            />
            <button onClick={() => handleTransaction('입금')}>입금</button>
         </div>
         
         <label htmlFor="amount">금액</label>
         <div className="input-group">
          <input
          type="number"
          id="amount"
          placeholder="금액을 입력하세요"
          value={amount}
          onChange={handleAmountChange}
          style={{ width: '80%' }}
          />
          <button onClick={() => handleTransaction('지출')}>지출</button>
          </div>
          <br />
        </div>
      )}

      {/* 월별 가계부 목록 보기 버튼 */}
      <div className="month-buttons">
        <button onClick={() => changeMonth('prev')}>&lt; 지난 달</button>
        <button onClick={() => changeMonth('next')}>다음 달 &gt;</button>
      </div>

      {/* 거래 내역 */}
      <div id="transaction-list">
        {entries[monthKey] && entries[monthKey].length > 0 ? (
          <div className="transactions-container">
            <h3>{date.getFullYear()}년 {date.getMonth() + 1}월 가계부 내역</h3>
            <ul>
              {entries[monthKey].map((entry, index) => (
                <li key={index} style={{ color: entry.type === '입금' ? 'green' : 'red' }}>
                  <span>
                    {entry.item} - {entry.amount.toLocaleString()}원 ({entry.type}) 
                    <br />
                    <small>({entry.date.toLocaleDateString()})</small> {/* 날짜 추가 */}
                  </span>
                  <button
                    style={{ marginLeft: '10px', color: 'red' }}
                    onClick={() => deleteTransaction(monthKey, index)}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>{date.getFullYear()}년 {date.getMonth() + 1}월에 거래 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default App;
