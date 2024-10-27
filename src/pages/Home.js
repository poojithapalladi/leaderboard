// src/pages/Home.js
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch('http://localhost:7000/api/user/v1/get-users');
      const data = await response.json();
      setFriends(data.users.slice(0, 10));
    };

    fetchFriends();
  }, []);

  const handleClaimPoints = async (userId) => {
    await fetch(`http://localhost:7000/api/user/v1/claim-points`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    setFriends(friends.map((friend) => (friend._id === userId ? { ...friend, points: friend.points + 10 } : friend)));
  };

  return (
    <div>
      <h2>Home</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>
            {friend.firstName} {friend.lastName}: {friend.points} points
            <button onClick={() => handleClaimPoints(friend._id)}>Claim Points</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
