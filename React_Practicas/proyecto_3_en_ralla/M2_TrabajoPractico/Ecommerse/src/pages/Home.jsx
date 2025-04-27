import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductsList from "../components/ProductsFromApi";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import appFirebase from "../credenciales";
import ProductsCart from "../components/ProductsCart";
import "../Cart.css";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Inicializar carrito - Asegúrate de que el nombre coincida con el componente importado
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cachedUserData = localStorage.getItem(`userData-${user.uid}`);
        if (cachedUserData) {
          setUserData(JSON.parse(cachedUserData));
          setLoading(false);
        } else {
          try {
            const userDoc = await getDoc(doc(db, "usuarios", user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserData(userData);
              localStorage.setItem(`userData-${user.uid}`, JSON.stringify(userData));
            }
          } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
          }
          setLoading(false);
        }
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem(`userData-${auth.currentUser?.uid}`);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <>
<nav className="navbar">
  <div className="nav-content">
    <div className="nav-left">
      <Link to="/">Home</Link>
    </div>
    <div className="nav-right">
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <ProductsCart 
        cartItems={cartItems} 
        removeFromCart={removeFromCart} 
        clearCart={clearCart} 
      />
    </div>
  </div>
</nav>

      <div className="container">
        <h1>
          Bienvenido a mi Ecommerce, 
          {loading ? " Cargando..." : userData ? ` ${userData.nombre} ${userData.apellido}` : " Usuario"}
        </h1>
        <p>Explora nuestros productos y disfruta de tus compras.</p>
      </div>
      
      {/* Pasa tanto addToCart como cartItems al componente Products */}
      <ProductsList onAddToCart={addToCart} cartItems={cartItems} />
    </>
  );
};

export default Home;