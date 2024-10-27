// Leaderboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('daily');
  const [claimMessage, setClaimMessage] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    fetchLeaderboardData(selectedTab);
  }, [selectedTab]);

  const fetchLeaderboardData = async (tab) => {
    try {
      const response = await axios.get(`http://localhost:7000/api/user/v1/get-users?tab=${tab}`);
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data", error);
    }
  };

  const claimPoints = async (userId) => {
    try {
      const response = await axios.patch(`http://localhost:7000/api/user/v1/claim-points`, { userId });
      setClaimMessage(response.data.message);
      setTimeout(() => setClaimMessage(''), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error("Error claiming points", error);
    }
  };

  const fetchUserHistory = async (userId) => {
    try {
      const response = await axios.post('http://localhost:7000/api/user/v1/your-history', { userId });
      setUserHistory(response.data.history);
      setShowHistory(true);
    } catch (error) {
      console.error("Error fetching user history", error);
    }
  };

  return (
    <div className="leaderboard">
      <header className="leaderboard-header">
        <h2>Leaderboard</h2>
        <div className="tabs">
          {['daily', 'weekly', 'monthly'].map((tab) => (
            <button
              key={tab}
              className={selectedTab === tab ? 'active' : ''}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {claimMessage && <div className="claim-message">{claimMessage}</div>}

      <ul className="leaderboard-list">
        {leaderboardData.map((user) => (
          <li key={user.id} className="leaderboard-item">
            <div>
              <span>{user.name}</span>
              <span>Rank: {user.rank}</span>
              <span>Prize: ₹{user.prize}</span>
            </div>
            <button onClick={() => claimPoints(user.id)}>Claim</button>
            <button onClick={() => fetchUserHistory(user.id)}>History</button>
          </li>
        ))}
      </ul>

      {showHistory && <HistoryModal history={userHistory} onClose={() => setShowHistory(false)} />}
    </div>
  );
};

export default Leaderboard;
