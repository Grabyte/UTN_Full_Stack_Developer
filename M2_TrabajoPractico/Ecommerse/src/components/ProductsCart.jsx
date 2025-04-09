import { useState } from "react";

const ProductsCart = ({ cartItems, removeFromCart, clearCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calcular total
  const total = cartItems.reduce(
    (sum, item) => sum + (item.precio * item.quantity),
    0
  );

  // Total de items
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="cart-container">
      <button 
        className="cart-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        🛒 Carrito ({itemCount})
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Tu Carrito</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="close-cart"
            >
              ×
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío</p>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <span className="item-name">{item.nombre}</span>
                      <span className="item-price">${item.precio.toFixed(2)}</span>
                    </div>
                    <div className="item-controls">
                      <span>Cantidad: {item.quantity}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="remove-item"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="cart-actions">
                  <button onClick={clearCart} className="clear-cart">
                    Vaciar Carrito
                  </button>
                  <button 
                    onClick={() => {alert(`Compra finalizada por $${total.toFixed(2)}`); clearCart();}}
                    className="checkout"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsCart;