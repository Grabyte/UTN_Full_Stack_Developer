import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate de react-router-dom
import appFirebase from "../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);

const Register = () => {
  const navigate = useNavigate(); // Inicializamos el hook para la navegación
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

  const functionAutenticacion = async (e) => {
    e.preventDefault();
    const email = e.target.emailRegistro.value;
    const password = e.target.passwordRegistro.value;

    try {
      // Crear nuevo usuario
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", userCredential.user);

      // Mostrar el mensaje de éxito
      setSuccessMessage("¡Registro exitoso!");

      // Redirigir a la página de login después de 3 segundos
      setTimeout(() => {
        navigate("/login"); // Redirige al login
      }, 1500); // 3 segundos
    } catch (error) {
      console.error("Error al registrar:", error.message);
      alert("Error al registrar el usuario");
    }
  };

  return (
    <div className="container">
      <h1>Registro</h1>
      <form onSubmit={functionAutenticacion}>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" placeholder="Ingresa tu correo electrónico" name="emailRegistro" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" placeholder="Ingresa tu contraseña" name="passwordRegistro" required />
        </div>
        <button type="submit">Registrarse</button>
      </form>

      <div>
        <p>¿Ya tienes una cuenta?</p>
        <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      </div>
      {/* Mostrar el mensaje de éxito si está presente */}
      {successMessage && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Register;



