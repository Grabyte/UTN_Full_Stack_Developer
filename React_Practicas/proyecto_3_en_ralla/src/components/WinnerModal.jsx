// WinnerModal.jsx
import { Square } from "./Square"

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? 'Empate' : 'Ganaron los';

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>
        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button onClick={resetGame}>Reiniciar</button>
        </footer>
      </div>
    </section>
  );
}
