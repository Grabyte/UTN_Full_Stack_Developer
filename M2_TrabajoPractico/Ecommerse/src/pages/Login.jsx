const Login = () => {
  return (
    <div className="container">
      <h1>Iniciar sesión</h1>
      <form>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" placeholder="Ingresa tu correo electrónico" />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" placeholder="Ingresa tu contraseña" />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
