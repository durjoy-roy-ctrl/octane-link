import React from 'react';

export default function CartCheckout() {
  return (
    <div className="cart-container">
      <h2>🛒 Retail Shopping Cart & Checkout</h2>
      <p className="cart-subtitle">Review your items and choose payment method</p>

      <div className="flex-layout">
        {/* Cart Items List */}
        <div className="cart-section">
          <h3 className="section-title">Selected Items</h3>
          
          <div className="item-row">
            <div>
              <strong>Octane (Petrol)</strong>
              <p className="item-desc">Padma Oil • 20 Liters</p>
            </div>
            <span className="price-text">৳ 2,500</span>
          </div>

          <div className="item-row">
            <div>
              <strong>Synthetic Mobil 1</strong>
              <p className="item-desc">Mobil • 4 Liters</p>
            </div>
            <span className="price-text">৳ 4,800</span>
          </div>

          <div className="total-row">
            <h4 style={{ margin: 0 }}>Total Amount:</h4>
            <h3 className="price-text" style={{ margin: 0 }}>৳ 7,300</h3>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="payment-section">
          <h3 className="section-title">💳 Payment Options (Retail)</h3>
          
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="payment" defaultChecked /> 📱 bKash / Nagad / Rocket
            </label>
            <label className="radio-label">
              <input type="radio" name="payment" /> 💳 Credit / Debit Card (VISA/Mastercard)
            </label>
            <label className="radio-label">
              <input type="radio" name="payment" /> 💵 Cash on Delivery (COD)
            </label>
          </div>

          <button className="checkout-btn">Proceed to Pay (৳ 7,300)</button>
        </div>
      </div>
    </div>
  );
}