import React, { useState } from 'react';
import { useNavigate } from "react-router";
import './Home.css';

const Home = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        if (!username) {
            alert("Please enter your name");
            return;
        }
        if(username.length < 3) {
            alert("Username must be at least 3 characters long");
            return;
        }
        localStorage.setItem("username", username);
        navigate("/start-quiz");
    };

    return (
        <div className="home-container">
            <input 
                type="text" 
                placeholder="Enter your name" 
                onChange={(e) => setUsername(e.target.value)} 
                value={username} 
                required
                className="username-input"
            />
            <button onClick={handleStartQuiz} className="start-btn">Start The Quiz</button>
        </div>
    );
};

export default Home;
