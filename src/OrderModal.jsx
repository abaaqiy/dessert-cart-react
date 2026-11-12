export default function OrderModal({ isOpen, cart, orderTotal, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          {/* Green Checkmark Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48">
            <path fill="#1EA575" d="M24 48a24 24 0 1 0 0-48 24 24 0 0 0 0 48Z"/>
            <path fill="#fff" d="m21.97 33.17-8.3-8.3 2.83-2.83 5.47 5.47 11.7-11.7 2.83 2.83-14.53 14.53Z"/>
          </svg>
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </div>

        <div className="modal-receipt">
          <ul className="receipt-list">
            {cart.map((item) => (
              <li key={item.name} className="receipt-item">
                <img src={item.image.thumbnail} alt={item.name} className="receipt-thumb" />
                <div className="receipt-info">
                  <h4>{item.name}</h4>
                  <div className="receipt-details">
                    <span className="qty">{item.quantity}x</span>
                    <span className="unit-price">@ ${item.price.toFixed(2)}</span>
                  </div>
                </div>
                <span className="receipt-total">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="receipt-footer">
            <span>Order Total</span>
            <span className="receipt-grand-total">${orderTotal.toFixed(2)}</span>
          </div>
        </div>

        <button className="start-new-btn" onClick={onClose}>
          Start New Order
        </button>
      </div>
    </div>
  );
}