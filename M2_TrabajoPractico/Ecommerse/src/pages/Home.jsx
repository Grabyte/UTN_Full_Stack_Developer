import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Products from "../components/ProductsFromApi";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore
import appFirebase from "../credenciales";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Verificar si los datos están en caché
        const cachedUserData = localStorage.getItem(`userData-${user.uid}`);
        if (cachedUserData) {
          setUserData(JSON.parse(cachedUserData)); // Usar datos en caché
          setLoading(false);
        } else {
          try {
            const userDoc = await getDoc(doc(db, "usuarios", user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserData(userData);
              // Guardar datos en caché
              localStorage.setItem(`userData-${user.uid}`, JSON.stringify(userData));
            }
          } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
          }
          setLoading(false);
        }
      } else {
        setUserData(null); // Si no hay usuario, limpia los datos
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar el componente
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada");
      localStorage.removeItem(`userData-${auth.currentUser?.uid}`); // Limpiar caché al cerrar sesión
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <>
      {/* Navbar debe estar fuera del container para que ocupe todo el ancho */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-right">
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </nav>

      {/* Contenedor del contenido principal */}
      <div className="container">
        <h1>
          Bienvenido a mi Ecommerce, 
          {loading ? " Cargando..." : userData ? ` ${userData.nombre} ${userData.apellido}` : " Usuario"}
        </h1>
        <p>Explora nuestros productos y disfruta de tus compras.</p>
      </div>
      <Products />
    </>
  );
};

export default Home;