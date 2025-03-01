import { useState } from 'react';

export const useGameState = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [gameStatus, setGameStatus] = useState('selecting');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameStatus('selecting');
    setWinner(null);
    setWinningLine(null);
    setIsPlayerTurn(true);
  };

  return {
    board,
    setBoard,
    playerSymbol,
    setPlayerSymbol,
    gameStatus,
    setGameStatus,
    winner,
    setWinner,
    winningLine,
    setWinningLine,
    isPlayerTurn,
    setIsPlayerTurn,
    resetGame,
  };
}; 