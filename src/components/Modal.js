// src/components/Modal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Modal = ({ userId, onClose }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.post('http://localhost:7000/api/user/v1/your-history', { userId });
        setHistory(response.data.history);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, [userId]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Points History</h2>
        <ul className="max-h-60 overflow-y-auto">
          {history.length > 0 ? (
            history.map((entry, index) => (
              <li key={index} className="py-2 border-b border-gray-300">
                <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                <p>Points: {entry.points}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No history available.</p>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
