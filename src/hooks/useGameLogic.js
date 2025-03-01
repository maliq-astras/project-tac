import { checkWinner } from '../utils/gameHelpers';
import { getComputerMove } from '../utils/gameLogic';
export const useGameLogic = (
  board,
  setBoard,
  playerSymbol,
  setWinner,
  setWinningLine,
  setGameStatus,
  setIsPlayerTurn,
  isPlayerTurn,
  difficulty,
  gameStatus,
) => {
  const handleCellClick = (index) => {
    if (board[index] || !isPlayerTurn || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setIsPlayerTurn(false);
    
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(playerSymbol);
      setWinningLine(result.line);
      setGameStatus('ended');
    } else if (!newBoard.includes(null)) {
      setWinner('draw');
      setGameStatus('ended');
    } else {
      setTimeout(() => makeComputerMove(newBoard), 500);
    }
  };

  const makeComputerMove = (currentBoard) => {
    const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
    const move = getComputerMove(currentBoard, computerSymbol, difficulty);

    const newBoard = [...currentBoard];
    newBoard[move] = computerSymbol;
    setBoard(newBoard);
    setIsPlayerTurn(true);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(computerSymbol);
      setWinningLine(result.line);
      setGameStatus('ended');
      setIsPlayerTurn(false);
    } else if (!newBoard.includes(null)) {
      setWinner('draw');
      setGameStatus('ended');
      setIsPlayerTurn(false);
    }
  };

  return { handleCellClick, makeComputerMove };
}; 