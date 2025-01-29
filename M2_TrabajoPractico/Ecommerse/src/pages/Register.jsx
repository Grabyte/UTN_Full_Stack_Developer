const Register = () => {
  return (
    <div className="container">
      <h1>Registro</h1>
      <form>
        <div>
          <label>Nombre de usuario:</label>
          <input type="text" placeholder="Ingresa tu nombre de usuario" />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" placeholder="Ingresa tu correo electrónico" />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" placeholder="Ingresa tu contraseña" />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
