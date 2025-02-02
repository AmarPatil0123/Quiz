import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Quiz from './components/Quiz';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<App />} />
          
          <Route path="/start-quiz" element={<Quiz />} />

        </Routes>
      </BrowserRouter>
  </StrictMode>
)
