import { Link, useNavigate } from "react-router-dom"; // Añadimos useNavigate
import Products from "../components/ProductsFromApi";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../credenciales";

const auth = getAuth(appFirebase);

const Home = () => {
  const navigate = useNavigate(); // Inicializamos useNavigate para redirigir después del logout

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>

      <div className="container">
        <h1>Bienvenido a Ecommerce</h1>
        <p>Explora nuestros productos y disfruta de tus compras.</p>
      </div>

      <Products />
    </>
  );
};

export default Home;

