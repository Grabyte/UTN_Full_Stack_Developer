import { useState } from "react";

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
            <button onClick={handlePurchase}>
                Comprar
            </button>
            {/* Mensaje con espacio reservado */}
            <p style={{ visibility: purchaseMessage ? "visible" : "hidden", minHeight: "24px" }}>
                {purchaseMessage || " "}
            </p>
        </div>
    );
}

function ProductInfo({ producto }) {
    const [stock, setStock] = useState(producto.stock);

    const handlePurchase = () => {
        setStock((prevStock) => Math.max(prevStock - 1, 0));
    };

    return (
        <div className="productInfo">
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            <p>Stock: {stock}</p>
            <PurchaseButton stock={stock} onPurchase={handlePurchase} />
        </div>
    );
}

function ProductList({ products }) {  // Recibe los productos como prop
    return (
        <div className="productList">
            {products.map((producto) => (
                <ProductInfo key={producto.id} producto={producto} />
            ))}
        </div>
    );
}

export default ProductList;

