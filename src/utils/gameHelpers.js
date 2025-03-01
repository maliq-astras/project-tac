// Helper function to check for winner
export const checkWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        line: {
          type: i < 3 ? 'horizontal' : i < 6 ? 'vertical' : 'diagonal',
          index: i < 3 ? i : i < 6 ? i - 3 : i - 6
        }
      };
    }
  }
  return null;
};

// Random moves helper
export const getRandomMove = (board) => {
  const availableMoves = board
    .map((cell, index) => cell === null ? index : null)
    .filter((cell) => cell !== null);
  
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}; 