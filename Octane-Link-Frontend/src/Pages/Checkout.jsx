import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!customerName) {
      alert('Please enter your full name!');
      return;
    }

    if (!address) {
      alert('Please enter your full address!');
      return;
    }

    if (!phone) {
      alert('Please enter your phone number!');
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid payment amount!');
      return;
    }

    const orderPayload = {
      customerName,
      paymentMethod,
      phone: phone || 'N/A',
      trxId: trxId || 'N/A',
      address,
      amount: Number(amount)
    };

    try {
      setLoading(true);


      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        const finalOrder = data.order || orderPayload;

        // LocalStorage-এ ডাটা সেভ রাখা
        localStorage.setItem('latestOrder', JSON.stringify(finalOrder));

        // Invoice পেজে রিডাইরেক্ট
        navigate('/invoice', { state: finalOrder });
      } else {
        alert(`❌ Error: ${data.error || 'Failed to place order'}`);
      }
    } catch (err) {
      console.error('Checkout Error:', err);
      alert('❌ Connection error with backend server!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2>💳 Retail Payment & Checkout</h2>

      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333', marginTop: '20px' }}>

        {/* Customer Basic Info */}
        <h4>Customer Details</h4>
        <input
          type="text"
          placeholder="Full Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#121212', color: '#fff', border: '1px solid #444', borderRadius: '4px', boxSizing: 'border-box' }}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#121212', color: '#fff', border: '1px solid #444', borderRadius: '4px', boxSizing: 'border-box' }}
        />

        <input
          type="text"
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', background: '#121212', color: '#fff', border: '1px solid #444', borderRadius: '4px', boxSizing: 'border-box' }}
        />

        {/* Payment Amount */}
        <h4>Payment Amount</h4>
        <input
          type="number"
          placeholder="Enter Payment Amount (৳)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', background: '#121212', color: '#fff', border: '1px solid #ff9800', borderRadius: '4px', boxSizing: 'border-box', fontWeight: 'bold' }}
        />

        {/* Payment Method Selection */}
        <h3>Select Payment Method</h3>
        <div style={{ display: 'flex', gap: '15px', margin: '15px 0' }}>
          <button
            type="button"
            onClick={() => setPaymentMethod('bKash')}
            style={{
              padding: '10px 20px',
              background: '#e91e63',
              color: '#fff',
              border: paymentMethod === 'bKash' ? '2px solid #fff' : 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: paymentMethod === 'bKash' ? 1 : 0.6
            }}
          >
            bKash
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('Nagad')}
            style={{
              padding: '10px 20px',
              background: '#f44336',
              color: '#fff',
              border: paymentMethod === 'Nagad' ? '2px solid #fff' : 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: paymentMethod === 'Nagad' ? 1 : 0.6
            }}
          >
            Nagad
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('Card')}
            style={{
              padding: '10px 20px',
              background: '#2196f3',
              color: '#fff',
              border: paymentMethod === 'Card' ? '2px solid #fff' : 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: paymentMethod === 'Card' ? 1 : 0.6
            }}
          >
            Card
          </button>
        </div>

        {/* Payment Details Section: TrxID */}
        <div style={{ background: '#121212', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid #333' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#ffb74d' }}>
            Selected: <b>{paymentMethod}</b> | Send payment to: <b>01700000000</b>
          </p>

          <input
            type="text"
            placeholder={`Enter ${paymentMethod} Transaction ID (TrxID)`}
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#252525', color: '#fff', border: '1px solid #555', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          style={{ width: '100%', background: '#00e676', color: '#000', border: 'none', padding: '12px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Saving to Database...' : 'Confirm Order'}
        </button>
      </div>
    </div>
  );
}