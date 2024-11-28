import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후에 /one 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/one'); // Splash 후 /one 페이지로 이동
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div className="splash-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // 화면 전체 높이
    }}>
      <img 
        src="/logo.png"
        alt="Splash" 
        style={{ 
          width: '90%',
          maxWidth: '800px',
          height: 'auto',
          objectFit: 'contain'
        }} 
      />
    </div>
  );
}

export default Splash;
