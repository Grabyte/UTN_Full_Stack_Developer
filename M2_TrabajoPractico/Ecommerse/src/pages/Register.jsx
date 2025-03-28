import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../credenciales";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const functionAutenticacion = async (e) => {
    e.preventDefault();
    const email = e.target.emailRegistro.value;
    const password = e.target.passwordRegistro.value;
    const nombre = e.target.nombreRegistro.value;
    const apellido = e.target.apellidoRegistro.value;

    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario registrado:", user);

      // Enviar correo de verificación
      await sendEmailVerification(user);
      console.log("Correo de verificación enviado");

      // Guardar solo nombre y apellido en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        apellido,
      });

      setSuccessMessage("¡Registro exitoso! Por favor verifica tu correo electrónico.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Error al registrar:", error.message);
      alert("Error al registrar el usuario: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Registro</h1>
      <form onSubmit={functionAutenticacion}>
        <div>
          <label>Nombre:</label>
          <input type="text" placeholder="Ingresa tu nombre" name="nombreRegistro" required />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" placeholder="Ingresa tu apellido" name="apellidoRegistro" required />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" placeholder="Ingresa tu correo electrónico" name="emailRegistro" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" placeholder="Ingresa tu contraseña" name="passwordRegistro" required />
        </div>
        <button type="submit">Registrarse</button>
        <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default Register;