import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BulkQuote() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ company: '', fuelType: 'Diesel', quantity: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Quote Submitted Successfully!');
    navigate('/invoice');
  };

  return (
    <div style={{ padding: '30px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🏢 Wholesale Bulk Fuel Quote</h2>
      <p style={{ color: '#aaa' }}>Request bulk quantity pricing for commercial use.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px', background: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
        <label>Company Name:</label>
        <input 
          type="text" 
          required 
          placeholder="e.g. Acme Logistics"
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          style={{ padding: '10px', background: '#121212', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
        />
        
        <label>Fuel Type:</label>
        <select 
          onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
          style={{ padding: '10px', background: '#121212', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
        >
          <option value="Diesel">Diesel Bulk</option>
          <option value="Octane">Octane 95 Bulk</option>
          <option value="Lubricant">Industrial Lubricant</option>
        </select>

        <label>Quantity (Liters / Drums):</label>
        <input 
          type="number" 
          required 
          placeholder="e.g. 5000"
          onChange={(e) => setFormData({...formData, quantity: e.target.value})}
          style={{ padding: '10px', background: '#121212', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
        />

        <button type="submit" style={{ background: '#ff9800', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
          Generate Invoice & Quote 📄
        </button>
      </form>
    </div>
  );
}