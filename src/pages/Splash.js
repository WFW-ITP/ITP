import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashImage from '../assets/Splash.png'; 

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후에 메인 화면으로 이동
    const timer = setTimeout(() => {
      navigate('/main');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <img 
        src={SplashImage} 
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