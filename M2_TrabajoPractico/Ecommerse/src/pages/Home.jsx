import { Link } from "react-router-dom";
import Products from "../components/ProductsFromApi";

const Home = () => {
  return (
    <>
      {/* Barra de navegación */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Registro</Link>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="container">
        <h1>Bienvenido a Ecommerce</h1>
        <p>Explora nuestros productos y disfruta de tus compras.</p>
      </div>

      {/* Lista de productos */}
      <Products />
    </>
  );
};

export default Home;

