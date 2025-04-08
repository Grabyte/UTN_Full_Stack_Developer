import { WINNER_COMBOS } from "../Constants";

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null; // ← ahora sí, solo se ejecuta si no hubo ningún ganador
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
}