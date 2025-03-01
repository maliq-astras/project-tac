import React from 'react';
import './GameBoard.css';
import { useTheme } from '../../context/ThemeContext';
import Cell from '../Cell/Cell';



const GameBoard = ({
  board,
  winningLine,
  isPlayerTurn,
  gameStatus,
  playerSymbol,
  winner,
  onCellClick,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`game-board ${winner === 'draw' ? 'draw' : ''}`}>
      {winningLine && (
        <div 
          className={`winning-line ${winningLine.type} line-${winningLine.index}`} 
          style={{ backgroundColor: theme.primary }} 
        />
      )}
      {board.map((cell, index) => (
        <Cell
          key={index}
          index={index}
          cell={cell}
          isPlayerTurn={isPlayerTurn}
          gameStatus={gameStatus}
          playerSymbol={playerSymbol}
          onCellClick={onCellClick}
        />
      ))}
    </div>
  );
};

export default GameBoard; 