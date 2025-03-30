import { useState, useRef, useEffect } from "react";

function PurchaseButton({ stock, onPurchase }) {
  const [purchaseMessage, setPurchaseMessage] = useState("");

  const handlePurchase = () => {
    if (stock > 0) {
      onPurchase();
      setPurchaseMessage("Gracias por su compra");
    } else {
      setPurchaseMessage("Stock no disponible");
    }
  };

  return (
    <div>
      <button onClick={handlePurchase} className="purchase-button">
        Comprar
      </button>
      <p className="purchase-message" style={{ minHeight: "24px" }}>
        {purchaseMessage}
      </p>
    </div>
  );
}

function ProductInfo({ producto }) {
  const [stock, setStock] = useState(producto.stock);
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);
  const [needsTitleExpand, setNeedsTitleExpand] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [needsDescExpand, setNeedsDescExpand] = useState(false);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const checkOverflow = (ref, setNeedsExpand, linesThreshold) => {
      if (ref.current) {
        const lineHeight = parseFloat(getComputedStyle(ref.current).lineHeight);
        const contentHeight = ref.current.scrollHeight;
        const lines = Math.round(contentHeight / lineHeight);
        setNeedsExpand(lines > linesThreshold);
        
        // Si no necesita expandir pero está expandido, lo contraemos
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
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      if (descRef.current) descObserver.unobserve(descRef.current);
    };
  }, [producto.nombre, producto.descripcion, isTitleExpanded, isDescExpanded]);

  const handlePurchase = () => {
    setStock((prevStock) => Math.max(prevStock - 1, 0));
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
      <p className="product-price">${producto.precio}</p>
      <p className="product-stock">Stock: {stock}</p>
      <PurchaseButton stock={stock} onPurchase={handlePurchase} />
    </div>
  );
}

function ProductList({ products }) {
  return (
    <div className="productList">
      {products.map((producto) => (
        <ProductInfo key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ProductList;