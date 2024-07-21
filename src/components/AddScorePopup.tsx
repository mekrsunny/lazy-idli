import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addScore } from '../redux/leaderboardSlice';
import { formatTime, isValidTime } from '../utils/formatTime';
import { MdClose } from "react-icons/md";
import '../styles/AddScorePopup.css';

interface AddScorePopupProps {
  closePopup: () => void;
}

const AddScorePopup: React.FC<AddScorePopupProps> = ({ closePopup }) => {
  const [username, setUsername] = useState('');
  const [time, setTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedTime = formatTime(e.target.value);
    setTime(formattedTime);
  };

  const handleSubmit = () => {
    if (username && isValidTime(time)) {
      dispatch(addScore({ username, time }));
      setUsername('');
      setTime('');
      setErrorMessage('');
      closePopup();
    } else {
      setErrorMessage('Please enter a valid username and time in the format MM:SS:MS with seconds < 60 and milliseconds < 1000');
    }
  };

  return (
    <div className="add-score-popup-overlay">
      <div className="add-score-popup">
        <button className="close-button" onClick={closePopup}><MdClose /></button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="MM:SS:MSS"
          value={time}
          onChange={handleTimeChange}
        />
        <button onClick={handleSubmit}>Add Score</button>
      </div>
    </div>
  );
};

export default AddScorePopup;
