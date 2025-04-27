import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute"; // Importamos el componente protegido

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Redirección a login si la ruta no existe */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default RoutesComponent;

