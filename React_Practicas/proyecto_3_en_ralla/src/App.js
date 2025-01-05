import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage, saveGameStorage } from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage) return turnFromStorage
    return TURNS.X
  })
  //  El estado inicial de null es que no hay ganador y false es que hubo un empate y toca reiniciar el juego.
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    //  Si la posicion donde hacemos click ya tiene algo o tenemos un ganador, no la actualizamos.
    if (board[index] || winner) return
    //  Aca tenemos la logica para actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //  la logica para cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //  logica para guardar la partida en el local storage
    saveGameStorage(newBoard, newTurn)
    //  revisamos si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate en el caso de que no alla mas espacios en el tablero.
    return newBoard.every((Square) => Square !== null)
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  return (
    <main className='board'>
      <h1>3 en ralla</h1>
      <section className='game'>
        {
          board.map((value, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {value}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <section>
        <button onClick={resetGame}>Reiniciar juego</button>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
};

export default App
