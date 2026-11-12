import { useState, useEffect } from "react";
import data from "./data.json";
import ProductCard from "./ProductCard";
import OrderModal from "./OrderModal";

export default function App() {
  // 1. Initialize state from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("dessert-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("dessert-cart", JSON.stringify(cart));
  }, [cart]);

  // Add item (or increase if already exists)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const incrementItem = (productName) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity (or remove if it hits 0)
  const decrementItem = (productName) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === productName);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.name !== productName);
      }
      return prevCart.map((item) =>
        item.name === productName ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // Remove item completely (for the X button in the cart)
  const removeItem = (productName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== productName));
  };

  // Clear cart and close modal
  const handleStartNewOrder = () => {
    setCart([]);
    setIsModalOpen(false);
  };

  // Calculate totals
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const orderTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <main className="app-container">
      <section className="products-section">
        <h1>Desserts</h1>
        <div className="product-grid">
          {data.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              cartItem={cart.find((item) => item.name === product.name)}
              addToCart={addToCart}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
            />
          ))}
        </div>
      </section>

      <aside className="cart-section">
        <h2>Your Cart ({totalItems})</h2>

        {cart.length === 0 ? (
          <div className="empty-cart">
            {/* Pointing directly to public folder */}
            <img src="assets/illustration-empty-cart.svg" alt="Empty cart" />
            <p>Your added items will appear here</p>
          </div>
        ) : (
          <div>
            {/* Cart Items List */}
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.name} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <div className="cart-item-details">
                      <span className="qty">{item.quantity}x</span>
                      <span className="unit-price">@ ${item.price.toFixed(2)}</span>
                      <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.name)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.868 1.15a.5.5 0 0 0-.707 0L5.028 4.283 1.895 1.15a.5.5 0 1 0-.707.707L4.32 4.99 1.188 8.122a.5.5 0 1 0 .707.707L5.028 5.7l3.132 3.132a.5.5 0 0 0 .707-.707L5.736 4.99l3.132-3.132a.5.5 0 0 0 0-.707Z"/></svg>
                  </button>
                </li>
              ))}
            </ul>

            {/* Order Total & Confirm Button */}
            <div className="cart-total-section">
              <div className="total-row">
                <span>Order Total</span>
                <span className="total-price">${orderTotal.toFixed(2)}</span>
              </div>
              
              <div className="carbon-neutral">
                {/* Pointing directly to public folder */}
                <img src="assets/icon-carbon-neutral.svg" alt="carbon neutral" />
                <p>This is a <strong>carbon-neutral</strong> delivery</p>
              </div>

              <button className="confirm-btn" onClick={() => setIsModalOpen(true)}>
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </aside>

      <OrderModal 
        isOpen={isModalOpen} 
        cart={cart} 
        orderTotal={orderTotal} 
        onClose={handleStartNewOrder} 
      />
    </main>
  );
}