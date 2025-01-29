// Nota de Torrena: Lo siento, me hubiera gustado dedicar mas tiempo a este ejercicio. poniendole mejores estilos y mejoras, pero de momento voy a entregarlo asi.
import { useState, useEffect } from "react";
import ProductList from "../components/ProductLogic";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await response.json();
        console.log("Datos obtenidos desde la API:", data); // Verifica los datos

        const mappedProducts = data.slice(0, 4).map((product) => ({
          id: product.id,
          nombre: product.title,
          descripcion: product.description,
          precio: product.price,
          stock: 10, //  stock inicial de 10 para todos los productos
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
      <ProductList products={products} />
  );
};

export default Products;
