import { useState, useRef, useEffect } from "react";

function PurchaseButton({ stock, onPurchase, onAddToCart, producto }) {
  const [purchaseMessage, setPurchaseMessage] = useState("");

  // Verificación adicional para asegurar que onAddToCart es una función
  const handleAddToCart = () => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(producto);
    } else {
      console.error('onAddToCart no es una función', onAddToCart);
    }
  };

  const handlePurchase = () => {
    if (stock > 0) {
      onPurchase(); // Actualiza el stock
      handleAddToCart(); // Añade al carrito de forma segura
      setPurchaseMessage("¡Agregado al carrito!");
      setTimeout(() => setPurchaseMessage(""), 2000);
    } else {
      setPurchaseMessage("Stock no disponible");
    }
  };

  return (
    <div>
      <button 
        onClick={handlePurchase} 
        className="purchase-button"
        disabled={stock <= 0}
      >
        {stock > 0 ? "Añadir al Carrito" : "Sin Stock"}
      </button>
      {purchaseMessage && (
        <p className="purchase-message" style={{ minHeight: "24px" }}>
          {purchaseMessage}
        </p>
      )}
    </div>
  );
}

function ProductInfo({ producto, onAddToCart }) {
  const [stock, setStock] = useState(producto.stock || 0);
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);
  const [needsTitleExpand, setNeedsTitleExpand] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [needsDescExpand, setNeedsDescExpand] = useState(false);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  // Verificación de la prop onAddToCart
  useEffect(() => {
    if (typeof onAddToCart !== 'function') {
      console.error('ProductInfo: onAddToCart no es una función', onAddToCart);
    }
  }, [onAddToCart]);

  useEffect(() => {
    const checkOverflow = (ref, setNeedsExpand, linesThreshold) => {
      if (ref.current) {
        const lineHeight = parseFloat(getComputedStyle(ref.current).lineHeight);
        const contentHeight = ref.current.scrollHeight;
        const lines = Math.round(contentHeight / lineHeight);
        setNeedsExpand(lines > linesThreshold);
        
        if (!(lines > linesThreshold)) {
          if (ref === titleRef && isTitleExpanded) {
            setIsTitleExpanded(false);
          }
          if (ref === descRef && isDescExpanded) {
            setIsDescExpanded(false);
          }
        }
      }
    };

    const titleObserver = new ResizeObserver(() => {
      checkOverflow(titleRef, setNeedsTitleExpand, 3);
    });

    const descObserver = new ResizeObserver(() => {
      checkOverflow(descRef, setNeedsDescExpand, 4);
    });

    if (titleRef.current) {
      checkOverflow(titleRef, setNeedsTitleExpand, 3);
      titleObserver.observe(titleRef.current);
    }

    if (descRef.current) {
      checkOverflow(descRef, setNeedsDescExpand, 4);
      descObserver.observe(descRef.current);
    }

    return () => {
      titleObserver.disconnect();
      descObserver.disconnect();
    };
  }, [producto.nombre, producto.descripcion, isTitleExpanded, isDescExpanded]);

  const handlePurchase = () => {
    //momentaneamente le restamos 0 al prevstcok del carrito por que elimine la cantidad de stock de este ecommerce se ejemplo
    setStock((prevStock) => Math.max(prevStock - 0, 0));
  };

  const toggleTitle = () => {
    if (needsTitleExpand) {
      setIsTitleExpanded(!isTitleExpanded);
    }
  };

  const toggleDesc = () => {
    if (needsDescExpand) {
      setIsDescExpanded(!isDescExpanded);
    }
  };

  return (
    <div className="productInfo">
      <h2 
        ref={titleRef}
        className={isTitleExpanded ? "expanded" : ""}
        onClick={toggleTitle}
        style={{ cursor: needsTitleExpand ? "pointer" : "default" }}
      >
        {producto.nombre}
        {needsTitleExpand && (
          <span className="toggle-icon">
            {isTitleExpanded ? " ▲" : " ▼"}
          </span>
        )}
      </h2>
      <div className="product-image-container">
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          className="product-image" 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
          }}
        />
      </div>
      <p 
        ref={descRef}
        className={`product-description ${isDescExpanded ? "" : "clamp-lines"}`}
        onClick={toggleDesc}
        style={{ cursor: needsDescExpand ? "pointer" : "default" }}
      >
        {producto.descripcion}
        {needsDescExpand && (
          <span className="toggle-icon">
            {isDescExpanded ? " ▲" : " ▼"}
          </span>
        )}
      </p>
      <p className="product-price">${producto.precio?.toFixed(2) || '0.00'}</p>
      {/* <p className="product-stock">Stock: {stock}</p> */}
      <PurchaseButton 
        stock={stock}
        onPurchase={handlePurchase}
        onAddToCart={onAddToCart}
        producto={producto}
      />
    </div>
  );
}

function ProductList({ products = [], onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Verificación exhaustiva de props
  useEffect(() => {
    if (typeof onAddToCart !== 'function') {
      console.error('ProductList: onAddToCart debe ser una función', onAddToCart);
    }
    
    if (!Array.isArray(products)) {
      console.error('ProductList: products debe ser un array', products);
    }
  }, [onAddToCart, products]);

  if (!Array.isArray(products)) {
    return <div className="error">Error: Formato de productos inválido</div>;
  }

  const filteredProducts = products.filter(producto =>
    producto?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="productList">
        {filteredProducts.length === 0 ? (
          <p className="no-results">No se encontraron productos</p>
        ) : (
          filteredProducts.map((producto) => (
            <ProductInfo 
              key={producto.id} 
              producto={producto} 
              onAddToCart={onAddToCart}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;