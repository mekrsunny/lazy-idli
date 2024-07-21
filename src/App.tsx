
import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import AddScorePopup from './components/AddScorePopup';
import AutoScrollingFooter from './components/Footer';
import mainBg from './assets/main-bg.png'
import Logo from './assets/Logo.svg'
import './App.css';

function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddScoreClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };


  return (
    <div className="App">
      <header className="app-header">
        <img src={Logo} alt='logo' className='logo' />
        <button onClick={handleAddScoreClick} className="add-score-button">
          Add Score
        </button>
      </header>
      <main style={{
         backgroundImage:  `url(${mainBg})`
      }}>
        <Leaderboard />
      </main>
        <AutoScrollingFooter />
      {isPopupVisible && <AddScorePopup closePopup={closePopup} />}
    </div>
  );
}

export default App;
