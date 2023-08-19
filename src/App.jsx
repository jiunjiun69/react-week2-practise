import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import MenuTable from './MenuTable'
import HappyCatImage from './HappyCatImage';

function App() {
  const [count, setCount] = useState(0);

  const [showCat, setShowCat] = useState(false); // 顯示圖片
  const [isRotating, setIsRotating] = useState(false);
  const [catStyle, setCatStyle] = useState({});

  useEffect(() => {
    if (isRotating) {
      const moveInterval = setInterval(() => {
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 200);
        setCatStyle({
          transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`,
          filter: `hue-rotate(${Math.random() * 360}deg)`
        });
      }, 1000 / 30);

      return () => clearInterval(moveInterval);
    }
  }, [isRotating, showCat]);
  
  const playAudio = () => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  return (
    <>
      <center>
          <h1
            className="clickable-title"
            onClick={() => setShowCat(!showCat)}
          >
          <i className={`fas fa-cat ${showCat ? 'active' : ''}`} ></i>
          餐點管理工具{' '}
          <i className={`fas fa-cat ${showCat ? 'active' : ''}`} ></i>
        </h1>
        {showCat && (
          <HappyCatImage
            isRotating={isRotating}
            catStyle={catStyle}
            onCatClick={() => setIsRotating(true)}
          />
        )}
      </center>
      <div className="card">
        <MenuTable />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App
