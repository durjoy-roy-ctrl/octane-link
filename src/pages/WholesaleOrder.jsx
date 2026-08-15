import React from 'react';

export default function WholesaleOrder() {
  return (
    <div className="cart-container">
      <h2>🏢 Wholesale Bulk Quote & Invoicing</h2>
      <p className="cart-subtitle">Request bulk pricing for stations & commercial buyers</p>

      <div className="flex-layout">
        {/* Bulk Quote Form */}
        <div className="cart-section">
          <h3 className="section-title">📝 Bulk Quote Request</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginBottom: '15px' }}>
              <label className="item-desc" style={{ display: 'block', marginBottom: '5px' }}>Fuel / Lubricant Type</label>
              <select className="radio-label" style={{ width: '100%', boxSizing: 'border-box' }}>
                <option>Diesel Fuel (Bulk Tanker)</option>
                <option>Octane 95 (Bulk)</option>
                <option>Industrial Hydraulic Oil</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label className="item-desc" style={{ display: 'block', marginBottom: '5px' }}>Quantity (Liters/Barrels)</label>
              <input type="number" placeholder="e.g. 5000 Liters" className="radio-label" style={{ width: '100%', boxSizing: 'border-box' }} />
            </div>

            <button className="checkout-btn">Request Official Quote</button>
          </form>
        </div>

        {/* Invoice Preview */}
        <div className="payment-section">
          <h3 className="section-title">📄 Commercial Invoice Preview</h3>
          <div className="radio-label">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>INVOICE #INV-2026-089</strong>
              <span className="price-text">Status: Credit Approved</span>
            </div>
            <hr style={{ borderColor: 'var(--line)', margin: '15px 0' }} />
            <p style={{ margin: '5px 0' }}>Client: Jamuna Logistics Ltd.</p>
            <p style={{ margin: '5px 0' }}>Item: Diesel Bulk (5,000 L)</p>
            <h4 className="price-text" style={{ margin: '15px 0 5px 0' }}>Total Billed: ৳ 5,25,000</h4>
          </div>
        </div>
      </div>
    </div>
  );
}