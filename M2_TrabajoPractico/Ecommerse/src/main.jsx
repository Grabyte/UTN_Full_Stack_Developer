import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // Importa BrowserRouter
import RoutesComponent from './components/RoutesComponent';  // Importa tu archivo de rutas
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RoutesComponent />  {/* Aquí configuras las rutas */}
    </BrowserRouter>
  </StrictMode>
);

