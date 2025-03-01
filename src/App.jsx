import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import TicTacToe from './components/TicTacToe/TicTacToe';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <TicTacToe />
      </div>
    </ThemeProvider>
  );
};

export default App;
