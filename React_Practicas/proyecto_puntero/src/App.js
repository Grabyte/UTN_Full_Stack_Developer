import './App.css'
import { useEffect, useState } from 'react'

function App () {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('hola soy el useEffect de App')

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }

    if (enable) {
      window.addEventListener('mousemove', handleMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [enable])

  useEffect(() => {
    if (enable) {
      document.body.classList.toggle('no-cursor')
    }

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enable])

  const activeStyle = {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid #fff',
    borderRadius: '50%',
    opacity: 0.8,
    pointerEvents: 'none',
    left: -25,
    top: -25,
    width: 50,
    height: 50,
    transform: `translate(${position.x}px, ${position.y}px)`
  }

  return (
    <main>
      <div style={enable ? activeStyle : {}} />
      <button onClick={() => setEnable(!enable)}>Presione aquí para {enable ? 'desactivar' : 'activar'} el puntero</button>
    </main>
  )
}

export default App
