import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import appFirebase from "../credenciales";
import "../index.css";

const auth = getAuth(appFirebase);

const Login = () => {
  const navigate = useNavigate(); // Hook para navegar a otras páginas
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores

  const functionAutenticacion = async (e) => {
    e.preventDefault();
    
    const email = e.target.emailIngresar.value;
    const password = e.target.passwordIngresar.value;

    try {
      // Intentar iniciar sesión con correo y contraseña
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado:", userCredential.user);
      navigate("/home"); // Redirige a la página de inicio después del login
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setErrorMessage("Correo o contraseña incorrectos");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Crear el proveedor de Google
    try {
      const result = await signInWithPopup(auth, provider); // Iniciar sesión con Google
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);
      navigate("/home"); // Redirigir a la página de inicio después del login
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      setErrorMessage("Hubo un error al intentar iniciar sesión con Google");
    }
  };

  return (
    <div className="container">
      <h1>Iniciar sesión</h1>
      <form className="form__" onSubmit={functionAutenticacion}>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" placeholder="Ingresa tu correo electrónico" id="emailIngresar" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" placeholder="Ingresa tu contraseña" id="passwordIngresar" required />
        </div>
        <div className="form__btns">
          <button type="submit">Iniciar sesión</button>
          <button onClick={handleGoogleSignIn}> Iniciar sesión con Google </button>
          <button><Link to="/register">Registrarse</Link></button>
        </div>
      </form>

      

      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Login;



