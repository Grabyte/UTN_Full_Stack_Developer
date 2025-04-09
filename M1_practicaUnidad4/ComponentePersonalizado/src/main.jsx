import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TarjetaInfo from './TarjetaInfo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <TarjetaInfo titulo="Le Chocolatiere" descripcion="Bombones deliciosos a precios accesibles" imagen="https://placehold.co/150x150" enlace={"https://google.com"} />
  </StrictMode>,
)
