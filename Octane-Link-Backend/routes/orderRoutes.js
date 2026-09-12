const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/create', async (req, res) => {
  try {
    const { customerName, phone, address, paymentMethod, trxId, amount } = req.body;


    if (!customerName || !phone || !address || !amount) {
      return res.status(400).json({ error: "Required fields (customerName, phone, address, amount) are missing!" });
    }

    const newOrder = new Order({
      customerName,
      phone,
      address,
      paymentMethod,
      trxId,
      amount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: savedOrder });
  } catch (err) {
    console.error("Order Creation Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;