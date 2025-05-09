import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './Constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { VictoryCounter } from './components/VictoryCounter'
import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const [startingTurn, setStartingTurn] = useState(TURNS.X);

  // Reiniciar automáticamente si al cargar hay un ganador o empate
  useEffect(() => {
    const savedBoard = window.localStorage.getItem("board");
    if (savedBoard) {
      const parsedBoard = JSON.parse(savedBoard);
      const savedWinner = checkWinnerFrom(parsedBoard) || checkEndGame(parsedBoard);
      if (savedWinner) {
        resetGame();
      }
    }
  }, []);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    const nextStartingTurn = startingTurn === TURNS.X ? TURNS.O : TURNS.X;

    setBoard(Array(9).fill(null));
    setTurn(nextStartingTurn);
    setWinner(null);
    setStartingTurn(nextStartingTurn);

    window.localStorage.removeItem("board");
    window.localStorage.setItem("turn", nextStartingTurn);
  };

  return (
    <main className="board">
      <div className="horizontal-pusher" />
      <div className="board-layout">
        <div className="main-content">
          <h2 className="main-title">
            Team Gatitos vs Team Perritos 🐱🐶 <br />
            <span>¿Quién tiene más ganadores?</span>
          </h2>
          
          <h1 className="span__text">Tic Tac Toe</h1>
          <div className="game-and-counter">
            <section className="game">
              {board.map((square, index) => (
                <Square key={index} index={index} updateBoard={updateBoard}>
                  {square}
                </Square>
              ))}
            </section>
          </div>

          <section className="turn">
            <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
          </section>

          <section>
            <button onClick={resetGame}>Reiniciar</button>
          </section>
        </div>

        <VictoryCounter winner={winner} />
      </div>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
