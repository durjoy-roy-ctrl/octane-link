import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Invoice() {
    const location = useLocation();
    const navigate = useNavigate();

    
    const orderData = location.state?.order || location.state || JSON.parse(localStorage.getItem('latestOrder') || 'null');

   
    if (!orderData) {
        return (
            <div style={{ color: '#fff', textAlign: 'center', padding: '60px 20px' }}>
                <h2>⚠️ No Order Information Found!</h2>
                <p style={{ color: '#aaa', margin: '15px 0' }}>Please complete the checkout process first.</p>
                <button
                    onClick={() => navigate('/sell')}
                    style={{
                        padding: '10px 20px',
                        background: '#ff9800',
                        color: '#000',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Go to Sell / Checkout Page
                </button>
            </div>
        );
    }

    const invoiceNumber = orderData._id ? orderData._id.slice(-6).toUpperCase() : `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const currentDate = new Date().toLocaleDateString();

    return (
        <div style={{ padding: '40px 20px', color: '#fff', maxWidth: '650px', margin: '0 auto' }}>
            <style>
                {`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              background-color: #121212 !important;
            }
          }
        `}
            </style>

            <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '10px', border: '1px solid #333', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>

                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #444', paddingBottom: '15px' }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#ff9800', letterSpacing: '1px' }}>
                            OCTANE<span style={{ color: '#fff' }}>LINK</span>
                        </h2>
                        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#aaa' }}>Fuel Retail & Order Confirmation</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h3 style={{ margin: 0, color: '#00e676' }}>INVOICE</h3>
                        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#ccc' }}><b>ID:</b> #{invoiceNumber}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#ccc' }}><b>Date:</b> {currentDate}</p>
                    </div>
                </div>

                {/* Customer & Transaction Info */}
                <div style={{ margin: '20px 0', background: '#121212', padding: '15px', borderRadius: '6px', border: '1px solid #2a2a2a' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#ffb74d' }}>Customer & Payment Info</h4>
                    <p style={{ margin: '6px 0', fontSize: '14px' }}><b>Customer Name:</b> {orderData.customerName || 'N/A'}</p>
                    <p style={{ margin: '6px 0', fontSize: '14px' }}><b>Phone:</b> {orderData.phone || 'N/A'}</p>
                    <p style={{ margin: '6px 0', fontSize: '14px' }}><b>Delivery Address:</b> {orderData.address || 'N/A'}</p>
                    <p style={{ margin: '6px 0', fontSize: '14px' }}><b>Payment Method:</b> {orderData.paymentMethod || 'N/A'}</p>
                    <p style={{ margin: '6px 0', fontSize: '14px' }}>
                        <b>Transaction ID (TrxID):</b> <span style={{ color: '#00e676', fontWeight: 'bold' }}>{orderData.trxId || 'N/A'}</span>
                    </p>
                </div>

                {/* Invoice Items Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', marginBottom: '25px' }}>
                    <thead>
                        <tr style={{ background: '#2a2a2a', textAlign: 'left', borderBottom: '1px solid #444' }}>
                            <th style={{ padding: '10px', fontSize: '14px' }}>Item Description</th>
                            <th style={{ padding: '10px', textAlign: 'right', fontSize: '14px' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #333' }}>
                            <td style={{ padding: '12px 10px', fontSize: '14px', fontWeight: '500' }}>
                                {orderData.productName || 'Fuel Retail Order'}
                            </td>
                            <td style={{ padding: '12px 10px', textAlign: 'right', fontSize: '14px' }}>৳ {orderData.amount ? orderData.amount.toLocaleString() : '0'}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', fontSize: '15px' }}>Grand Total Paid</td>
                            <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 'bold', fontSize: '16px', color: '#00e676' }}>
                                ৳ {orderData.amount ? orderData.amount.toLocaleString() : '0'}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Action Buttons */}
                <div className="no-print" style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => window.print()}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: '#2196f3',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        🖨️ Print / Save PDF
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: '#333',
                            color: '#fff',
                            border: '1px solid #555',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
}