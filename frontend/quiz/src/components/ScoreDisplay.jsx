import React, { useEffect, useState } from "react";
import "./ScoreDisplay.css";
import { motion } from "framer-motion";

const ScoreDisplay = ({ userScore, showScore, setShowScore }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  })

    function onClose() {
        setShowScore(false);
    }
    
  return (
    <div className="score-overlay" onClick={onClose}>
      <motion.div 
        className="score-container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Hey {username},</h1><br />
        <h5>You Scored</h5>
        <p className="score">{userScore}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </motion.div>
    </div>
  );
};

export default ScoreDisplay;
