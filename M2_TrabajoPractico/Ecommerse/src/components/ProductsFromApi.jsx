import { useState, useEffect } from "react";
import ProductList from "../components/ProductLogic";

const ProductsFromApi = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        
        const mappedProducts = data.slice(0, 20).map((product) => ({
          id: product.id,
          nombre: product.title,
          descripcion: product.description,
          precio: product.price,
          imagen: product.image,
          stock: 10,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return <ProductList products={products} onAddToCart={onAddToCart} />;
};

export default ProductsFromApi;