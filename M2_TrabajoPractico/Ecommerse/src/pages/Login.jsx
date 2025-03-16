import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Importar Firestore
import appFirebase from "../credenciales";
import "../index.css";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const functionAutenticacion = async (e) => {
    e.preventDefault();
    const email = e.target.emailIngresar.value;
    const password = e.target.passwordIngresar.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado:", userCredential.user);
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setErrorMessage("Correo o contraseña incorrectos");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);

      // Verificar si ya existe en Firestore
      const userRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // Guardar en Firestore si no existe
        await setDoc(userRef, {
          nombre: user.displayName ? user.displayName.split(" ")[0] : "Usuario",
          apellido: user.displayName ? user.displayName.split(" ")[1] || "" : "",
        });
      }

      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      setErrorMessage("Hubo un error al intentar iniciar sesión con Google");
    }
  };

  return (
    <section className="login-container">
  <h1>Iniciar sesión</h1>
  <form className="form__" onSubmit={functionAutenticacion}>
    <div style={{ width: '100%' }}>
      <label>Correo electrónico:</label>
      <input type="email" placeholder="Ingresa tu correo electrónico" id="emailIngresar" required />
    </div>
    <div style={{ width: '100%' }}>
      <label>Contraseña:</label>
      <input type="password" placeholder="Ingresa tu contraseña" id="passwordIngresar" required />
    </div>
    <div className="form__btns">
      <button type="submit">Iniciar sesión</button>
      <button onClick={handleGoogleSignIn}> Iniciar sesión con Google </button>
      <button className="register-btn" onClick={() => navigate("/register")}>Registrarse</button>
    </div>
  </form>

  {errorMessage && (
    <div style={{ color: 'red', marginTop: '10px' }}>
      {errorMessage}
    </div>
  )}
</section>
  );
};

export default Login;



