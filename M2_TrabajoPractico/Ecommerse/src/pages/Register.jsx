import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../credenciales";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [requirements, setRequirements] = useState({
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false
  });

  // Efecto para validar la contraseña en tiempo real
  useEffect(() => {
    if (password) {
      setRequirements({
        hasUpperCase: /[A-Z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        hasMinLength: password.length >= 8
      });
    } else {
      setRequirements({
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false
      });
    }
  }, [password]);

  const functionAutenticacion = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    const email = e.target.emailRegistro.value;
    const nombre = e.target.nombreRegistro.value;
    const apellido = e.target.apellidoRegistro.value;

    // Validar que todos los requisitos se cumplan
    if (!Object.values(requirements).every(Boolean)) {
      setErrorMessage("Por favor cumple todos los requisitos de contraseña");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await sendEmailVerification(user);
      await setDoc(doc(db, "usuarios", user.uid), { nombre, apellido });

      setSuccessMessage("¡Registro exitoso! Por favor verifica tu correo electrónico.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Error al registrar:", error.message);
      setErrorMessage("Error al registrar el usuario: " + error.message);
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
          <input 
            type="password" 
            placeholder="Ingresa tu contraseña" 
            name="passwordRegistro" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password-requirements">
            <p>La contraseña debe contener al menos:</p>
            <ul>
              <li className={requirements.hasUpperCase ? "valid" : "invalid"}>1 mayúscula</li>
              <li className={requirements.hasNumber ? "valid" : "invalid"}>1 número</li>
              <li className={requirements.hasSpecialChar ? "valid" : "invalid"}>1 carácter especial</li>
              <li className={requirements.hasMinLength ? "valid" : "invalid"}>mínimo 8 caracteres</li>
            </ul>
          </div>
        </div>
        <button type="submit">Registrarse</button>
        <button type="button" onClick={() => navigate("/login")}>Iniciar sesión</button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Register;