import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FaTrophy } from "react-icons/fa";
import { BiSolidTimer } from "react-icons/bi";
import '../styles/Leaderboard.css';

const Leaderboard: React.FC = () => {
  const scores = useSelector((state: RootState) => state.leaderboard.scores);
  const mostRecentEntry = useSelector((state: RootState) => state.leaderboard.mostRecentEntry);
  const [newEntryIndex, setNewEntryIndex] = useState<number | null>(null);
  const leaderboardListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (mostRecentEntry) {
      const index = scores.findIndex(score => score === mostRecentEntry);
      setNewEntryIndex(index);

      if (leaderboardListRef.current) {
        if (index < 10) {
          leaderboardListRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const listItem = leaderboardListRef.current.children[index] as HTMLElement;
          const containerTop = leaderboardListRef.current.getBoundingClientRect().top;
          const listItemTop = listItem.getBoundingClientRect().top;
          const scrollTop = listItemTop - containerTop + leaderboardListRef.current.scrollTop;
          leaderboardListRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }
      }

      setTimeout(() => setNewEntryIndex(null), 2000); // Remove the highlight after 2 seconds
    }
  }, [scores, mostRecentEntry]);

  return (
    <>
      <div className="leaderboard">
        <div className='leaderboard-header'>
          <div className='heading-group'>
            <span className='heading-index'><FaTrophy size={25} /></span>
            <span className='heading-name'>NAME</span>
          </div>
          <span className='heading-time'><BiSolidTimer size={25} />TIME</span>
        </div>
        <ul className="leaderboard-list" ref={leaderboardListRef}>
          {scores.map((score, index) => {
            let itemClass = 'leaderboard-item';
            let prize = '';
            if (index === newEntryIndex) itemClass += ' new-entry';
            if (index === 0) {
              itemClass += ' first-place';
              prize = ' ₹50000';
            } else if (index === 1) {
              itemClass += ' second-place';
              prize = ' ₹5000';
            } else if (index === 2) {
              itemClass += ' third-place';
              prize = ' ₹500';
            }

            return (
              <li key={index} className={itemClass}>
                <div className='item-group'>
                  <span className='item-index'>{index + 1}</span>
                  <span className='item-name'>{score.username}</span>
                </div>
                <div className='item-group'>
                  {prize}
                  <span className='item-score'>{score.time}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {mostRecentEntry && (
        <div className="most-recent-entry">
          <h3 className='heading'>Recent Entry</h3>
          <div className="recent-item">
            <div className='item-group'>
              <span className='item-index'>{scores.findIndex(score => score === mostRecentEntry) + 1}</span>
              <span className='item-name'>{mostRecentEntry.username}</span>
            </div>
            <span className='item-score'>{mostRecentEntry.time}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Leaderboard;
