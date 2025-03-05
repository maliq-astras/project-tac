import React, { useEffect, useState, useRef, useCallback } from 'react';
import './DifficultyPicker.css';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useTheme } from '../../context/ThemeContext';

const DIFFICULTIES = ['easy', 'medium', 'hard', 'impossible', 'endless'];

const DifficultyPicker = ({ difficulty, setDifficulty }) => {
  const [slideDirection, setSlideDirection] = useState(null);
  const [key, setKey] = useState(0);
  const containerRef = useRef();

  const triggerAnimation = (direction) => {
    setSlideDirection(null);
    setTimeout(() => {
      setSlideDirection(direction);
      setKey(prev => prev + 1);
    }, 10);
  };

  const handleKeyPress = useCallback((e) => {
    const currentIndex = DIFFICULTIES.indexOf(difficulty);
    
    if (e.key === 'ArrowRight') {
      triggerAnimation('right');
      const nextIndex = (currentIndex + 1) % DIFFICULTIES.length;
      setDifficulty(DIFFICULTIES[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      triggerAnimation('left');
      const prevIndex = (currentIndex - 1 + DIFFICULTIES.length) % DIFFICULTIES.length;
      setDifficulty(DIFFICULTIES[prevIndex]);
    }
  }, [difficulty, setDifficulty]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    
    element.addEventListener('keydown', handleKeyPress);
    element.tabIndex = 0;
    element.focus();
    
    return () => {
      element.removeEventListener('keydown', handleKeyPress);
    };
  }, [difficulty, handleKeyPress]);

  const handlePrevClick = () => {
    triggerAnimation('left');
    const currentIndex = DIFFICULTIES.indexOf(difficulty);
    const prevIndex = (currentIndex - 1 + DIFFICULTIES.length) % DIFFICULTIES.length;
    setDifficulty(DIFFICULTIES[prevIndex]);
  };

  const handleNextClick = () => {
    triggerAnimation('right');
    const currentIndex = DIFFICULTIES.indexOf(difficulty);
    const nextIndex = (currentIndex + 1) % DIFFICULTIES.length;
    setDifficulty(DIFFICULTIES[nextIndex]);
  };

  const { theme } = useTheme()
  
  const buttonStyle = {
    color: theme.primary,
  };

  const displayStyle = {
    boxShadow: `0 4px 8px ${theme.shadow}`,
  };

  return (
    <div 
      ref={containerRef}
      className="difficulty-picker"
    >
      <button 
        className="arrow-button left" 
        onClick={handlePrevClick}
        style={buttonStyle}
        aria-label="Previous difficulty"
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 40 }} />
      </button>
      
      <div className="difficulty-display" style={displayStyle}>
        <div 
          key={key} 
          className={`difficulty-label ${difficulty} ${slideDirection ? `slide-${slideDirection}` : ''}`}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
      </div>

      <button 
        className="arrow-button right" 
        onClick={handleNextClick}
        style={buttonStyle}
        aria-label="Next difficulty"
      >
        <ArrowForwardRoundedIcon sx={{ fontSize: 40 }} />
      </button>
    </div>
  );
};

export default DifficultyPicker; 