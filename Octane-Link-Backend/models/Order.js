const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true }, 
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  trxId: { type: String },
  amount: { type: Number, required: true }, 
  paymentStatus: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);